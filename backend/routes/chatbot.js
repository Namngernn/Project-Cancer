const express = require("express");
const pool = require("../config.js");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");  

const cron = require("node-cron");

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

// const sendReminder = async (UserIdLine) => {
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: `Bearer {ZKIV+qil3w6DjHJhHfQyQZvLVt3MTbhX7HhoKxku9pNoerxcIBAHVqe761eTlRET+Lf2Bi93YCYFJ9rb+GWg9IBQEM0xgBfvyGbvtqiEHBZOr5Lra5u1tpt+ipv+8skWoXU0FGwrVL/XopAxMcFbTwdB04t89/1O/w1cDnyilFU=}`,
//   };
//   const message = {
//     to: UserIdLine,
//     messages: [
//       {
//         type: "text",
//         text: "ถึงเวลาบันทึกน้ำหนักของคุณประจำสัปดาห์นี้แล้วค่ะ!",
//       },
//     ],
//   };

//   try {
//     const response = await axios.post("https://api.line.me/v2/bot/message/push", message, { headers });
//     console.log("ส่งข้อความสำเร็จ:", response.data);
//   } catch (error) {
//     console.error("เกิดข้อผิดพลาดในการส่งข้อความ:", error);
//   }
// };

// // ตัวอย่างการใช้งาน
// sendReminder("UserIdLine");

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

    //intent เช็ควันนัดหมาย
    if (intentName === "ตรวจสอบวันนัดหมาย") {
      const HN = parameters.HN;
      const treatmentId = parameters.treatmentId;
  
      if (!HN || !treatmentId) {
        return res.json({
          fulfillmentMessages: [
            {
              text: {
                text: ["ข้อมูล HN หรือ treatmentId ไม่ถูกต้อง"],
              },
            },
          ],
        });
      }
  
      try {
        const [rows] = await pool.query(
          `SELECT appointDate FROM appointment
           JOIN treatment ON treatment.treatmentId = appointment.treatmentId
           WHERE appointment.HN = ? AND appointment.treatmentId = ?`,
          [HN, treatmentId]
        );
  
        console.log("Query Result:", rows);
  
        if (rows.length > 0) {
          res.json({
            fulfillmentMessages: [
              {
                text: {
                  text: [`วันนัดของคุณคือ ${rows[0].appointDate}`],
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
        const HN = parameters.HN;
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
    
          const [rows] = await pool.query(
            `INSERT INTO weight_records (weight, recorded_at, HN, appointId) 
             VALUES (?, ?, ?, ?)`,
            [weight, recorded_at, HN, maxAppointId]
          );                   
    
          res.json({
            fulfillmentMessages: [
              {
                text: {
                  text: [
                    `น้ำหนักล่าสุดของคุณคือ ${weight} กิโลกรัม ถูกบันทึกแล้วเรียบร้อย เมื่อวันที่ ${recorded_at.toLocaleDateString()}`
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
  // cron.schedule("19 18 * * fri", async () => {
  //   console.log("ส่งข้อความแจ้งเตือนรายสัปดาห์");
  
  //   // เรียก API เพื่อส่งข้อความ
  //   try {
  //     const response = await axios.post("http://localhost:3000/send-reminder", {
  //       message: "กรุณาบันทึกน้ำหนักของคุณประจำสัปดาห์นี้ค่ะ",
  //     });
  
  //     console.log("ส่งข้อความสำเร็จ:", response.data);
  //   } catch (error) {
  //     console.error("เกิดข้อผิดพลาดในการส่งข้อความ:", error);
  //   }
  // });

exports.router = router;