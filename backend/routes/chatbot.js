const express = require("express");
const pool = require("../config.js");
const axios = require("axios");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const app = express();

app.use(express.json());
app.use(cookieParser());

require("dotenv").config();
const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

//เวลาแจ้งเตือน
cron.schedule("0 9 * * SUN", async () => {
  try {
    const [users] = await pool.query("SELECT userIdLine FROM user");
    users.forEach((user) => {
      sendLineNotification(
        user.userIdLine,
        "กรุณาบันทึกน้ำหนักของคุณในสัปดาห์นี้"
      );
    });
  } catch (error) {
    console.error("Error sending notifications:", error);
  }
});

//แปลงวันที่
function formatThaiDate(dateString) {
  if (!dateString) {
    console.error(
      "❌ formatThaiDate ได้รับค่า dateString เป็น undefined หรือ null"
    );
    return "ไม่สามารถแปลงวันที่ได้";
  }

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("❌ formatThaiDate: ค่าวันที่ไม่ถูกต้อง", dateString);
      return "ไม่สามารถแปลงวันที่ได้";
    }

    const thaiMonths = [
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
    const day = date.getDate();
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear() + 543;
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `วัน${
      ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"][
        date.getDay()
      ]
    }ที่ ${day} ${month} ${year} เวลา ${hours}:${minutes}`;
  } catch (error) {
    console.error("❌ formatThaiDate: เกิดข้อผิดพลาด", error.message);
    return "ไม่สามารถแปลงวันที่ได้";
  }
}

router.post("/webhook", async (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || authHeader !== "Bearer YOUR_SECRET_API_KEY") {
    return res.status(403).json({ message: "Unauthorized" });
  }

  // map intent
  try {
    const queryResult = req.body.queryResult;
    const intent = queryResult.intent.displayName;

    console.log("🔥 Intent ที่ตรวจพบ:", intent);
    console.log(
      "🔍 Webhook Request Dialogflow:",
      JSON.stringify(req.body, null, 2)
    );

    if (intent === "บันทึกน้ำหนัก") {
      const weightInput = queryResult.parameters
        ? queryResult.parameters["unit-weight"]
        : null;

      if (
        !weightInput ||
        weightInput === "" ||
        Object.keys(weightInput).length === 0
      ) {
        console.error("❌ ไม่พบค่าพารามิเตอร์น้ำหนัก");
        return res.json({
          fulfillmentText:
            "กรุณาบอกน้ำหนักของคุณเป็นตัวเลข เช่น 54 กิโลกรัม 54kg",
        });
      }

      console.log("📌 ค่าน้ำหนักที่รับมา:", weightInput);

      const userId =
        req.body.originalDetectIntentRequest.payload.data.source.userId;
      const response = await recordWeight(userId, queryResult);
      return res.json(response);
    } else if (intent === "ตรวจสอบวันนัดหมาย") {
      const userId =
        req.body.originalDetectIntentRequest.payload.data.source.userId;
      try {
        // const { userName, formattedDate } = await checkAppointment(userId);
        const appointmentResult = await checkAppointment(userId);
        if (!appointmentResult.formattedDate) {
          return res.json({
            fulfillmentText: "❌ ไม่พบวันนัดหมายของคุณ",
          });
        }
        return res.json({
          fulfillmentText: `✅ วันนัดหมายล่าสุดของคุณคือวันที่: ${appointmentResult.formattedDate}`,
        });
      } catch (error) {
        return res.json({
          fulfillmentText: `❌ เกิดข้อผิดพลาด: ${error.message}`,
        });
      }
    }

    return res.json({ fulfillmentText: "ไม่เข้าใจคำขอของคุณ กรุณาลองใหม่" });
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาด บน:", error.message);
    return res.json({ fulfillmentText: "เกิดข้อผิดพลาด: " + error.message });
  }
});

// ฟังก์ชันบันทึกน้ำหนัก
async function recordWeight(userId, queryResult) {
  try {
    console.log("เริ่มบันทึกน้ำหนัก...");
    console.log(
      "ค่าพารามิเตอร์จาก Dialogflow:",
      JSON.stringify(queryResult.parameters, null, 2)
    );

    if (!queryResult || !queryResult.parameters) {
      console.error("❌ ไม่พบค่าพารามิเตอร์ queryResult.parameters");
      return { fulfillmentText: "เกิดข้อผิดพลาด: ไม่พบค่าพารามิเตอร์น้ำหนัก" };
    }

    let weightInput = queryResult.parameters["unit-weight"];

    if (
      !weightInput ||
      weightInput === "" ||
      Object.keys(weightInput).length === 0
    ) {
      console.error("❌ ไม่พบค่าพารามิเตอร์น้ำหนัก หรือพารามิเตอร์เป็นค่าว่าง");
      return { fulfillmentText: "กรุณากรอกน้ำหนักของท่าน เช่น 54กิโลกรัม" };
    }

    if (
      weightInput &&
      typeof weightInput === "object" &&
      !Array.isArray(weightInput)
    ) {
      weightInput = [weightInput];
    }
    if (
      !weightInput ||
      !Array.isArray(weightInput) ||
      weightInput.length === 0
    ) {
      console.error("❌ ไม่พบค่าพารามิเตอร์น้ำหนัก หรือพารามิเตอร์เป็นค่าว่าง");
      return { fulfillmentText: "กรุณากรอกน้ำหนักของท่าน เช่น 54กิโลกรัม" };
    }

    const weight = weightInput[0]?.amount;
    if (!weight || isNaN(weight)) {
      console.error("❌ ไม่พบค่าพารามิเตอร์น้ำหนักที่ถูกต้อง");
      return { fulfillmentText: "กรุณากรอกน้ำหนักเป็นตัวเลข เช่น 54, 54kg" };
    }

    console.log("✅ ค่าน้ำหนักที่ได้รับ:", weight);

    const [userRows] = await pool.query(
      `SELECT u.userName, a.HN 
       FROM user u
       INNER JOIN appointment a ON u.userName = a.IDcard
       WHERE u.UserIdLine = ? OR u.userName = ?
       LIMIT 1`,
      [userId, userId]
    );
    console.log("userIdLine:", userId);

    if (userRows.length === 0) {
      throw new Error("ไม่พบข้อมูลผู้ใช้ในระบบ");
    }

    const userName = userRows[0].userName;
    console.log("IDcard :", userName);
    const HN = userRows[0].HN;
    console.log("HN :", HN);

    // ดึง Appointment ล่าสุด
    const [appointmentRows] = await pool.query(
      `SELECT appointId FROM appointment WHERE IDcard = ? ORDER BY appointDate DESC LIMIT 1`,
      [userName]
    );

    if (appointmentRows.length === 0) {
      throw new Error(
        "ไม่พบข้อมูลสำหรับบัญชีผู้ใช้นี้ กรุณาเข้าสู่ระบบใหม่อีกครั้งค่ะ"
      );
    }

    const latestAppointId = appointmentRows[0].appointId;

    // บันทึกน้ำหนักลง Database
    await pool.query(
      `INSERT INTO weight (HN, weight, recorded_at, appointId) VALUES (?, ?, NOW(), ?)`,
      [HN, weight, latestAppointId]
    );

    console.log("Last Appointment :", latestAppointId);
    console.log("✅ บันทึกน้ำหนักสำเร็จ: น้ำหนัก =", weight);

    return {
      fulfillmentText: `✅ บันทึกน้ำหนัก ${weight} กิโลกรัม สำเร็จแล้ว`,
    };
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error.message);
    return { fulfillmentText: `เกิดข้อผิดพลาด: ${error.message}` };
  }
}

// ฟังก์ชันตรวจวันนัด
async function checkAppointment(userId) {
  if (!userId || userId.trim() === "") {
    return {
      fulfillmentMessages: [
        {
          text: {
            text: ["ไม่พบข้อมูลผู้ใช้ กรุณาลงชื่อเข้าใช้ใหม่"],
          },
        },
      ],
    };
  }

  try {
    const [userRows] = await pool.query(
      `SELECT userName FROM user WHERE UserIdLine = ? LIMIT 1`,
      [userId]
    );

    if (userRows.length === 0) {
      return {
        fulfillmentMessages: [
          {
            text: {
              text: ["ไม่พบข้อมูลผู้ใช้ในระบบ"],
            },
          },
        ],
      };
    }

    const userName = userRows[0].userName;

    // เลือกวันนัดล่าสุด
    const [treatmentRows] = await pool.query(
      `SELECT appointment.treatmentId, appointment.appointDate
      FROM appointment
      WHERE appointment.IDcard = ?
      ORDER BY appointment.appointDate DESC
      LIMIT 1
      `,
      [userName]
    );

    console.log("userName from database:", userName);
    console.log("Query Result:", treatmentRows);

    if (treatmentRows.length > 0) {
      console.log("🔍 treatmentRows:", treatmentRows);

      const { appointDate } = treatmentRows[0];
      console.log("🔍 appointDate:", appointDate);
      if (!appointDate) {
        throw new Error("❌ ไม่พบ appointDate ในฐานข้อมูล");
      }

      const formattedDate = formatThaiDate(appointDate);
      console.log(`Appointment formattedDate: ${formattedDate}`);

      console.log("📩 ส่งข้อความกลับ LINE:", {
        fulfillmentMessages: `✅ คุณมีนัดหมายในวันที่ ${formattedDate}`,
      });

      return {
        userName, // 🟢 ส่ง userName กลับไปด้วย
        formattedDate,
      };
    } else {
      console.log("No appointment found");

      return {
        fulfillmentMessages: `ไม่พบวันนัดสำหรับข้อมูลที่ระบุ`,
      };
    }
  } catch (error) {
    console.error("Database error:", error);

    return {
      fulfillmentMessages: [
        {
          text: {
            text: ["เกิดข้อผิดพลาดในการดึงข้อมูล"],
          },
        },
      ],
    };
  }
}

// ฟังก์ชันแจ้งเตือนผ่าน LINE API
async function sendLineNotification(userId, message) {
  try {
    const messageData = {
      to: userId,
      messages: [
        {
          type: "text",
          text: message,
        },
      ],
    };

    const response = await axios.post(
      "https://api.line.me/v2/bot/message/push",
      messageData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
        },
      }
    );
    console.log("✅ ส่งข้อความสำเร็จ");
  } catch (error) {
    console.error(
      "❌ ส่งข้อความล้มเหลว",
      error.response?.data || error.message
    );
  }
}
exports.router = router;
