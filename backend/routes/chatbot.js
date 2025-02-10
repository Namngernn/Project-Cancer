const express = require("express");
const pool = require("../config.js");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173", // URL ของ frontend
    credentials: true, // อนุญาตให้ส่ง cookies
  })
);
const bodyParser = require("body-parser");

const axios = require("axios");

const router = express.Router();
app.use("/", router);
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
  })
);

const line = require("@line/bot-sdk");

const config = {
  channelAccessToken:
    "ZKIV+qil3w6DjHJhHfQyQZvLVt3MTbhX7HhoKxku9pNoerxcIBAHVqe761eTlRET+Lf2Bi93YCYFJ9rb+GWg9IBQEM0xgBfvyGbvtqiEHBZOr5Lra5u1tpt+ipv+8skWoXU0FGwrVL/XopAxMcFbTwdB04t89/1O/w1cDnyilFU=",
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

  // func format date
  function formatThaiDate(dateString) {
    const months = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    const days = [
      "วันอาทิตย์",
      "วันจันทร์",
      "วันอังคาร",
      "วันพุธ",
      "วันพฤหัสบดี",
      "วันศุกร์",
      "วันเสาร์",
    ];

    const date = new Date(dateString);

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear() + 543;
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${dayName} ${day} ${month} ${year} เวลา ${hours}:${minutes} น.`;
  }

  //intent เช็ควันนัดหมาย
  if (intentName === "ตรวจสอบวันนัดหมาย") {
    // const HN = req.body.queryResult.parameters.HN;
    const cookies = req.cookies;
    const HN = cookies?.HN;

    if (!HN || HN.trim() === "") {
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
      console.log("HN from cookies:", HN);
      console.log("Query Result:", treatmentRows);

      if (treatmentRows.length > 0) {
        const { appointDate } = treatmentRows[0];
        const formattedDate = formatThaiDate(appointDate);
        console.log(`Appointment Date: ${formattedDate}`);
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
    // const weight = parameters["unit-weight"].amount;
    // const cookies = req.cookies;
    // const HN = cookies?.HN;
    // const weightArray = parameters["unit-weight"]?.amount;
    const weightArray = parameters["unit-weight"]; // รับค่าจาก parameters
    const HN = req.body.queryResult.parameters.HN;

    let weight = null;

    // ตรวจสอบว่า weightArray มีค่าและมีอย่างน้อยหนึ่งค่า
    if (weightArray && weightArray.length > 0) {
      const weightString = weightArray[0]; // ดึงค่าจากอาร์เรย์
      if (typeof weightString === "string") {
        weight = weightString.split(" ")[0]; // ดึงเฉพาะตัวเลขจาก "76 กิโลกรัม"
      }
    }
    const recorded_at = new Date();

    // if (!weight || !HN) {
    //   return res.json({
    //     fulfillmentMessages: [
    //       {
    //         payload: {
    //           type: "response",
    //           message: "กรุณาระบุน้ำหนักของท่านค่ะ",
    //         },
    //       },
    //     ],
    //   });
    // }

    if (!weight) {
      return res.json({
        fulfillmentMessages: [
          {
            text: "กรุณาระบุน้ำหนักของท่านค่ะ",
          },
        ],
      });
    }

    if (!HN) {
      return res.json({
        fulfillmentMessages: [
          {
            payload: {
              type: "response",
              message: "ไม่พบข้อมูล HN ของผู้ป่วยค่ะ",
            },
          },
        ],
      });
    }

    //   try {
    //     const [appointResult] = await pool.query(
    //       `SELECT MAX(appointId) AS maxAppointId FROM appointment WHERE HN = ?`,
    //       [HN]
    //     );

    //     const maxAppointId = appointResult[0]?.maxAppointId;

    //     if (!maxAppointId) {
    //       return res.json({
    //         fulfillmentMessages: [
    //           {
    //             text: {
    //               text: ["ไม่พบข้อมูลการนัดหมายสำหรับ HN ที่ระบุ"],
    //             },
    //           },
    //         ],
    //       });
    //     }

    //     // บันทึกน้ำหนักในฐานข้อมูล
    //     await pool.query(
    //       `INSERT INTO weight_records (weight, recorded_at, HN, appointId)
    //            VALUES (?, NOW(), ?, ?)`,
    //       [weight, HN, maxAppointId]
    //     );

    //     res.json({
    //       fulfillmentMessages: [
    //         {
    //           text: {
    //             text: [
    //               `น้ำหนักล่าสุดของคุณคือ ${weight} กิโลกรัม ถูกบันทึกแล้วเรียบร้อย เมื่อวันที่ ${formatThaiDate(
    //                 recorded_at
    //               )}`,
    //             ],
    //           },
    //         },
    //       ],
    //     });
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({
    //       fulfillmentMessages: [
    //         {
    //           text: {
    //             text: ["เกิดข้อผิดพลาดในการบันทึกข้อมูล"],
    //           },
    //         },
    //       ],
    //     });
    //   }
    // }

    try {
      // ดึงข้อมูล appointId ล่าสุดจากฐานข้อมูล
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
      const [insertResult] = await pool.query(
        `INSERT INTO weight_records (weight, recorded_at, HN, appointId) 
           VALUES (?, NOW(), ?, ?)`,
        [weight, HN, maxAppointId]
      );

      // ตรวจสอบว่าได้ผลลัพธ์จากการบันทึกหรือไม่
      if (insertResult.affectedRows > 0) {
        res.json({
          fulfillmentMessages: [
            {
              payload: {
                type: "response",
                message: `น้ำหนักล่าสุดของคุณคือ ${weight} กิโลกรัม ถูกบันทึกแล้วเรียบร้อย เมื่อวันที่ ${formatThaiDate(
                  recorded_at
                )}`,
                weight: weight,
                recorded_at: recorded_at,
              },
            },
          ],
        });
      } else {
        res.status(500).json({
          fulfillmentMessages: [
            {
              text: {
                text: ["ไม่สามารถบันทึกข้อมูลน้ำหนักได้"],
              },
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error during database operation:", error);
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

  // *****ยังใช้ไม้ได้*****
  // Intent: แจ้งเตือนบันทึกน้ำหนัก
  else if (intentName === "แจ้งเตือนบันทึกน้ำหนัก") {
    try {
      const cookies = req.cookies;
      const HN = cookies?.HN;

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
  } else {
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

//*******ยังใช้ไม้ได้*******
//แจ้งเตือนรายสัปดาห์
// const cron = require("node-cron");

// ตั้งเวลาให้ส่งการแจ้งเตือน
// cron.schedule("58 1 * * *", async () => {
//   try {
//     const [users] = await pool.query(`
//       SELECT UserIdLine
//       FROM user
//       WHERE type = 'patient'
//     `);

//     users.forEach(async (user) => {
//       const { UserIdLine } = user;

//       const message = {
//         to: UserIdLine,
//         messages: [
//           {
//             type: "text",
//             text: "กรุณาทำการบันทึกน้ำหนักวันนี้เพื่อช่วยติดตามสุขภาพของคุณ",
//           },
//         ],
//       };

//       try {
//         await lineClient.pushMessage(UserIdLine, message.messages);
//         console.log(`ส่งการแจ้งเตือนสำเร็จสำหรับผู้ใช้: ${UserIdLine}`);
//       } catch (lineError) {
//         console.error(`Error sending message to ${UserIdLine}:`, lineError);
//       }
//     });
//   } catch (error) {
//     console.error("Error sending daily notification:", error);
//   }
// });

// LINE Webhook
router.post("/line-webhook", (req, res) => {
  const events = req.body.events;

  events.forEach(async (event) => {
    if (event.type === "message" && event.message.type === "text") {
      const userMessage = event.message.text;

      let replyMessages;
      // ตรวจสอบคำถามจากผู้ใช้
      if (userMessage.includes("เวลาเปิด") || userMessage.includes("เวลา")) {
        replyMessages = "ร้านของเราเปิดตั้งแต่ 9:00 น. ถึง 21:00 น.";
      } else if (
        userMessage.includes("เมนู") ||
        userMessage.includes("เครื่องดื่ม")
      ) {
        replyMessages = "เรามีเมนูเครื่องดื่ม เช่น ชาไทย ชานม โกโก้ และอื่นๆ!";
      } else {
        replyMessages = "ขอโทษค่ะ ฉันไม่เข้าใจคำถามของคุณ";
      }
      // ส่งข้อความตอบกลับ
      await lineClient.replyMessages(event.replyToken, {
        type: "text",
        text: replyMessages,
      });

      // ส่งข้อความไปที่ Dialogflow
      const dialogflowResponse = await sendToDialogflow(
        userMessage,
        event.source.userId
      );

      // ตอบกลับผู้ใช้
      const replyMessage =
        dialogflowResponse.fulfillmentText ||
        "ขอโทษค่ะ ฉันไม่เข้าใจคำถามของคุณ";
      await lineClient.replyMessage(event.replyToken, {
        type: "text",
        text: replyMessage,
      });
    }
  });

  res.status(200).end();
});

// Function ส่งข้อความไป Dialogflow
async function sendToDialogflow(text, sessionId) {
  const dialogflow = require("@google-cloud/dialogflow");
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.projectAgentSessionPath(
    "w-bloody-wyne",
    sessionId
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text,
        languageCode: "th", // ภาษาไทย
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  return responses[0].queryResult;
}
exports.router = router;
