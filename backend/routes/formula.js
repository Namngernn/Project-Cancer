const express = require("express");
const pool = require("../config");
const app = express();
const cors = require("cors");

// app.use(cors());
app.use(
  cors({
    origin: "https://p6l7k2jx-5173.asse.devtunnels.ms", // Frontend URL
    methods: "GET, POST, PUT, DELETE",
  })
);

router = express.Router();

router.get("/formula", async function (req, res, next) {
  try {
    const [rows, _] = await pool.query(
      "select formula.formulaId, formulaName, IFNULL(COUNT(HN), 0) as count from formula left join treatment on formula.formulaId=treatment.formulaId group by formula.formulaId order by formulaId asc"
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
});

router.get("/formula/use", async function (req, res, next) {
  try {
    const [row, f] = await pool.query(
      "select formula.formulaId, COUNT(HN) as count from formula join treatment on formula.formulaId=treatment.formulaId where formula.formulaId=1 group by formula.formulaId"
    );
    const [rows, _] = await pool.query(
      "select formula.formulaId, COUNT(HN) as count from formula join treatment on formula.formulaId=treatment.formulaId group by formula.formulaId"
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
});

router.get(`/Allformula`, async function (req, res, next) {
  try {
    const [row, f] = await pool.query(`select * from formula`);
    res.json(row);
  } catch (error) {
    console.log(error);
  }
});

router.get("/formula/medicine", async function (req, res, next) {
  try {
    const [rows, _] = await pool.query(
      "select * from medicine order by medName ASC"
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
});

router.post("/sortFormula", async function (req, res, next) {
  let data = new Array();
  const sortFormula = req.body.sortFormula;
  try {
    if (sortFormula == "1") {
      const [rows, _] = await pool.query(
        "select formula.formulaId, formulaName, IFNULL(COUNT(HN), 0) as count from formula left join treatment on formula.formulaId=treatment.formulaId group by formula.formulaId order by formulaName asc"
      );
      data.push(rows);
    } else if (sortFormula == "2") {
      const [rows1, _] = await pool.query(
        "select formula.formulaId, formulaName, IFNULL(COUNT(HN), 0) as count from formula left join treatment on formula.formulaId=treatment.formulaId group by formula.formulaId order by formulaName desc"
      );
      data.push(rows1);
    } else if (sortFormula == "3") {
      const [rows2, _] = await pool.query(
        "select formula.formulaId, formulaName, IFNULL(COUNT(HN), 0) as count from formula left join treatment on formula.formulaId=treatment.formulaId group by formula.formulaId order by count desc"
      );
      data.push(rows2);
    } else if (sortFormula == "4") {
      const [rows3, _] = await pool.query(
        "select formula.formulaId, formulaName, IFNULL(COUNT(HN), 0) as count from formula left join treatment on formula.formulaId=treatment.formulaId group by formula.formulaId order by count asc"
      );
      data.push(rows3);
    } else if (sortFormula == "5") {
      const [rows4, _] = await pool.query(
        "select formula.formulaId, formulaName, IFNULL(COUNT(HN), 0) as count from formula left join treatment on formula.formulaId=treatment.formulaId group by formula.formulaId order by formulaId asc"
      );
      data.push(rows4);
    } else if (sortFormula == "6") {
      const [rows5, _] = await pool.query(
        "select formula.formulaId, formulaName, IFNULL(COUNT(HN), 0) as count from formula left join treatment on formula.formulaId=treatment.formulaId group by formula.formulaId order by formulaId desc"
      );
      data.push(rows5);
    }
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/searchFormula", async function (req, res, next) {
  try {
    const [rows, _] = await pool.query(
      `select formula.formulaId, formulaName, COUNT(HN) as count from formula left join treatment on formula.formulaId=treatment.formulaId where formulaName like ? group by formula.formulaId`,
      [`%${req.body.search}%`]
    );
    if (rows.length != 0) {
      res.json(rows);
    } else {
      res.send("ไม่พบสูตรยาที่ค้นหา");
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/deleteFormula/:formulaName", async function (req, res, next) {
  const formulaName = req.params.formulaName;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    await conn.query(`delete from formula where formulaName = ?`, formulaName);
    conn.commit();
    res.send("ลบสูตรยาเคมีสำเร็จ");
  } catch (error) {
    conn.rollback();
    console.log(error);
  } finally {
    conn.release();
  }
});

router.get("/formula_medicine/:formulaId", async function (req, res, next) {
  const formulaId = req.params.formulaId;
  let medName = new Object();
  const [row, _] = await pool.query(
    "select * from formula join formula_medicine on formula.formulaId=formula_medicine.formulaId join medicine on medicine.medId=formula_medicine.medId where formula.formulaId=?",
    formulaId
  );
  for (let i = 0; i < row.length; i++) {
    if (row.length >= 2) {
      medName[i] = { medId: row[i].medId, medName: row[i].medName };
    } else if (row.length == 1) {
      medName = { medId: row[0].medId, medName: row[0].medName };
    }
  }
  res.json(medName);
});

router.get("/Formulamedicine/:formula", async function (req, res, next) {
  const formulaName = req.params.formula;
  try {
    const [row, f] = await pool.query(
      "select formulaId from formula where formulaName=?",
      formulaName
    );
    const [rows, f1] = await pool.query(
      "select * from medicine join formula_medicine on formula_medicine.medId=medicine.medId where formula_medicine.formulaId=?",
      row[0].formulaId
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
});

router.get("/AllFormula_Medicine", async function (req, res, next) {
  try {
    const [row, _] = await pool.query(
      "select * from formula_medicine join medicine on formula_medicine.medId=medicine.medId order by formulaId"
    );
    res.json(row);
  } catch (error) {
    console.log(error);
  }
});

///// new /////

router.get("/myformula/:HN/:treatmentId", async function (req, res, next) {
  const HN = req.params.HN;
  const treatmentId = req.params.treatmentId;
  const [row, f] = await pool.query(
    "select formulaId from treatment where HN = ? and treatmentId = ?",
    [HN, treatmentId]
  );
  console.log(row);
  try {
    const [rows, fs] = await pool.query(
      "select formulaName from formula where formulaId = ?",
      row[0].formulaId
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
});

router.get(`/formulaName/:formulaId`, async function (req, res, next) {
  const formulaId = req.params.formulaId;
  try {
    const [row, f] = await pool.query(
      `select formulaName from formula where formulaId = ?`,
      formulaId
    );
    res.json(row[0].formulaName);
  } catch (error) {
    console.log(error);
  }
});

router.get(`/Allformula`, async function (req, res, next) {
  try {
    const [row, _] = await pool.query(`select * from formula`);
    res.json(row);
  } catch (error) {
    console.log(error);
  }
});

router.get(`/medicine/:formulaId`, async function (req, res, next) {
  try {
    const [row, _] = await pool.query(
      `select * from formula_medicine join formula on formula_medicine.formulaId=formula.formulaId join medicine on medicine.medId=formula_medicine.medId where formula.formulaId = ?`,
      req.params.formulaId
    );
    res.json(row);
  } catch (error) {
    console.log(error);
  }
});

router.post("/addFormula", async function (req, res, next) {
  const formulaName = req.body.formulaName;
  const medicine = req.body.medicine;
  const numberOfRound = req.body.numberOfRound;
  const period = req.body.period;
  const data = new Array();
  const [row, f] = await pool.query(`select * from medicine`);
  row.filter((x) => {
    if (medicine.includes(x.medName)) data.push(x.medName);
  });
  let diff = medicine.filter((x) => !data.includes(x));
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    const [row2, f2] = await conn.query(
      `select * from formula where formulaName = ?`,
      formulaName
    );
    if (row2.length == 0) {
      await conn.query(
        `insert into formula (formulaName, numberOfRound, period) values (?, ?, ?)`,
        [formulaName, numberOfRound, period]
      );
      await conn.query(
        `insert into guideBook (formulaId) values (last_insert_id())`
      );
      conn.commit();
    }
    if (diff.length != 0) {
      for (let i = 0; i < diff.length; i++) {
        await conn.query(`insert into medicine (medName) values (?)`, diff[i]);
        conn.commit();
      }
      while (diff.length > 0) {
        diff.pop();
      }
    }
    if (diff.length == 0) {
      for (let j = 0; j < medicine.length; j++) {
        const [row3, f3] = await conn.query(
          `select formulaId from formula where formulaName = ?`,
          formulaName
        );
        let [row1, f1] = await conn.query(
          `select medId from medicine where medName = ?`,
          medicine[j]
        );
        await conn.query(
          `insert into formula_medicine (formulaId, medId) values (?, ?)`,
          [row3[0].formulaId, row1[0].medId]
        );
      }
    }
    conn.commit();
    res.send("เพิ่มสูตรยาเคมีสำเร็จ");
  } catch (error) {
    conn.rollback();
    console.log(error);
  } finally {
    conn.release();
  }
});

router.post(`/deleteMedFromFormula`, async function (req, res, next) {
  const medId = req.body.medId;
  const formulaId = req.body.formulaId;
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    await conn.query(`delete from guideBook where formulaId = ?`, formulaId);
    await conn.query(
      `delete from formula_medicine where medId = ? and formulaId = ?`,
      [medId, formulaId]
    );
    conn.commit();
    const [row, _] = await conn.query(
      `select * from formula_medicine join formula on formula_medicine.formulaId=formula.formulaId join medicine on medicine.medId=formula_medicine.medId where formula.formulaId = ?`,
      formulaId
    );
    res.json(row);
  } catch (error) {
    conn.rollback();
    console.log(error);
  } finally {
    conn.release();
  }
});

router.post("/updateFormula/:formulaId", async function (req, res, next) {
  const formulaId = req.params.formulaId;
  const medicine = req.body.medicine;
  const data = new Array();
  const [row, f] = await pool.query(`select * from medicine`);
  row.filter((x) => {
    if (medicine.includes(x.medName)) data.push(x.medName);
  });
  let diff = medicine.filter((x) => !data.includes(x));
  const conn = await pool.getConnection();
  await conn.beginTransaction();
  try {
    if (diff.length != 0) {
      for (let i = 0; i < diff.length; i++) {
        await conn.query(`insert into medicine (medName) values (?)`, diff[i]);
        conn.commit();
      }
      while (diff.length > 0) {
        diff.pop();
      }
    }
    if (diff.length == 0) {
      for (let j = 0; j < medicine.length; j++) {
        let [row1, f1] = await conn.query(
          `select medId from medicine where medName = ?`,
          medicine[j]
        );
        await conn.query(
          `insert into formula_medicine (formulaId, medId) values (?, ?)`,
          [formulaId, row1[0].medId]
        );
      }
    }
    conn.commit();
    const [row1, f1] = await conn.query(
      `select * from formula_medicine join formula on formula_medicine.formulaId=formula.formulaId join medicine on medicine.medId=formula_medicine.medId where formula.formulaId = ?`,
      formulaId
    );
    res.json(row1);
  } catch (error) {
    conn.rollback();
    console.log(error);
  } finally {
    conn.release();
  }
});

router.get(`/guideBook`, async function (req, res, next) {
  try {
    const [row, f] = await pool.query(
      `select * from formula left join guideBook on formula.formulaId=guideBook.formulaId`
    );
    res.json(row);
  } catch (error) {
    console.log(error);
  }
});

exports.router = router;
