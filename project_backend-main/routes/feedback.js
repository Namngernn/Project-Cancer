const express = require('express');
const pool = require('../config');
const app = express()
const cors = require('cors');

app.use(cors());

router = express.Router();

router.post('/feedback/:HN/:appoint_no', async function (req, res, next) {
    let HN = req.params.HN
    let appoint_no = req.params.appoint_no
    let sideEffect = req.body.sideEffect
    let date = req.body.date
    console.log(req.body.date, req.body.sideEffect)
    const [rows, _] = await pool.query('select appointId from appointment where appoint_no = ? and HN = ?', [appoint_no, HN])
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        const [row, _] = await conn.query('insert into feedback (sendAt, sideEfflevel, appointId) values (?, ?, ?)', [date, sideEffect, rows[0].appointId])
        conn.commit()
        res.send('บันทึกเสร็จสิ้น')
    } catch (error) {
        conn.rollback()
        console.log(error)
    } finally {
        conn.release()
    }
})

router.get('/feedback/:HN', async function (req, res, next) {
    let HN = req.params.HN
    try {
        const [row, _] = await pool.query('SELECT f.* FROM feedback f JOIN appointment a ON f.appointId = a.appointId WHERE a.HN = ?', HN)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

router.get('/selectedFeedback/:appointId', async function (req, res, next){
    let appointId = req.params.appointId
    try {
        const [row, _] = await pool.query('select * from feedback where appointId = ?', appointId)
        if (row.length != 0){
            res.json(row)
        } else {
            res.send('not found')
        }
    } catch (error) {
        console.log(error)
    }
})


//////// new ///////////
//add feedback
router.post(`/newFeedback`, async function (req, res, next) {
    const sideEffect = req.body.sideEffect
    const appointId = req.body.appointId
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        await conn.query(`insert into feedback (patientSideEffect, appointId) values (?, ?)`, [sideEffect, Number(appointId)])
        conn.commit()
        res.send('save')
    } catch (error) {
        conn.rollback()
        console.log(error)
    }finally{
        conn.release()
    }
})

//add note
router.post(`/noteFeedback`, async function (req, res, next){
    const sideEffectLevel = req.body.sideEffectLevel
    // const nurseNote = req.body.nurseNote
    const feedbackId = req.body.feedbackId
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        await conn.query(`update feedback set sideEfflevel = ? where feedbackId = ?`, [sideEffectLevel, feedbackId])
        conn.commit()
        res.send('save')
    } catch (error) {
        conn.rollback()
        console.log(error)
    } finally{
        conn.release()
    }
})

router.get(`/selectedFeedback/:feedbackId`, async function (req, res, next) {
    const feedbackId = req.params.feedbackId
    try {
        const [row, _] = await pool.query(`select * from feedback join appointment on appointment.appointId=feedback.appointId where feedbackId = ?`, feedbackId)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

router.get(`/allFeedback`, async function (req, res, next) {
    try {
        const [row, _] = await pool.query(`select * from feedback join appointment on appointment.appointId=feedback.appointId join patient on patient.HN=appointment.HN join treatment on treatment.HN=patient.HN`)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

router.post(`/appointment/giveMed`, async function (req, res, next){
    const treatmentId = req.body.treatmentId
    try {
        const [row, _] = await pool.query(`select * from giveMed join medicine on medicine.medId=giveMed.medId where treatmentId = ?`, treatmentId)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

router.get(`/treatment/giveMed/:treatmentId`, async function (req, res, next){
    const treatmentId = req.params.treatmentId
    try {
        const [row, f] = await pool.query(`select * from giveMed where treatmentId = ?`, treatmentId)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

router.post(`/completeAppoint`, async function (req, res, next) {
    const medGiver = req.body.medGiver
    const note = req.body.note
    const appointId = req.body.appointId
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        await conn.query(`update appointment set medGiver = ?, note = ? where appointId = ?`, [medGiver, note, appointId])
        conn.commit()
        const [rows, fs] = await conn.query(`select * from appointment join treatment on treatment.treatmentId=appointment.treatmentId where appointment.HN = ?`, HN)
        res.json(rows)
    } catch (error) {
        conn.rollback()
        console.log(error)
    }finally{
        conn.release()
    }
})

router.get(`/giveMed/:treatmentId`, async function (req, res, next){
    try {
        const [row, f] = await pool.query(`select * from giveMed join treatment on treatment.treatmentId=giveMed.treatmentId join medicine on medicine.medId=giveMed.medId join appointment on appointment.treatmentId=treatment.treatmentId where appointment.treatmentId = ?`, req.params.treatmentId)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
    
    
})

router.get(`/treatmentFeedback/:treatmentId`, async function (req, res, next){
    const treatmentId = req.params.treatmentId
    try {
        const [row, f] = await pool.query(`select * from feedback join appointment on appointment.appointId=feedback.appointId join treatment on treatment.treatmentId=appointment.treatmentId where appointment.treatmentId =?`, treatmentId)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

router.post(`/completeFeedback`, async function (req, res, next){
    const feedbackId = req.body.feedbackId
    const sideEffLevel = req.body.sideEffLevel
    const treatmentId = req.body.treatmentId
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        await conn.query(`update feedback set sideEfflevel = ? where feedbackId = ?`, [sideEffLevel, feedbackId])
        conn.commit()
        const [row, f] = await conn.query(`select * from feedback join appointment on appointment.appointId=feedback.appointId join treatment on treatment.treatmentId=appointment.treatmentId where appointment.treatmentId =?`, treatmentId)
        res.json(row)
    } catch (error) {
        conn.rollback()
        console.log(error)
    }finally{
        conn.release()
    }
})


exports.router = router;