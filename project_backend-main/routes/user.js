const express = require('express');
const pool = require('../config');
const app = express()
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(cors());

router = express.Router();

router.post('/register', async function (req, res, next) {
    const userName = req.body.userName
    const psw = req.body.psw
    const type = req.body.type
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const encryptedPassword = await bcrypt.hash(psw, saltRounds)
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        await conn.query(`insert into user (userName, psw, type, firstName, lastName) values (?, ?, ?, ?, ?)`, [userName, encryptedPassword, type, firstName, lastName])
        conn.commit()
    } catch (error) {
        conn.rollback()
        console.log(error)
    } finally {
        conn.release()
    }
})

router.post('/login', async function (req, res, next) {
    let userName = req.body.userName
    let password = req.body.psw
    try {
        const [row, _] = await pool.query(`select * from user where userName = ? and not type = 'patient'`, [userName])
        if (row.length != 0) {
            if (await bcrypt.compare(password, row[0].psw)) {
                res.json(row[0])
            }else {
                res.send('ชื่อผู้ใช้งาน หรือรหัสผ่านไม่ถูกต้อง')
            }
        }else {
            res.send('not found')
        }
    } catch (error) {
        console.log(error)
    }
})

router.get('/user/:userId', async function (req, res, next) {
    let userId = req.params.userId
    try {
        const [row, _] = await pool.query('select * from user where userId = ?', userId)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

router.get(`/user`, async function (req, res, next) {
    try {
        const [row, _] = await pool.query(`select * from user`)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

router.get(`/onlyPatient`, async function (req, res, next) {
    console.log('ok')
    try {
        const [row, f] = await pool.query(`select * from user join patient on user.userName=Patient.IDcard where type='patient'`)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

router.post(`/setPassword`, async function (req, res, next) {
    const userName = req.body.userName
    const psw = req.body.psw
    const encryptedPassword = await bcrypt.hash(psw, saltRounds)
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        await conn.query(`update user set psw = ? where userName = ?`, [encryptedPassword, userName])
        conn.commit()
        res.send('set password')
    } catch (error) {
        conn.rollback()
        console.log(error)
    } finally {
        conn.release()
    }
})

router.get(`/chemist`, async function (req, res, next) {
    try {
        const [row, f] = await pool.query(`select * from user where type='chemist'`)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})


exports.router = router;