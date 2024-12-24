const express = require("express");
const pool = require("../config.js");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");  

const axios = require("axios");
// const mysql = require("mysql2");

// const promisePool = pool.promise();

const router = express.Router();
app.use('/', router);

app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE'
}));

const line = require("@line/bot-sdk");

const config = {
  channelAccessToken: "ZKIV+qil3w6DjHJhHfQyQZvLVt3MTbhX7HhoKxku9pNoerxcIBAHVqe761eTlRET+Lf2Bi93YCYFJ9rb+GWg9IBQEM0xgBfvyGbvtqiEHBZOr5Lra5u1tpt+ipv+8skWoXU0FGwrVL/XopAxMcFbTwdB04t89/1O/w1cDnyilFU=", 
  channelSecret: "fd252952946a654a1b4c64ee6152d325", 
};

const lineClient = new line.Client(config);


const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
  };
  

router.post("/webhook", async (req, res) => {
    console.log("Webhook called");
    const intentName = req.body.queryResult.intent.displayName; 
    const parameters = req.body.queryResult.parameters; 
    
    console.log(`Intent: ${intentName}`);
    console.log("Parameters:", parameters);

    function formatThaiDate(dateString) {
      const months = [
          "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
          "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
      ];
      const days = [
          "วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ",
          "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"
      ];

      const date = new Date(dateString);

      const dayName = days[date.getDay()];
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear() + 543;
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');

      return `${dayName} ${day} ${month} ${year} เวลา ${hours}:${minutes} น.`;
    }

    //intent เช็ควันนัดหมาย
    if (intentName === "ตรวจสอบวันนัดหมาย") {
      // รับ HN จากคุกกี้
      const cookies = req.cookies;
      const HN = cookies?.HN || 123456;

      if (!HN) {
        return res.json({
          fulfillmentMessages: [
            {
              text: {
                text: ["ไม่พบ HN ในระบบ กรุณาลงชื่อเข้าใช้ใหม่"],
              },
            },
          ],
        });
      }
  
      try {
        //เลือกจากนัดล่าสุด
        const [treatmentRows] = await pool.query(
        `SELECT appointment.treatmentId, appointment.appointDate
        FROM appointment
        WHERE appointment.HN = ?
        ORDER BY appointment.appointDate DESC
        LIMIT 1
      `,
          [HN]
        );
  
        console.log("Query Result:", treatmentRows);
  
        if (treatmentRows.length > 0) {
          const { appointDate } = treatmentRows[0];
          const formattedDate = formatThaiDate(appointDate);
          res.json({
            fulfillmentMessages: [
              {
                text: {
                  text: [`คุณมีนัดหมายใหม่ ${formattedDate}`],
                },
              },
            ],
          });
        } else {
          console.log("No appointment found");
          res.json({
            fulfillmentMessages: [
              {
                text: {
                  text: ["ไม่พบวันนัดสำหรับข้อมูลที่ระบุ"],
                },
              },
            ],
          });
        }
      } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({
          fulfillmentMessages: [
            {
              text: {
                text: ["เกิดข้อผิดพลาดในการดึงข้อมูล"],
              },
            },
          ],
        });
      }
    }
      // Intent บันทึกน้ำหนักผู้ป่วย
      else if (intentName === "บันทึกน้ำหนักผู้ป่วย") {
        const weight = parameters['unit-weight'].amount;
        // รับ HN จากคุกกี้
        const cookies = req.cookies;
        const HN = cookies?.HN || 123456;

        const recorded_at = new Date();
    
        if (!weight || !HN) {
          return res.json({
            fulfillmentMessages: [
              {
                text: {
                  text: ["กรุณาระบุน้ำหนักและหมายเลข HN ให้ถูกต้อง"],
                },
              },
            ],
          });
        }
    
        try {
          const [appointResult] = await pool.query(
            `SELECT MAX(appointId) AS maxAppointId FROM appointment WHERE HN = ?`,
            [HN]
          );
    
          const maxAppointId = appointResult[0]?.maxAppointId;
    
          if (!maxAppointId) {
            return res.json({
              fulfillmentMessages: [
                {
                  text: {
                    text: ["ไม่พบข้อมูลการนัดหมายสำหรับ HN ที่ระบุ"],
                  },
                },
              ],
            });
          }
    
          // บันทึกน้ำหนักในฐานข้อมูล
          await pool.query(
            `INSERT INTO weight_records (weight, recorded_at, HN, appointId) 
             VALUES (?, NOW(), ?, ?)`,
            [weight, HN, maxAppointId]
          );                   
    
          res.json({
            fulfillmentMessages: [
              {
                text: {
                  text: [
                    `น้ำหนักล่าสุดของคุณคือ ${weight} กิโลกรัม ถูกบันทึกแล้วเรียบร้อย เมื่อวันที่ ${formatThaiDate(recorded_at)}`
                  ],
                },
              },
            ],
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            fulfillmentMessages: [
              {
                text: {
                  text: ["เกิดข้อผิดพลาดในการบันทึกข้อมูล"],
                },
              },
            ],
          });
        }
      } 
    // Intent: แจ้งเตือนบันทึกน้ำหนัก
    else if (intentName === "แจ้งเตือนบันทึกน้ำหนัก") {
    try {
      const cookies = req.cookies;
      const HN = cookies?.HN || 123456;

      if (!HN) {
        return res.json({
          fulfillmentMessages: [
            {
              text: {
                text: ["ไม่พบหมายเลข HN ในระบบ กรุณาลงชื่อเข้าใช้ใหม่"],
              },
            },
          ],
        });
      }

      // ส่งผ่าน LINE Messaging API
      const message = {
        type: "text",
        text: "กรุณาทำการบันทึกน้ำหนักวันนี้เพื่อช่วยติดตามสุขภาพของคุณ",
      };

      await lineClient.pushMessage(HN, message);

      return res.json({
        fulfillmentMessages: [
          {
            text: {
              text: ["แจ้งเตือนให้ผู้ใช้บันทึกน้ำหนักสำเร็จ"],
            },
          },
        ],
      });
    } catch (error) {
      console.error("Error sending notification:", error);
      return res.status(500).json({
        fulfillmentMessages: [
          {
            text: {
              text: ["เกิดข้อผิดพลาดในการส่งการแจ้งเตือน"],
            },
          },
        ],
      });
    }
  }
      else {
        res.json({
          fulfillmentMessages: [
            {
              text: {
                text: ["ไม่พบข้อมูลที่ต้องการ"],
              },
            },
          ],
        });
      }
    }); 


//แจ้งเตือนรายสัปดาห์
const cron = require("node-cron");

// ตั้งเวลาให้ส่งการแจ้งเตือน
cron.schedule("58 1 * * *", async () => {
  try {
    const [users] = await pool.query(`
      SELECT UserIdLine 
      FROM user 
      WHERE type = 'patient'
    `);

    users.forEach(async (user) => {
      const { UserIdLine } = user;

      const message = {
        to: UserIdLine,
        messages: [
          {
            type: "text",
            text: "กรุณาทำการบันทึกน้ำหนักวันนี้เพื่อช่วยติดตามสุขภาพของคุณ",
          },
        ],
      };

      try {
        await lineClient.pushMessage(UserIdLine, message.messages);
        console.log(`ส่งการแจ้งเตือนสำเร็จสำหรับผู้ใช้: ${UserIdLine}`);
      } catch (lineError) {
        console.error(`Error sending message to ${UserIdLine}:`, lineError);
      }
    });
  } catch (error) {
    console.error("Error sending daily notification:", error);
  }
});

exports.router = router;