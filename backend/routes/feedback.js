const express = require("express");
const pool = require("../config");
const app = express();
const cors = require("cors");
const { router } = require("./patients");

app.use(cors());

let sideEfrouter = express.Router();

// Line app
//ผู้ป่วยบันทึกผลข้างเคียง
router.post("/feedback/:HN", async function (req, res, next) {
  const HN = req.params.HN;
  const sideEffect = req.body.sideEffect;
  const appointId = req.body.appointId;
  const date = req.body.date;

  console.log("Request Body:", req.body);

  if (!sideEffect || !date) {
    return res.status(400).send("Invalid data");
  }
  //เลือกการนัดหมายครั้งล่าสุด
  try {
    const [maxAppointRows] = await pool.query(
      "SELECT MAX(appointId) AS max_appointId FROM appointment WHERE HN = ?",
      [HN]
    );

    if (maxAppointRows[0].max_appointId == null) {
      return res.status(404).send("Appointment not found");
    }

    const conn = await pool.getConnection();
    await conn.beginTransaction();
    //บันทึกเข้า
    try {
      await conn.query(
        "INSERT INTO feedback (sendAt, patientSideEffect, appointId) VALUES (?, ?, ?)",
        [date, sideEffect, maxAppointRows[0].max_appointId]
      );
      await conn.commit();
      res.send("Feedback added successfully");
    } catch (error) {
      await conn.rollback();
      console.error("Transaction Error:", error);
      res.status(500).send("Internal Server Error");
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).send("Database Error");
  }
});

//ดูประวัติผลข้างเคียง
router.get("/selectedFeedback/:appointId", async function (req, res, next) {
  let appointId = req.params.appointId;
  try {
    const [row, _] = await pool.query(
      "select * from feedback where appointId = ?",
      appointId
    );
    if (row.length != 0) {
      res.json(row);
    } else {
      res.send("not found");
    }
  } catch (error) {
    console.log(error);
  }
});

// เรียกดู allSideEffects
router.get("/allsideeffects/:side_effect_id", async (req, res) => {
  const side_effect_id = req.params.side_effect_id;
  try {
    const [row] = await pool.query(
      "SELECT side_effect_name FROM allsideeffects where side_effect_id = ?",
      [side_effect_id]
    );
    res.json(row);
  } catch (error) {
    console.log(error);
  }
});

//นงเพิ่ม ฟังก์ชันเพิ่มผลข้างเคียงลงตาราง allsideeffects
const addSideEffectIfNotExists = async (sideEffectName) => {
  const [rows] = await pool.query(
    "SELECT side_effect_id FROM allsideeffects WHERE side_effect_name = ?",
    [sideEffectName]
  );
  if (rows.length > 0) {
    return rows[0].side_effect_id;
  } else {
    const [result] = await pool.query(
      "INSERT INTO allsideeffects (side_effect_name) VALUES (?)",
      [sideEffectName]
    );
    return result.insertId;
  }
};

//นงเพิ่ม ดึง patientSideEffect แยกผลข้างเคียง
router.get("/process-sideeffects/:feedbackId", async (req, res) => {
  const feedbackId = req.params.feedbackId;
  try {
    const [feedbackRows] = await pool.query(
      `SELECT f.patientSideEffect, a.HN
           FROM feedback f
           JOIN appointment a ON f.appointId = a.appointId
           WHERE f.feedbackId = ?`,
      [feedbackId]
    );
    if (feedbackRows.length === 0) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    const patientSideEffect = feedbackRows[0].patientSideEffect;
    const HN = feedbackRows[0].HN;
    if (!patientSideEffect) {
      return res.status(400).json({ message: "No side effects to process" });
    }
    const sideEffectsArray = patientSideEffect
      .split(",")
      .map((effect) => effect.trim()); // แยกผลข้างเคียงที่คั่นด้วยเครื่องหมาย ,
    const sideEffectIds = [];
    for (let effect of sideEffectsArray) {
      const sideEffectId = await addSideEffectIfNotExists(effect);
      sideEffectIds.push(sideEffectId);
    }
    for (let sideEffectId of sideEffectIds) {
      const [existingRows] = await pool.query(
        "SELECT * FROM patientsideeffects WHERE HN = ? AND side_effect_id = ?",
        [HN, sideEffectId]
      );
      if (existingRows.length === 0) {
        await pool.query(
          "INSERT INTO patientsideeffects (HN, side_effect_id, feedbackId, has_side_effect) VALUES (?, ?, ?, ?)",
          [HN, sideEffectId, feedbackId, 1] // เพิ่มผลข้างเคียงค่า 1=มีผลข้างเคียง
        );
      } else {
        await pool.query(
          "UPDATE patientsideeffects SET has_side_effect = 1 WHERE HN = ? AND side_effect_id = ?",
          [HN, sideEffectId]
        );
      }
    }
    res.json({ message: "Side effects processed successfully", sideEffectIds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", error });
  }
});

// อิงเพิ่มม
router.get("/selectedappointId/:IDCard", async function (req, res, next) {
  let IDCard = req.params.IDCard;
  try {
    const [row, _] = await pool.query(
      "SELECT max(appointId) as maxappointId from appointment where IDCard = ?",
      IDCard
    );
    if (row.length != 0) {
      res.json(row[0].maxappointId);
    } else {
      res.send("not found appoint by IDCard");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/selectedFeedback2/:appointId", async function (req, res, next) {
  let appointId = req.params.appointId;
  try {
    const [row, _] = await pool.query(
      "select * from feedback where appointId = ?",
      appointId
    );
    if (row.length != 0) {
      res.json(row);
    } else {
      res.send("not found");
    }
  } catch (error) {
    console.log(error);
  }
});

//////// ของพี่ ///////////
//add feedback
router.post(`/newFeedback`, async function (req, res, next) {
  const sideEffect = req.body.sideEffect;
  const appointId = req.body.appointId;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    await conn.query(
      `insert into feedback (patientSideEffect, appointId) values (?, ?)`,
      [sideEffect, Number(appointId)]
    );
    conn.commit();
    res.send("save");
  } catch (error) {
    conn.rollback();
    console.log(error);
  } finally {
    conn.release();
  }
});

//add note
router.post(`/noteFeedback`, async function (req, res, next) {
  const sideEffectLevel = req.body.sideEffectLevel;
  const nurseNote = req.body.nurseNote;
  const feedbackId = req.body.feedbackId;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    await conn.query(
      `update feedback set sideEffectLevel = ?, nurseNote = ? where feedbackId = ?`,
      [sideEffectLevel, nurseNote, feedbackId]
    );
    conn.commit();
    res.send("save");
  } catch (error) {
    conn.rollback();
    console.log(error);
  } finally {
    conn.release();
  }
});

router.get(`/selectedFeedback/:feedbackId`, async function (req, res, next) {
  const feedbackId = req.params.feedbackId;
  try {
    const [row, _] = await pool.query(
      `select * from feedback join appointment on appointment.appointId=feedback.appointId where feedbackId = ?`,
      feedbackId
    );
    res.json(row);
  } catch (error) {
    console.log(error);
  }
});

router.get(`/allFeedback`, async function (req, res, next) {
  try {
    const [row, _] = await pool.query(
      `select * from feedback join appointment on appointment.appointId=feedback.appointId join patient on patient.HN=appointment.HN join treatment on treatment.HN=patient.HN`
    );
    res.json(row);
  } catch (error) {
    console.log(error);
  }
});

router.post(`/appointment/giveMed`, async function (req, res, next) {
  const treatmentId = req.body.treatmentId;
  try {
    const [row, _] = await pool.query(
      `select * from giveMed join medicine on medicine.medId=giveMed.medId where treatmentId = ?`,
      treatmentId
    );
    res.json(row);
  } catch (error) {
    console.log(error);
  }
});

router.get(`/treatment/giveMed/:treatmentId`, async function (req, res, next) {
  const treatmentId = req.params.treatmentId;
  try {
    const [row, f] = await pool.query(
      `select * from giveMed where treatmentId = ?`,
      treatmentId
    );
    res.json(row);
  } catch (error) {
    console.log(error);
  }
});

router.post(`/completeAppoint`, async function (req, res, next) {
  const medGiver = req.body.medGiver;
  const note = req.body.note;
  const appointId = req.body.appointId;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    await conn.query(
      `update appointment set medGiver = ?, note = ? where appointId = ?`,
      [medGiver, note, appointId]
    );
    conn.commit();
    const [rows, fs] = await conn.query(
      `select * from appointment join treatment on treatment.treatmentId=appointment.treatmentId where appointment.HN = ?`,
      HN
    );
    res.json(rows);
  } catch (error) {
    conn.rollback();
    console.log(error);
  } finally {
    conn.release();
  }
});

router.get(`/giveMed/:treatmentId`, async function (req, res, next) {
  try {
    const [row, f] = await pool.query(
      `select * from giveMed join treatment on treatment.treatmentId=giveMed.treatmentId join medicine on medicine.medId=giveMed.medId join appointment on appointment.treatmentId=treatment.treatmentId where appointment.treatmentId = ?`,
      req.params.treatmentId
    );
    res.json(row);
  } catch (error) {
    console.log(error);
  }
});

router.get(`/treatmentFeedback/:treatmentId`, async function (req, res, next) {
  const treatmentId = req.params.treatmentId;
  try {
    const [row, f] = await pool.query(
      `select * from feedback join appointment on appointment.appointId=feedback.appointId join treatment on treatment.treatmentId=appointment.treatmentId where appointment.treatmentId =?`,
      treatmentId
    );
    res.json(row);
  } catch (error) {
    console.log(error);
  }
});

router.post(`/completeFeedback`, async function (req, res, next) {
  const feedbackId = req.body.feedbackId;
  const sideEffLevel = req.body.sideEffLevel;
  const treatmentId = req.body.treatmentId;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    await conn.query(
      `update feedback set sideEfflevel = ? where feedbackId = ?`,
      [sideEffLevel, feedbackId]
    );
    conn.commit();
    const [row, f] = await conn.query(
      `select * from feedback join appointment on appointment.appointId=feedback.appointId join treatment on treatment.treatmentId=appointment.treatmentId where appointment.treatmentId =?`,
      treatmentId
    );
    res.json(row);
  } catch (error) {
    conn.rollback();
    console.log(error);
  } finally {
    conn.release();
  }
});

exports.router = router;
