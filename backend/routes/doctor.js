const express = require("express");
const pool = require("../config");
const app = express();
const cors = require("cors");

app.use(cors());

router = express.Router();

router.get("/doctor", async function (req, res, next) {
  try {
    const [rows, _] = await pool.query(
      "SELECT * FROM DOCTOR join user on user.userId=doctor.doctorId"
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
});

router.get("/patients/doctor", async function (req, res, next) {
  try {
    const [rows, _] = await pool.query(
      "SELECT * FROM DOCTOR inner join patient on doctor.doctorId=patient.doctorId"
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
});

router.get("/appointment/:HN", async function (req, res, next) {
  const HN = req.params.HN;
  try {
    const [rows, _] = await pool.query(
      'SELECT concat(user.firstName, " ", user.lastName) as doctorName FROM user join doctor on user.userId=doctor.doctorId join patient on doctor.doctorId=patient.doctorId where patient.HN = ?',
      HN
    );
    res.json(rows[0].doctorName);
  } catch (error) {
    console.log(error);
  }
});

//comment

router.get("/getComment/:brId", async function (req, res, next) {
  let brId = req.params.brId;
  try {
    const [row, _] = await pool.query(
      "select * from bloodresult where brId = ?",
      brId
    );
    if (row != []) {
      res.json(row);
    } else {
      res.send("not found");
    }
  } catch (error) {
    console.log(error);
  }
});

///// new /////
router.get("/doctor/:HN", async function (req, res, next) {
  const HN = req.params.HN;
  try {
    const [row1, f1] = await pool.query(
      `select max(treatmentId) as treatmentId from treatment where HN = ?`,
      HN
    );
    const [row, f] = await pool.query(
      "select doctorId from treatment where treatmentId = ?",
      row1[0].treatmentId
    );
    const [rows, fs] = await pool.query(
      `select firstName, lastName from user join doctor on user.userId=doctor.doctorId where userId = ?`,
      row[0].doctorId
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
});

router.post(`/giveMed`, async function (req, res, next) {
  const medType = req.body.medType;
  const amount = req.body.amount;
  const formulaId = req.body.formulaId;
  const treatmentId = req.body.treatmentId;
  const HN = req.body.HN;
  const tab = req.body.tab;
  const result = req.body.result;
  const note = req.body.note;
  const doctorId = req.body.doctorId;
  const brId = req.body.brId;
  const [row1, f1] = await pool.query(
    `select medId from formula_medicine where formulaId = ?`,
    formulaId
  );
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    if (result == "yes") {
      await conn.query(
        `update bloodresult set status = 'อนุมัติผลเลือด' where brId = ?`,
        brId
      );
    } else if (result == "no") {
      await conn.query(
        `update bloodresult set status = 'ส่งผลเลือดอีกครั้ง' where brId = ?`,
        brId
      );
    }
    conn.commit();
    if (medType == "ฉีดเข้าเส้นเลือด") {
      for (let i = 0; i < row1.length; i++) {
        await conn.query(
          `insert into giveMed (medType, treatmentId, unit, formulaId, medId) values (?, ?, ?, ?, ?)`,
          [medType, treatmentId, Number(amount[i]), formulaId, row1[i].medId]
        );
      }
    } else if (medType == "รับประทาน") {
      for (let i = 0; i < row1.length; i++) {
        await conn.query(
          `insert into giveMed (medType, treatmentId, unit, formulaId, medId, tablet) values (?, ?, ?, ?, ?, ?)`,
          [
            medType,
            treatmentId,
            Number(amount[i]),
            formulaId,
            row1[i].medId,
            Number(tab[i]),
          ]
        );
      }
    }
    await conn.query(
      `update bloodresult set date = CURRENT_TIMESTAMP(), suggestion = ?, doctorId = ? where brId = ?`,
      [note, doctorId, brId]
    );
    conn.commit();
    res.send("success");
  } catch (error) {
    conn.rollback();
    console.log(error);
  } finally {
    conn.release();
  }
});

router.post(`/saveGiveMed`, async function (req, res, next) {
  const appointId = req.body.appointId;
  const medGiver = req.body.medGiver;
  const note = req.body.note;
  const HN = req.body.HN;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    await conn.query(
      `update appointment set medGiver = ?, note = ? where appointId = ?`,
      [medGiver, note, appointId]
    );
    conn.commit();
    const [rows, fs] = await conn.query(
      `select * from appointment join treatment on treatment.HN=appointment.HN where appointment.HN = ?`,
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

router.get(`/treatmentDoctor/:doctorId`, async function (req, res, next) {
  const doctorId = req.params.doctorId;
  try {
    const [row, f] = await pool.query(
      `select * from doctor join user on userId=doctorId where doctorId = ?`,
      doctorId
    );
    res.json(row);
  } catch (error) {
    console.log(error);
  }
});

exports.router = router;