const express = require('express');
const pool = require('../config');
const app = express()
const cors = require('cors');

app.use(cors());

router = express.Router();
/*
router.get('/appointment', async function (req, res, next) {
    try {
        const [rows, _] = await pool.query(`select patient.*, appointment.HN, max(appointId) as appointId from appointment join history on history.historyId=appointment.historyId left join patient on patient.HN=history.HN group by patient.HN`)
        res.json(rows)
    } catch (error) {
        console.log(error)
    }
})

router.get('/appointment/appoint/:HN', async function (req, res, next) {
    const HN = req.params.HN;
    try {
        const [rows, _] = await pool.query(`select * from appointment join history on history.historyId join patient on patient.HN=history.HN where patient.HN=?`, HN)
        res.json(rows)
    } catch (error) {
        console.log(error)
    }
})


router.get('/appointment_medicine/:HN', async function (req, res, next) {
    const HN = req.params.HN
    try {
        const [rows, _] = await pool.query('select * from appointment join appointment_medicine on appointment.appointId=appointment_medicine.appointment_appointId join history on history.historyId join patient on patient.HN=history.HN where patient.HN=?', HN)
        res.json(rows)
    } catch (error) {
        console.log(error)
    }
})

router.get('/appointment/appoint/patient/:HN', async function (req, res, next) {
    const HN = req.params.HN;
    try {
        const [rows, _] = await pool.query(`select * from patient join formula on patient.formulaId=formula.formulaId where HN=?`, HN)
        res.json(rows)
    } catch (error) {
        console.log(error)
    }
})

router.post('/newAppointment', async function (req, res, next) {
    const patient_name = req.body.patient_name.split(" ");
    const firstName = patient_name[0];
    const lastName = patient_name[1];
    const date = req.body.date
    const formula = req.body.formula
    const formulasmedicine = req.body.formulasmedicine
    const amount1 = req.body.amount1
    const chemist = req.body.chemist
    const note = req.body.note
    const side_eff_level = req.body.side_eff_level
    const [row, f] = await pool.query('select HN from patient where firstName = ? and lastName = ?', [firstName, lastName])
    const [rows2, f2] = await pool.query('select count(appoint_no) as appoint_no from appointment where HN=?', row[0].HN)
    const new_appoint_no = Number(rows2[0].appoint_no) + 1
    const [rows3, fs3] = await pool.query('select formulaId from formula where formulaName=?', formula)
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        const [rows, f1] = await conn.query('insert into appointment (side_eff_level, chemistName, note, appointDate, HN, appoint_no) values (IFNULL(NULL, ?), ?, IFNULL(NULL, ?), ?, ?, IFNULL(NULL, ?))', [side_eff_level, chemist, note, date, row[0].HN, new_appoint_no])
        for (let i = 0; i < amount1.length; i++) {
            const [rows1, f2] = await conn.query('insert into appointment_medicine (appointment_appointId, formula_formulaId, medicine_medId, unit) values (LAST_INSERT_ID(), ?, ?, ?)', [rows3[0].formulaId, formulasmedicine[i].medId, amount1[i]])
        }
        conn.commit()
        res.send('เพิ่มนัดหมายเสร็จสิ้น')
    } catch (error) {
        conn.rollback()
        console.log(error)
    } finally {
        conn.release()
    }
})

router.post('/updateAppoint', async function (req, res, next) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const date = req.body.date
    const formula = req.body.formula
    const formulasmedicine = req.body.formulasmedicine
    const amount1 = req.body.amount1
    const chemist = req.body.chemist
    const note = req.body.note
    const side_eff_level = req.body.side_eff_level
    const appointId = req.body.appointId
    const [row, f] = await pool.query('select HN from patient where firstName =? and lastName=?', [firstName, lastName])
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        const [rows, f1] = await conn.query('update appointment set side_eff_level = IFNULL(NULL, ?), chemistName = ?, note = IFNULL(NULL, ?), appointDate = ? where HN=? and appointId=? ', [side_eff_level, chemist, note, date, row[0].HN, appointId])
        for (let i = 0; i < amount1.length; i++) {
            const [rows1, f2] = await conn.query('update appointment_medicine set unit =? where appointment_appointId=? and medicine_medId=?', [Number(amount1[i]), appointId, formulasmedicine[i].medId])
        }
        conn.commit()
        res.send('แก้ไขนัดหมายเสร็จสิ้น')
    } catch (error) {
        conn.rollback()
        console.log(error)
    } finally {
        conn.release()
    }
})

router.post('/sortInfoAppoint', async function (req, res, next) {
    let data = new Array();
    const sortInfoAppoint = req.body.sortInfoAppoint
    try {
        if (sortInfoAppoint == '1') {
            const [rows, _] = await pool.query('select patient.*, appointment.HN, max(appointId) from appointment left join patient on patient.HN=appointment.HN group by appointment.HN order by patient.firstName asc')
            data.push(rows)
        } else if (sortInfoAppoint == '2') {
            const [rows1, _] = await pool.query('select patient.*, appointment.HN, max(appointId) from appointment left join patient on patient.HN=appointment.HN group by appointment.HN order by patient.firstName desc')
            data.push(rows1)
        } else if (sortInfoAppoint == '3') {
            const [rows2, _] = await pool.query('select patient.*, appointment.HN, max(appointId) from appointment left join patient on patient.HN=appointment.HN group by appointment.HN order by patient.HN asc')
            data.push(rows2)
        } else if (sortInfoAppoint == '4') {
            const [rows3, _] = await pool.query('select patient.*, appointment.HN, max(appointId) from appointment left join patient on patient.HN=appointment.HN group by appointment.HN order by patient.HN desc')
            data.push(rows3)
        }
        res.json(data)
    } catch (error) {
        console.log(error)
    }
})

router.post('/sortStatus', async function (req, res, next) {
    let data = new Array()
    let sortStatus = req.body.status
    try {
        if (sortStatus == '1'){
            sortStatus = 'อนุมัติรับยา'
            const [row, f] = await pool.query('select patient.*, appointment.HN, max(appointId) from appointment left join patient on patient.HN=appointment.HN where patient.status=? group by appointment.HN', sortStatus)
            data.push(row)
        }else if (sortStatus == '2'){
            sortStatus = 'รอการดำเนินการ'
            const [row1, f1] = await pool.query('select patient.*, appointment.HN, max(appointId) from appointment left join patient on patient.HN=appointment.HN where patient.status=? group by appointment.HN', sortStatus)
            data.push(row1)
        } else if (sortStatus == '3'){
            sortStatus = 'ผลเลือดไม่ผ่าน'
            const [row2, f2] = await pool.query('select patient.*, appointment.HN, max(appointId) from appointment left join patient on patient.HN=appointment.HN where patient.status=? group by appointment.HN', sortStatus)
            data.push(row2)
        }
        if (data.length != 0){
            res.json(data)
        } else {
            res.send('ไม่พบนัดหมายที่ค้นหา')
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/selectedAppoint', async function (req, res, next) {
    let data = new Array()
    const selected = req.body.selected;
    try {
        if (selected == '') {
            const [rows, _] = await pool.query(`select patient.*, appointment.HN, max(appointId) from appointment left join patient on patient.HN=appointment.HN group by appointment.HN`)
            data.push(rows)
        }
        const [row, f] = await pool.query('select patient.*, appointment.HN, max(appointId) from appointment left join patient on patient.HN=appointment.HN where patient.HN = ? group by appointment.HN', selected)
        const [row1, f1] = await pool.query('select patient.*, appointment.HN, max(appointId) from appointment left join patient on patient.HN=appointment.HN where patient.firstName like ? or patient.lastName like ? group by appointment.HN', [`%${selected}%`, `%${selected}%`])
        const [row2, f2] = await pool.query('select patient.*, appointment.HN, max(appointId) from appointment left join patient on patient.HN=appointment.HN where patient.cancerType like ? group by appointment.HN', [`%${selected}%`])
        if (row.length != 0) {
            data.push(row)
        } else if (row1.length != 0) {
            data.push(row1)
        } else if (row2.length != 0) {
            data.push(row2)
        }
        if (data.length != 0) {
            res.json(data)
        } else {
            res.send('ไม่พบนัดหมายที่ค้นหา')
        }

    } catch (error) {
        console.log(error)
    }
})

router.get('/appoint/:appointId', async function (req, res, next) {
    const appointId = req.params.appointId
    try {
        const [row, _] = await pool.query(`select * from appointment join appointment_medicine on appointment.appointId=appointment_medicine.appointment_appointId join medicine on medicine.medId=appointment_medicine.medicine_medId where appointment.appointId=?`, appointId)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

router.post('/EditSideEffLevel/:appointId', async function (req, res, next) {
    let appointId = req.params.appointId
    let side_eff_level = req.body.side_eff_level
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        await conn.query('update appointment set side_eff_level = ? where appointId = ?', [side_eff_level, appointId])
        conn.commit()
        res.send('save')
    } catch (error) {
        conn.rollback()
        console.log(error)
    } finally {
        conn.release()
    }
})
*/

///////////// ใหม่ ///////////////

router.post('/newAppointment', async function (req, res, next) {
    const appointDate = req.body.appointDate
    const note = req.body.note
    const HN = req.body.HN
    const appoint_no = 0
    const formulaId = req.body.formulaId
    const [row, _] = await pool.query(`select max(appoint_no) as no from appointment join treatment on treatment.treatmentId=appointment.treatmentId where appointment.HN = ? and formulaId = ?`, [HN, formulaId])
    if (row.length == 0) {
        appoint_no += 1
    } else if (row.length != 0) {
        appoint_no = row[0].appoint_no + 1
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    try {
        await conn.query(`insert into appointment (appointDate, appoint_no, note) values (?, ?, if(null, ?))`, [appointDate, appoint_no, note])
        conn.commit()
        res.send(`success`)
    } catch (error) {
        conn.rollback()
        console.log(error)
    } finally {
        conn.release()
    }
})

router.get(`/appointment`, async function (req, res, next) {
    try {
        const [row, _] = await pool.query(`select * from appointment`)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

router.get(`/thisappointment/:HN/:treatmentId`, async function (req, res, next) {
    const HN = req.params.HN
    console.log('aaaaa')
    try {
        const [row, _] = await pool.query(`select * from appointment join treatment on treatment.treatmentId=appointment.treatmentId where appointment.HN = ? and appointment.treatmentId= ?`, [HN, req.params.treatmentId])
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

router.post(`/sortAppointInfo`, async function (req, res, next) {
    const sortAppoint = req.body.sortAppoint
    let data = new Array
    let cancer = new Array
    try {
        if (sortAppoint == '1') {
            const [row, f] = await pool.query(`select max(brId) as brId from patient 
            left join appointment on appointment.HN=patient.HN 
            join treatment on treatment.HN=patient.HN 
            join bloodresult on bloodresult.treatmentId=treatment.treatmentId
            where bloodresult.status = 'อนุมัติผลเลือด' and treatment.treatmentStatus = 'อยู่ระหว่างการรักษา' group by bloodresult.brId order by bloodresult.date asc`)
            for (let i = 0; i < row.length; i++) {
                const [row1, f1] = await pool.query(`select max(appointId) as appointId from appointment join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on bloodresult.treatmentId=treatment.treatmentId where brId = ?`, row[i].brId)
                if (row1[0].appointId != null) {
                    const [row2, f2] = await pool.query(`select * from patient left join appointment on patient.HN=appointment.HN join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on treatment.treatmentId=bloodresult.treatmentId join formula on treatment.formulaId=formula.formulaId where appointment.appointId = ? and bloodresult.brId = ?`, [row1[0].appointId, row[i].brId])
                    data.push(row2[0])
                } else {
                    const [row2, f2] = await pool.query(`select * from patient left join appointment on patient.HN=appointment.HN join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on treatment.treatmentId=bloodresult.treatmentId join formula on treatment.formulaId=formula.formulaId where brId = ?`, row[i].brId)
                    data.push(row2[0])

                }
            }
        }
        else if (sortAppoint == '2') {
            const [row, f] = await pool.query(`select max(brId) as brId from patient 
            left join appointment on appointment.HN=patient.HN 
            join treatment on treatment.HN=patient.HN 
            join bloodresult on bloodresult.treatmentId=treatment.treatmentId
            where bloodresult.status = 'อนุมัติผลเลือด' and treatment.treatmentStatus = 'อยู่ระหว่างการรักษา' group by bloodresult.brId order by patient.firstName asc`)
            for (let i = 0; i < row.length; i++) {
                const [row1, f1] = await pool.query(`select max(appointId) as appointId from appointment join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on bloodresult.treatmentId=treatment.treatmentId where brId = ?`, row[i].brId)
                if (row1[0].appointId != null) {
                    const [row2, f2] = await pool.query(`select * from patient left join appointment on patient.HN=appointment.HN join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on treatment.treatmentId=bloodresult.treatmentId join formula on treatment.formulaId=formula.formulaId where appointment.appointId = ? and bloodresult.brId = ?`, [row1[0].appointId, row[i].brId])
                    data.push(row2[0])
                } else {
                    const [row2, f2] = await pool.query(`select * from patient left join appointment on patient.HN=appointment.HN join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on treatment.treatmentId=bloodresult.treatmentId join formula on treatment.formulaId=formula.formulaId where brId = ?`, row[i].brId)
                    data.push(row2[0])

                }
            }
        } else if (sortAppoint == '3') {
            const [row, f] = await pool.query(`select max(brId) as brId from patient 
            left join appointment on appointment.HN=patient.HN 
            join treatment on treatment.HN=patient.HN 
            join bloodresult on bloodresult.treatmentId=treatment.treatmentId
            where bloodresult.status = 'อนุมัติผลเลือด' and treatment.treatmentStatus = 'อยู่ระหว่างการรักษา' group by bloodresult.brId order by patient.firstName desc`)
            for (let i = 0; i < row.length; i++) {
                const [row1, f1] = await pool.query(`select max(appointId) as appointId from appointment join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on bloodresult.treatmentId=treatment.treatmentId where brId = ?`, row[i].brId)
                if (row1[0].appointId != null) {
                    const [row2, f2] = await pool.query(`select * from patient left join appointment on patient.HN=appointment.HN join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on treatment.treatmentId=bloodresult.treatmentId join formula on treatment.formulaId=formula.formulaId where appointment.appointId = ? and bloodresult.brId = ?`, [row1[0].appointId, row[i].brId])
                    data.push(row2[0])
                } else {
                    const [row2, f2] = await pool.query(`select * from patient left join appointment on patient.HN=appointment.HN join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on treatment.treatmentId=bloodresult.treatmentId join formula on treatment.formulaId=formula.formulaId where brId = ?`, row[i].brId)
                    data.push(row2[0])

                }
            }
        } else if (sortAppoint == '4') {
            const [row, f] = await pool.query(`select max(brId) as brId from patient 
            left join appointment on appointment.HN=patient.HN 
            join treatment on treatment.HN=patient.HN 
            join bloodresult on bloodresult.treatmentId=treatment.treatmentId
            where bloodresult.status = 'อนุมัติผลเลือด' and treatment.treatmentStatus = 'อยู่ระหว่างการรักษา' group by bloodresult.brId order by patient.HN asc`)
            for (let i = 0; i < row.length; i++) {
                const [row1, f1] = await pool.query(`select max(appointId) as appointId from appointment join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on bloodresult.treatmentId=treatment.treatmentId where brId = ?`, row[i].brId)
                if (row1[0].appointId != null) {
                    const [row2, f2] = await pool.query(`select * from patient left join appointment on patient.HN=appointment.HN join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on treatment.treatmentId=bloodresult.treatmentId join formula on treatment.formulaId=formula.formulaId where appointment.appointId = ? and bloodresult.brId = ?`, [row1[0].appointId, row[i].brId])
                    data.push(row2[0])
                } else {
                    const [row2, f2] = await pool.query(`select * from patient left join appointment on patient.HN=appointment.HN join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on treatment.treatmentId=bloodresult.treatmentId join formula on treatment.formulaId=formula.formulaId where brId = ?`, row[i].brId)
                    data.push(row2[0])

                }
            }
        } else if (sortAppoint == '5') {
            const [row, f] = await pool.query(`select max(brId) as brId from patient 
            left join appointment on appointment.HN=patient.HN 
            join treatment on treatment.HN=patient.HN 
            join bloodresult on bloodresult.treatmentId=treatment.treatmentId
            where bloodresult.status = 'อนุมัติผลเลือด' and treatment.treatmentStatus = 'อยู่ระหว่างการรักษา' group by bloodresult.brId order by bloodresult.date asc`)
            for (let i = 0; i < row.length; i++) {
                const [row1, f1] = await pool.query(`select max(appointId) as appointId from appointment join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on bloodresult.treatmentId=treatment.treatmentId where brId = ?`, row[i].brId)
                if (row1[0].appointId != null) {
                    const [row2, f2] = await pool.query(`select * from patient left join appointment on patient.HN=appointment.HN join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on treatment.treatmentId=bloodresult.treatmentId join formula on treatment.formulaId=formula.formulaId where appointment.appointId = ? and bloodresult.brId = ?`, [row1[0].appointId, row[i].brId])
                    data.push(row2[0])
                } else {
                    const [row2, f2] = await pool.query(`select * from patient left join appointment on patient.HN=appointment.HN join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on treatment.treatmentId=bloodresult.treatmentId join formula on treatment.formulaId=formula.formulaId where brId = ?`, row[i].brId)
                    data.push(row2[0])

                }
            }
        } else if (sortAppoint == '6') {
            const [row, f] = await pool.query(`select max(brId) as brId from patient 
            left join appointment on appointment.HN=patient.HN 
            join treatment on treatment.HN=patient.HN 
            join bloodresult on bloodresult.treatmentId=treatment.treatmentId
            where bloodresult.status = 'อนุมัติผลเลือด' and treatment.treatmentStatus = 'อยู่ระหว่างการรักษา' group by bloodresult.brId order by bloodresult.date desc`)
            for (let i = 0; i < row.length; i++) {
                const [row1, f1] = await pool.query(`select max(appointId) as appointId from appointment join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on bloodresult.treatmentId=treatment.treatmentId where brId = ?`, row[i].brId)
                if (row1[0].appointId != null) {
                    const [row2, f2] = await pool.query(`select * from patient left join appointment on patient.HN=appointment.HN join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on treatment.treatmentId=bloodresult.treatmentId join formula on treatment.formulaId=formula.formulaId where appointment.appointId = ? and bloodresult.brId = ?`, [row1[0].appointId, row[i].brId])
                    data.push(row2[0])
                } else {
                    const [row2, f2] = await pool.query(`select * from patient left join appointment on patient.HN=appointment.HN join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on treatment.treatmentId=bloodresult.treatmentId join formula on treatment.formulaId=formula.formulaId where brId = ?`, row[i].brId)
                    data.push(row2[0])

                }
            }
        }
        res.json(data)
    } catch (error) {
        console.log(error)
    }
})

router.post(`/selectedAppointPatient`, async function (req, res, next) {
    let data = new Array()
    const selectedAppointPatient = req.body.selectAppointPatient
    try {
        if (selectedAppointPatient == '') {
            const [row, f] = await pool.query(`select max(brId) as brId from bloodresult join treatment on treatment.treatmentId=bloodresult.treatmentId join patient on treatment.HN=patient.HN where bloodresult.status='อนุมัติผลเลือด' group by patient.HN`)
            for (let i = 0; i < row.length; i++) {
                const [row1, f1] = await pool.query(`select max(appointId) as appointId from patient left join appointment on patient.HN=appointment.HN join treatment on treatment.HN=patient.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ?`, row[i].brId)
                if (row1[0].appointId != null) {
                    const [row3, f3] = await pool.query(`select * from patient left join appointment on patient.HN=appointment.HN join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on treatment.treatmentId=bloodresult.treatmentId join formula on treatment.formulaId=formula.formulaId where appointment.appointId = ? and bloodresult.brId = ?`, [row1[0].appointId, row[i].brId])
                    data.push(row3[0])
                } else {
                    const [row2, f2] = await pool.query(`select * from patient left join appointment on patient.HN=appointment.HN join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on treatment.treatmentId=bloodresult.treatmentId join formula on treatment.formulaId=formula.formulaId where brId = ?`, row[i].brId)
                    data.push(row2[0])
                }
            }
        } else {
            const [row, f] = await pool.query(`select max(brId) as brId from patient 
            left join appointment on appointment.HN=patient.HN 
            join treatment on treatment.HN=patient.HN 
            join bloodresult on bloodresult.treatmentId=treatment.treatmentId
            where bloodresult.status = 'อนุมัติผลเลือด' and treatment.treatmentStatus = 'อยู่ระหว่างการรักษา' group by bloodresult.brId order by patient.firstName asc`)
            for (let i = 0; i < row.length; i++) {
                const [row1, f1] = await pool.query(`select max(appointId) as appointId from appointment join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on bloodresult.treatmentId=treatment.treatmentId where brId = ?`, row[i].brId)
                if (row1[0].appointId != null) {
                    const [row2, f2] = await pool.query(`select * from patient left join appointment on patient.HN=appointment.HN join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on treatment.treatmentId=bloodresult.treatmentId join formula on treatment.formulaId=formula.formulaId where appointment.appointId = ? and bloodresult.brId = ? and (patient.HN like ? or patient.firstName like ? or treatment.cancerType like ?)`, [row1[0].appointId, row[i].brId, `%${selectedAppointPatient}%`, `%${selectedAppointPatient}%`, `%${selectedAppointPatient}%`])
                    if (row2.length == 0) {
                        continue
                    } else {
                        data.push(row2[0])
                    }
                } else {
                    const [row2, f2] = await pool.query(`select * from patient left join appointment on patient.HN=appointment.HN join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on treatment.treatmentId=bloodresult.treatmentId join formula on treatment.formulaId=formula.formulaId where brId = ? and (patient.HN like ? or patient.firstName like ? or treatment.cancerType like ?)`, [row[i].brId, `%${selectedAppointPatient}%`, `%${selectedAppointPatient}%`, `%${selectedAppointPatient}%`])
                    if (row2.length == 0) {
                        continue
                    } else {
                        data.push(row2[0])
                    }
                }
            }
        }
        res.json(data)
    } catch (error) {
        console.log(error)
    }
})

/*router.get(`/treatmentHistory/:HN/`, async function (req, res, next) {
    const HN = req.params.HN
    try {
        const [row, _] = await pool.query(`select * from appointment join treatment on treatment.HN=appointment.HN join user on user.userId=treatment.doctorId where appointment.HN = ? and treatmentStatus = 'อยู่ระหว่างการรักษา'`, HN)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})
*/
router.get(`/AlltreatmentHistory/:HN/:treatmentId`, async function (req, res, next) {
    const HN = req.params.HN
    const treatmentId = req.params.treatmentId
    try {
        const [row, f] = await pool.query(`select * from appointment join treatment on appointment.treatmentId=treatment.treatmentId join user on user.userId=treatment.doctorId join feedback on appointment.appointId=feedback.appointId where treatment.HN = ? and treatment.treatmentId=?`, [HN, treatmentId])
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

router.put(`/endTreatment/:treatmentId`, async function (req, res, next) {
    const treatmentId = req.params.treatmentId
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        await conn.query(`update treatment set treatmentStatus = 'สิ้นสุดแผนการรักษา' where treatmentId = ?`, treatmentId)
        conn.commit()
        const [row, f] = await conn.query(`select HN from treatment where treatmentId = ?`, treatmentId)
        const [rows, fs] = await conn.query(`select * from appointment join treatment on appointment.treatmentId=treatment.treatmentId join user on user.userId=treatment.doctorId join feedback on appointment.appointId=feedback.appointId where treatment.HN = ? and treatment.treatmentStatus='สิ้นสุดแผนการรักษา'`, row[0].HN)
        res.json(rows)
    } catch (error) {
        conn.rollback()
        console.log(error)
    } finally {
        conn.release()
    }
})

router.post(`/nurse/appointment`, async function (req, res, next) {
    const date = req.body.date
    try {
        const [row, _] = await pool.query(`select * from appointment where appointDate = ?`)
    } catch (error) {
        console.log(error)
    }
})


router.get('/appoint/appointment', async function (req, res, next) {
    try {
        const [row1, f1] = await pool.query(`select * from patient left join appointment on appointment.HN=patient.HN join treatment on treatment.HN=patient.HN join bloodresult on bloodresult.treatmentId=treatment.treatmentId where status = 'อนุมัติผลเลือด' and appointDate is null`)
        res.json(row1)
    } catch (error) {
        console.log(error)
    }
})

router.post(`/appointDate`, async function (req, res, next) {
    const date = req.body.date
    const HN = req.body.HN
    const treatmentId = req.body.treatmentId
    let appoint_no = 0
    const [row, _] = await pool.query(`select max(appoint_no) as appoint_no from appointment join treatment on treatment.treatmentId=appointment.treatmentId where appointment.HN = ?`, [HN])
    const [row1, f1] = await pool.query(`select * from patient where HN = ?`, HN)
    if (row.length == 0) {
        appoint_no += 1
    } else if (row.length != 0) {
        appoint_no = Number(row[0].appoint_no) + 1
    }
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        await conn.query(`insert into appointment (appointDate, appoint_no, HN, treatmentId, IDcard) values (?, ?, ?, ?, ?)`, [date, appoint_no, HN, treatmentId, row1[0].IDcard])
        await conn.query(`insert into feedback (appointId) values (last_insert_id())`)
        conn.commit()
        const [rows, fs] = await conn.query(`select * from appointment join treatment on treatment.treatmentId=appointment.treatmentId where appointment.HN = ?`, HN)
        res.json(rows)
    } catch (error) {
        conn.rollback()
    } finally {
        conn.release()
    }
})

router.get(`/checkAppoint`, async function (req, res, next) {
    try {
        const [row, _] = await pool.query(`select * from appointment join (select appointment.HN, max(appointDate) as appointDate
        from appointment 
        join treatment on treatment.treatmentId=appointment.treatmentId 
        join bloodresult on bloodresult.treatmentId=treatment.treatmentId 
        where bloodresult.status = 'อนุมัติผลเลือด' 
        group by appointment.HN) as ta on ta.appointDate=appointment.appointDate
        join treatment on treatment.treatmentId=appointment.treatmentId
        join patient on patient.HN=appointment.HN order by appointId desc`)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

router.get(`/AllAppointment`, async function (req, res, next) {
    let data = new Array()
    let cancer = new Array()
    try {
        const [row, f] = await pool.query(`select max(brId) as brId from bloodresult join treatment on treatment.treatmentId=bloodresult.treatmentId join patient on treatment.HN=patient.HN where bloodresult.status='อนุมัติผลเลือด' group by patient.HN`)
        for (let i = 0; i < row.length; i++) {
            const [row1, f1] = await pool.query(`select max(appointId) as appointId from patient left join appointment on patient.HN=appointment.HN join treatment on treatment.HN=patient.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ?`, row[i].brId)
            if (row1[0].appointId != null) {
                const [row3, f3] = await pool.query(`select * from patient left join appointment on patient.HN=appointment.HN join treatment on treatment.treatmentId=appointment.treatmentId join bloodresult on treatment.treatmentId=bloodresult.treatmentId join formula on treatment.formulaId=formula.formulaId where appointment.appointId = ? and bloodresult.brId = ?`, [row1[0].appointId, row[i].brId])
                const [row4, f4] = await pool.query(`select * from cancer join cancer_patient on cancer.cancerId=cancer_patient.cancerId join patient on patient.HN=cancer_patient.HN join treatment on treatment.HN=patient.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where bloodresult.brId = ?`, row[i].brId)
                cancer.push(row4)
                row3[0].cancer = cancer
                data.push(row3[0])
            } else {
                const [row2, f2] = await pool.query(`select * from patient left join appointment on patient.HN=appointment.HN join treatment on treatment.HN=patient.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId join formula on treatment.formulaId=formula.formulaId where bloodresult.brId = ?`, row[i].brId)
                const [row4, f4] = await pool.query(`select * from cancer join cancer_patient on cancer.cancerId=cancer_patient.cancerId join patient on patient.HN=cancer_patient.HN join treatment on treatment.HN=patient.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where bloodresult.brId = ?`, row[i].brId)
                cancer.push(row4)
                row2[0].cancer = cancer
                data.push(row2[0])
            }
        }
        res.json(data)
    } catch (error) {
        console.log(error)
    }
})

router.get(`/request`, async function (req, res, next) {
    try {
        const [row, _] = await pool.query(`select * from request join appointment on appointment.appointId=request.appointId join patient on patient.HN=appointment.HN join treatment on treatment.treatmentId=appointment.HN where requestStatus='รอดำเนินการเลื่อนนัดหมาย' order by requestId desc`)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

router.put(`/request/:requestId`, async function (req, res, next) {
    const requestId = req.params.requestId
    const requestStatus = req.body.requestStatus
    const newAppointDate = req.body.newAppointDate
    const appointId = req.body.appointId
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        await conn.query(`update request set requestStatus = ? where requestId = ?`, [requestStatus, requestId])
        await conn.query(`update appointment set appointDate = ? where appointId = ?`, [newAppointDate, appointId])
        conn.commit()
    } catch (error) {
        conn.rollback()
        console.log(error)
    } finally {
        conn.release()
    }
})

router.post(`/createRequest`, async function (req, res, next) {
    const newAppointDate = req.body.newAppointDate
    const reason = req.body.reason
    const requestPhone = req.body.requestPhone
    const appointId = req.body.appointId
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        await conn.query(`insert into request (newAppointDate, reason, requestPhone, requestStatus, appointId, requestStamp) value (?, ?, ?, 'รอดำเนินการเลื่อนนัดหมาย', ?, CURRENT_TIMESTAMP)`, [newAppointDate, reason, requestPhone, appointId])
        conn.commit()
        res.send('ok')
    } catch (error) {
        conn.rollback()
        console.log(error)
    } finally {
        conn.release()
    }
})

router.post(`/cantPostpone/:requestId`, async function (req, res, next){
    const requestId = req.params.requestId
    const conn = await pool.getConnection()
    try {
        await conn.query(`update request set requestStatus = 'ไม่สามารถเลื่อนนัดหมายได้' where requestId = ?`, requestId)
        conn.commit()
        res.send('success')
    } catch (error) {
        conn.rollback()
        console.log(error)
    } finally {
        conn.release()
    }
})

router.post(`/postponeAppoint/:requestId`, async function (req, res, next) {
    const requestId = req.params.requestId
    const newAppointDate = req.body.newAppointDate
    const appointId = req.body.appointId
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        await conn.query(`update request set requestStatus = 'เลื่อนนัดหมายสำเร็จ' where requestId = ?`, requestId)
        await conn.query(`update appointment set appointDate = ? where appointId = ?`, [newAppointDate, appointId])
        conn.commit()
        res.send('success')
    } catch (error) {
        conn.rollback()
        console.log(error)
    } finally {
        conn.release()
    }
})



/// mobile

router.get(`/PatientAppointment/:HN`, async function (req, res, next){
    try {
        const [row, f] = await pool.query(`select * from appointment join treatment on treatment.treatmentId=appointment.treatmentId where appointment.HN = ? order by appointId desc`, req.params.HN)
        res.json(row)
    } catch (error) {
        
    }
})

router.get('/PatientFeedback/:HN', async function (req, res, next) {
    let HN = req.params.HN
    try {
        const [row, _] = await pool.query('select * from feedback join appointment on feedback.appointId=appointment.appointId where HN = ? order by appointment.appoint_no desc', HN)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

router.get(`/PatientInfo/:HN`, async function (req, res, next){
    try {
        const [row, _] = await pool.query(`select * from patient where HN = ?`, req.params.HN)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

router.get(`/currentAppoint/:HN`, async function (req, res, next){
    let data = new Array()
    try {
        const [row, f] = await pool.query(`select max(appointId) as appointId from appointment where HN = ?`, req.params.HN)
        if (row[0].appointId != null){
            const [row1, f1] = await pool.query(`select * from appointment where appointId = ?`, row[0].appointId)
            data.push(row1[0])
        }
        res.json(data)
    } catch (error) {
        console.log(error)
    }
})

router.post(`/newPatientSideEffect/:appointId`, async function (req, res, next){
    const patientSideEffect = req.body.patientSideEffect
    const appointId = req.params.appointId
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        await conn.query(`update feedback set patientSideEffect = ? ,sendAt = (select(CURRENT_TIMESTAMP)) where appointid = ?`, [patientSideEffect, appointId])
        conn.commit()
    } catch (error) {
        conn.rollback()
        console.log(error)
    }finally{
        conn.release()
    }
})

router.get(`/patientGuideBook/:HN`, async function (req, res, next){
    try {
        const [row, f] = await pool.query(`select max(treatmentId) as treatmentId from treatment where HN = ?`, req.params.HN)
        const [row1, f1] = await pool.query(`select * from guideBook join formula on formula.formulaId=guidebook.formulaId join treatment on treatment.formulaId=formula.formulaId where treatmentId = ?`, row[0].treatmentId)
        res.json(row1)
    } catch (error) {
        console.log(error)
    }
})

router.get(`/PatientAppointInfo/:appointId`, async function (req, res, next){
    try {
        const [row, f] = await pool.query(`select * from appointment join patient on patient.HN=appointment.HN where appointId = ?`, req.params.appointId)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

function padWithLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
}

router.post(`/PatientPostpone/:appointId`, async function (req, res, next){
    const newAppointDate = req.body.newAppointDate
    const reason = req.body.reason
    const email = req.body.email
    const appointId = req.params.appointId
    const requestPhone = req.body.requestPhone
    let date = newAppointDate.split(" ")
    let split = date[0].split("-")
    let year = split[0]
    let month = split[1]
    let day = split[2]
    let appointDate = year + '-' + padWithLeadingZeros(month, 2) + '-' + padWithLeadingZeros(day, 2) + " " + date[1]
    console.log(appointDate, reason, email, appointId)
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        await conn.query(`insert into request (newAppointDate, reason, requestPhone, requestStatus, appointId, requestStamp, email) values (?, ?, ?, 'รอดำเนินการเลื่อนนัดหมาย', ? , CURRENT_TIMESTAMP, ?)`, [appointDate, reason, requestPhone, appointId, email])
        conn.commit()
        res.send('insert success')
    } catch (error) {
        conn.rollback()
        console.log(error)
    }finally{
        conn.release()
    }
})


exports.router = router;