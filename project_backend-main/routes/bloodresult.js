const express = require('express');
const pool = require('../config');
const app = express()
const cors = require('cors');

app.use(cors());

router = express.Router();
/*
router.get('/bloodresult/:userId', async function (req, res, next) {
    let data = new Array()
    let userId = req.params.userId
    const [row1, f1] = await pool.query('select * from user where userId = ?', userId)
    
    try {
        if (row1[0].type == 'nurse' || row1[0].type == 'admin') {
            const [row, _] = await pool.query('select HN, max(brId) as brId from bloodresult group by HN')
            if (row.length != 0) {
                for (let i = 0; i < row.length; i++) {
                    const [rows, _] = await pool.query('select * from bloodresult where HN = ?', row[i].HN)
                    data.push(rows[0])
                }
            }
        } else if (row1[0].type == 'doctor'){
            //const [rows, _] = await pool.query('select * from bloodresult join patient on bloodresult.HN=patient.HN where patient.doctorId = ?', userId)
            //data.push(rows)
            const [row, f] = await pool.query('select HN, max(brId) as brId from bloodresult where patient.doctorId = ? group by HN')
            if (row.length != 0) {
                for (let i = 0; i < row.length; i++) {
                    const [rows, _] = await pool.query('select * from bloodresult join patient on bloodresult.HN=patient.HN where patient.doctorId = ?', userId)
                    data.push(rows[0])
                }
            }
        }
        res.json(data)
    } catch (error) {
        console.log(error)
    }
    try {
        const [row, _] = await pool.query('select * from bloodresult join patient on bloodresult.HN=patient.HN')
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

router.get('/bloodresult/patient/:HN', async function (req, res, next) {
    const HN = req.params.HN
    try {
        const [row, _] = await pool.query('select * from bloodresult where HN = ?', HN)
        if (row.length == 0) {
            res.send('not found')
        }else{
            res.json(row)
        }
    } catch (error) {
        
    }
})

router.post('/sortInfoBlood', async function (req, res, next) {
    let data = new Array();
    const sortInfoAppoint = req.body.sortInfo
    try {
        if (sortInfoAppoint == '1') {
            const [rows, _] = await pool.query('select patient.*, bloodresult.HN, max(brId) from bloodresult left join patient on patient.HN=bloodresult.HN group by bloodresult.HN order by patient.firstName asc')
            data.push(rows)
            console.log(rows)
        } else if (sortInfoAppoint == '2') {
            const [rows1, _] = await pool.query('select patient.*, bloodresult.HN, max(brId) from bloodresult left join patient on patient.HN=bloodresult.HN group by bloodresult.HN order by patient.firstName desc')
            data.push(rows1)
        } else if (sortInfoAppoint == '3') {
            const [rows2, _] = await pool.query('select patient.*, bloodresult.HN, max(brId) from bloodresult left join patient on patient.HN=bloodresult.HN group by bloodresult.HN order by patient.HN asc')
            data.push(rows2)
        } else if (sortInfoAppoint == '4') {
            const [rows3, _] = await pool.query('select patient.*, bloodresult.HN, max(brId) from bloodresult left join patient on patient.HN=bloodresult.HN group by bloodresult.HN order by patient.HN desc')
            data.push(rows3)
        }
        console.log(data)
        res.json(data)
    } catch (error) {
        console.log(error)
    }
})

router.post('/selectedBlood', async function (req, res, next) {
    let data = new Array();
    const selected = req.body.selected
    try {
        if (selected == '') {
            const [row, _] = await pool.query('select HN, max(brId) as brId from bloodresult group by HN')
        }
        const [rows, f] = await pool.query('SELECT * FROM bloodResult WHERE HN=?', selected)
        const [rows1, f1] = await pool.query('select * from bloodresult join patient on bloodresult.HN=patient.HN where firstName like ? or lastName like ?', [`%${selected}%`, `%${selected}%`])
        const [rows2, f2] = await pool.query('select * from bloodresult join patient on bloodresult.HN=patient.HN where cancerType like ?', [`%${selected}%`])
        if (rows.length != 0) {
            data.push(rows);
        } else if (rows1.length != 0) {
            data.push(rows1)
        } else if (rows2.length != 0) {
            data.push(rows2)
        }
        if (data.length != 0) {
            res.json(data)
        } else {
            res.send('ไม่พบรายชื่อที่ค้นหา')
        }
    } catch (error) {
        console.log(error)
    }
})
*/

router.get('/bloodresult/patient/:HN/:treatmentId', async function (req, res, next) {
    const HN = req.params.HN
    const treatmentId = req.params.treatmentId
    try {
        const [row, _] = await pool.query('select * from bloodresult join treatment on treatment.treatmentId=bloodresult.treatmentId where treatment.HN = ? and treatment.treatmentId = ? order by brId desc', [HN, treatmentId])
        if (row.length == 0) {
            res.send('not found')
        }else{
            res.json(row)
        }
    } catch (error) {
        
    }
})

router.get('/picture/:HN', async function (req, res, next) {
    const HN = req.params.HN
    try {
        const [row, _] = await pool.query('select max(brId) as brId, picture from bloodresult join treatment on treatment.treatmentId=bloodresult.treatmentId where treatment.HN = ? group by brId', HN)
        if (row.length == 0){
            res.send('not found')
        }else{
            res.json(row)
        }
    } catch (error) {
        console.log(error)
    }
})

router.post(`/sortBloodresult`, async function (req, res, next){
    const sortBlood = req.body.sortBlood
    let cancer = new Array
    let data = new Array
    try {
        const [rows, fs] = await pool.query(`select max(brId) as brId, patient.HN from bloodresult join treatment on treatment.treatmentId=bloodresult.treatmentId join patient on treatment.HN=patient.HN group by treatment.treatmentId`)
        if (sortBlood == '1'){
            for (let i = 0; i<rows.length; i++){
                const [row, _] = await pool.query(`select * from treatment join patient on patient.HN=treatment.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ? order by patient.firstName asc`, [rows[i].brId])
                const [row1, f1] = await pool.query(`select * from patient join cancer_patient on patient.HN=cancer_patient.HN join cancer on cancer.cancerId=cancer_patient.cancerId join treatment on treatment.HN=patient.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ?`, rows[i].brId)
                for (j = 0; j<row1.length; j++){
                    cancer.push(row1[j])
                }
                if (row.length != 0){
                    row[i].cancer = cancer
                }
                data.push(row)
            }
        }else if (sortBlood == '2'){
            for (let i = 0; i<rows.length; i++){
                const [row, _] = await pool.query(`select * from treatment join patient on patient.HN=treatment.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ? order by patient.firstName desc`, [rows[i].brId])
                const [row1, f1] = await pool.query(`select * from patient join cancer_patient on patient.HN=cancer_patient.HN join cancer on cancer.cancerId=cancer_patient.cancerId join treatment on treatment.HN=patient.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ?`, rows[i].brId)
                for (j = 0; j<row1.length; j++){
                    cancer.push(row1[j])
                }
                if (row.length != 0){
                    row[i].cancer = cancer
                }
                data.push(row)
            }
        }else if (sortBlood == '3'){
            for (let i = 0; i<rows.length; i++){
                const [row, _] = await pool.query(`select * from treatment join patient on patient.HN=treatment.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ? order by bloodresult.date is null, date asc`, [rows[i].brId])
                const [row1, f1] = await pool.query(`select * from patient join cancer_patient on patient.HN=cancer_patient.HN join cancer on cancer.cancerId=cancer_patient.cancerId join treatment on treatment.HN=patient.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ?`, rows[i].brId)
                for (j = 0; j<row1.length; j++){
                    cancer.push(row1[j])
                }
                if (row.length != 0){
                    row[i].cancer = cancer
                }
                data.push(row)
            }
        }else if (sortBlood == '4'){
            for (let i = 0; i<rows.length; i++){
                const [row, _] = await pool.query(`select * from treatment join patient on patient.HN=treatment.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ? order by bloodresult.date is null, date desc`, [rows[i].brId])
                const [row1, f1] = await pool.query(`select * from patient join cancer_patient on patient.HN=cancer_patient.HN join cancer on cancer.cancerId=cancer_patient.cancerId join treatment on treatment.HN=patient.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ?`, rows[i].brId)
                for (j = 0; j<row1.length; j++){
                    cancer.push(row1[j])
                }
                if (row.length != 0){
                    row[i].cancer = cancer
                }
                data.push(row)
            }
        }else if (sortBlood == '5'){
            for (let i = 0; i<rows.length; i++){
                const [row, _] = await pool.query(`select * from treatment join patient on patient.HN=treatment.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ? and bloodresult.status = 'รออนุมัติผลเลือด' order by date desc`, [rows[i].brId])
                const [row1, f1] = await pool.query(`select * from patient join cancer_patient on patient.HN=cancer_patient.HN join cancer on cancer.cancerId=cancer_patient.cancerId join treatment on treatment.HN=patient.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ?`, rows[i].brId)
                for (j = 0; j<row1.length; j++){
                    cancer.push(row1[j])
                }
                if (row.length != 0){
                    row[i].cancer = cancer
                }
                data.push(row)
            }
        }else if (sortBlood == '6'){
            for (let i = 0; i<rows.length; i++){
                const [row, _] = await pool.query(`select * from treatment join patient on patient.HN=treatment.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ? and bloodresult.status = 'อนุมัติผลเลือด' order by date desc`, [rows[i].brId])
                const [row1, f1] = await pool.query(`select * from patient join cancer_patient on patient.HN=cancer_patient.HN join cancer on cancer.cancerId=cancer_patient.cancerId join treatment on treatment.HN=patient.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ?`, rows[i].brId)
                for (j = 0; j<row1.length; j++){
                    cancer.push(row1[j])
                }
                if (row.length != 0){
                    row[i].cancer = cancer
                }
                data.push(row)
            }
        }else if (sortBlood == '7'){
            for (let i = 0; i<rows.length; i++){
                const [row, _] = await pool.query(`select * from treatment join patient on patient.HN=treatment.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ? and bloodresult.status = 'ส่งผลเลือดอีกครั้ง' order by date desc`, [rows[i].brId])
                const [row1, f1] = await pool.query(`select * from patient join cancer_patient on patient.HN=cancer_patient.HN join cancer on cancer.cancerId=cancer_patient.cancerId join treatment on treatment.HN=patient.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ?`, rows[i].brId)
                for (j = 0; j<row1.length; j++){
                    cancer.push(row1[j])
                }
                if (row.length != 0){
                    row[i].cancer = cancer
                }
                data.push(row)
            }
        }
        res.json(data)
    } catch (error) {
        console.log(error)
    }
})

router.get(`/getBloodresult/:brId`, async function (req, res, next){
    try {
        const [row, f] = await pool.query(`select * from bloodresult where brId = ?` , req.params.brId)
        res.json(row[0])
    } catch (error) {
        console.log(error)
    }
})

exports.router = router;