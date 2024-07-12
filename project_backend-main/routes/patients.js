const express = require('express');
const pool = require('../config');
const app = express()
const cors = require('cors');
const moment = require('moment')
const path = require('path')

const fileUpload = require('express-fileupload');
const uploadOpts = {
    useTempFiles: true,
    tempFileDir: '/tmp/'
};

const XLSX = require('xlsx');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/xlsx' });

const stroage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + path.extname(file.originalname))
    }
})
const imgUpload = multer({ storage: stroage })


app.use(cors());

router = express.Router();

router.get('/patients', async function (req, res, next) {
    try {
        const [rows, _] = await pool.query('SELECT * FROM patient join history on patient.HN=history.HN')
        res.json(rows)
    } catch (error) {
        console.log(error)
    }
})

router.get('/patients/:HN', async function (req, res, next) {
    const HN = req.params.HN;
    try {
        const [rows, _] = await pool.query('SELECT * FROM PATIENT join history on patient.HN=history.HN join allergy on patient.HN=allergy.HN WHERE patient.HN=?', HN)
        res.json(rows)
    } catch (error) {
        console.log(error)
    }
})

router.get('/patients/doctor/:doctorId', async function (req, res, next) {
    const doctorId = req.params.doctorId;
    try {
        const [rows, _] = await pool.query('SELECT firstName as doctorFirstName, lastName as doctorLastName FROM doctor join user on user.userId=doctor.doctorId WHERE doctorId=?', doctorId)
        res.json(rows)
    } catch (error) {
        console.log(error)
    }
})

router.post(`/sortInfo`, async function (req, res, next) {
    const sortInfo = req.body.sortInfo;
    let data = new Array();
    let cancer = new Array()
    const [rows, fs] = await pool.query(`select max(brId) as brId, patient.HN from bloodresult join treatment on treatment.treatmentId=bloodresult.treatmentId join patient on treatment.HN=patient.HN group by treatment.treatmentId`)
    try {
        if (sortInfo == '1') {

            for (let i = 0; i < rows.length; i++) {
                const [row, _] = await pool.query(`select * from treatment join patient on patient.HN=treatment.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ? order by firstName asc`, [rows[i].brId])
                const [row1, f1] = await pool.query(`select * from patient join cancer_patient on patient.HN=cancer_patient.HN join cancer on cancer.cancerId=cancer_patient.cancerId join treatment on treatment.HN=patient.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ?`, rows[i].brId)
                for (j = 0; j < row1.length; j++) {
                    cancer.push(row1[j])
                }
                row[0].cancer = cancer
                data.push(row[0])
            }
        } else if (sortInfo == '2') {
            for (let i = 0; i < rows.length; i++) {
                const [row, _] = await pool.query(`select * from treatment join patient on patient.HN=treatment.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ? order by firstName desc`, [rows[i].brId])
                const [row1, f1] = await pool.query(`select * from patient join cancer_patient on patient.HN=cancer_patient.HN join cancer on cancer.cancerId=cancer_patient.cancerId join treatment on treatment.HN=patient.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ?`, rows[i].brId)
                for (j = 0; j < row1.length; j++) {
                    cancer.push(row1[j])
                }
                row[0].cancer = cancer
                data.push(row[0])
            }
        } else if (sortInfo == '3') {
            for (let i = 0; i < rows.length; i++) {
                const [row, _] = await pool.query(`select * from treatment join patient on patient.HN=treatment.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ? order by patient.HN asc`, [rows[i].brId])
                const [row1, f1] = await pool.query(`select * from patient join cancer_patient on patient.HN=cancer_patient.HN join cancer on cancer.cancerId=cancer_patient.cancerId join treatment on treatment.HN=patient.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ?`, rows[i].brId)
                for (j = 0; j < row1.length; j++) {
                    cancer.push(row1[j])
                }
                row[0].cancer = cancer
                data.push(row[0])
            }
        } else if (sortInfo == '4') {
            for (let i = 0; i < rows.length; i++) {
                const [row, _] = await pool.query(`select * from treatment join patient on patient.HN=treatment.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ? order by patient.HN desc`, [rows[i].brId])
                const [row1, f1] = await pool.query(`select * from patient join cancer_patient on patient.HN=cancer_patient.HN join cancer on cancer.cancerId=cancer_patient.cancerId join treatment on treatment.HN=patient.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ?`, rows[i].brId)
                for (j = 0; j < row1.length; j++) {
                    cancer.push(row1[j])
                }
                row[0].cancer = cancer
                data.push(row[0])
            }
        }
        res.json(data)
    } catch (error) {
        console.log(error)
    }
})

router.put('/updatePatient/:HN', async function (req, res, next) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;
    const gender = req.body.gender;
    const birthDate = req.body.birthDate;
    const cancerType = req.body.cancerType;
    const cancerState = req.body.cancerState;
    const doctor = req.body.doctor.split(" ");
    const doctor_firstName = doctor[0];
    const doctor_lastName = doctor[1];
    const formula = req.body.formula
    const [row, f] = await pool.query('select formulaId from formula where formulaName = ?', formula)
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        const [rows1, f1] = await conn.query('select doctorId from doctor where firstName = ? and lastName = ?', [doctor_firstName, doctor_lastName]);
        await conn.query('update patient set firstName=?, lastName=?, birthDate=?, gender=?, cancerType=?, cancerState=?, phoneNumber=?, doctorId=?, formulaId = ? where HN=?', [firstName, lastName, birthDate, gender, cancerType, Number(cancerState), phoneNumber, rows1[0].doctorId, row[0].formulaId, req.params.HN]);
        res.send('แก้ไขข้อมูลเสร็จสิ้น')
        conn.commit()
    } catch (error) {
        conn.rollback()
        console.log(error)
    } finally {
        conn.release()
    }
})

router.post('/importPatients', fileUpload(uploadOpts), async function (req, res, next) {
    try {
        const excel = req.files
        console.log(excel)
        if (excel.mimetype != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            fs.unlinkSync(excel.tempFilePath)
            return res.status(400).json({ 'msg': 'File is invalid' })
        }

        //const successData = []
        //const failData = []

        const workbook = XLSX.readFile(excel)
        const sheetName = workbook.SheetNames[0]
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
        //const conn = await pool.getConnection()
        //await conn.beginTransaction()

        for (let i = 0; i < data.length; i++) {
            const { HN, firstName, lastName } = data[i]
            //const [row, _] = await conn.query(`insert into patient (HN, firstName, lastName, birthDate, gender, phoneNumber, cancerType, cancerState, status, doctorId) values (?, ?, ?)`, [HN, firstName, lastName])
            if (row.affectedRows) {
                successData.push(data[i])
            } else {
                failData.push(data[i])
            }
        }
        fs.unlinkSync(excel.tempFilePath)
        return res.json({ data: { successData, failData } })
        //conn.commit()
    } catch (error) {
        //conn.rollback()
        console.log(error)
    } /*finally {
        conn.release()
    }*/
})

router.post('/uploadPatients', upload.single('file'), async function (req, res, next) {
    const workbook = XLSX.readFile(req.file.path)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet)
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        for (let i = 0; i < data.length; i++) {
            const { HN, ชื่อ, นามสกุล, วันเดือนปีเกิด, เพศ, เบอร์โทรศัพท์, ประเภทมะเร็ง, ระยะ, หมอ } = data[i]
            let doctor_firstName = หมอ.split(" ")[0]
            let doctor_lastName = หมอ.split(" ")[1]
            const [row1, f1] = await conn.query('select doctorId from doctor where firstName = ? and lastName = ?', [doctor_firstName, doctor_lastName])
            const [row, _] = await conn.query('insert into patient (HN, firstName, lastName, birthDate, gender, phoneNumber, cancerType, cancerState, status, doctorId) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [HN, ชื่อ, นามสกุล, วันเดือนปีเกิด, เพศ, เบอร์โทรศัพท์, ประเภทมะเร็ง, ระยะ, 'รอการดำเนินการ', row1[0].doctorId])
        }
        conn.commit()
    } catch (error) {
        conn.rollback()
        console.log(error)
    } finally {
        conn.release()
    }

})

var data_exporter = require('json2csv').Parser

router.get('/exportPatients', async function (req, res, next) {
    //export csv
    try {
        /*var aspose = aspose || {};
        aspose.cells = require("aspose.cells");

        var workbook = aspose.cells.Workbook()
        var worksheet = workbook.getWorksheets().get(0)
        var layoutOptions = aspose.cells.JsonLayoutOptions()
        layoutOptions.setArrayAsTable(true)

        const [row, _] = await pool.query('select * from patient')
        aspose.cells.JsonUtility.importData(row, worksheet.getCells(), 0, 0, layoutOptions)
        workbook.save("output.csv", aspose.cells.SaveFormat.CSV)*/
        const [row, _] = await pool.query('select * from patient')
        /*const writer = csvWriter.createObjectCsvWriter({
            path: path.resolve(__dirname, 'test1.csv'),
            header: [
                { id: 'HN', title: 'HN' },
                { id: 'fisrtName', title: 'ชื่อ' },
                { id: 'lastName', title: 'นามสกุล' },
                { id: 'BirthDate', title: ' วัน เดือน ปีเกิด' },
            ],
        });
        writer.writeRecords(row).then(() => {
            console.log('Done!');
        });*/
        let mysql_data = JSON.parse(JSON.stringify(row))
        var file_header = ['HN', 'firstName', 'lastName', 'birthDate', 'gender', 'phoneNumber', 'cancerType', 'cancerState']
        var json_data = new data_exporter({ file_header })
        var csv_data = json_data.parse(mysql_data)
        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', 'attachment;filename=example.csv')
        res.status(200).end(csv_data)
    } catch (error) {
        console.log(error)
    }
})

router.post('/uploadBloodResult', imgUpload.single('image'), async function (req, res, next) {
    console.log(req.file, req.body)
    let filename = 'images/' + req.file.filename
    //req.body.HN = req.body.HN.slice(0, 1)
    //req.body.HN = req.body.HN.slice(-1, 1)
    let date = moment(Date.now()).format();
    const [row, _] = await pool.query(`select max(treatmentId) as treatmentId from treatment join patient on treatment.HN=patient.HN where IDcard = ?`, req.body.IDcard)
    const [row_1, f_1] = await pool.query(`select max(brId) as brId from bloodresult where treatmentId = ?`, row[0].treatmentId)
    const [row1, f1] = await pool.query(`select * from bloodresult where brId = ?`, row_1[0].brId)
    const [row2, f2] = await pool.query(`select doctorId from treatment where treatmentId = ?`, row[0].treatmentId)
    if (row1[0].status == 'อนุมัติรับยา') {
        res.send('cant send')
    } else if (row1[0].status != 'อนุมัติรับยา') {
        const conn = await pool.getConnection()
        await conn.beginTransaction()
        try {
            if (row1[0].status == 'ยังไม่ส่งผลเลือด' || row1[0].status == 'รออนุมัติผลเลือด') {
                await conn.query(`update bloodResult set picture = ?, date = ?, status = 'รออนุมัติผลเลือด' where treatmentId = ?`, [filename, date, row[0].treatmentId])
                conn.commit()
            } else if (row1[0].status == 'ส่งผลเลือดอีกครั้ง') {
                await conn.query(`insert into bloodresult (picture, status, doctorId, treatmentId, date) values (?, 'รออนุมัติผลเลือด', ?, ?, ?)`, [filename, row2[0].doctorId, row[0].treatmentId, date])
                conn.commit()
            }
            res.send('อัพโหลดเสร็จสิ้น')
        } catch (error) {
            conn.rollback()
            console.log(error)
        } finally {
            conn.release()
        }
    }

})



/////////////// new //////////////
function padWithLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
}


router.post(`/newPatient`, async function (req, res, next) {
    //patient
    const HN = req.body.HN
    const IDcard = req.body.IDcard
    const prefix = req.body.prefix
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const birthDate = req.body.birthDate
    const gender = req.body.gender
    const phoneNumber = req.body.phoneNumber

    //user
    const userName = IDcard

    //history
    const nationality = req.body.nationality
    const religious = req.body.religious
    const marriageStatus = req.body.marriageStatus
    const education = req.body.education
    const occupation = req.body.occupation
    const bloodGroup = req.body.bloodGroup
    const IDcardAddress = req.body.IDcardAddress
    const currentAddress = req.body.currentAddress
    const contactAddress = req.body.contactAddress
    const contactPerson = req.body.contactPerson
    const relatedAs = req.body.relatedAs
    const fatherName = req.body.fatherName
    const motherName = req.body.motherName
    const spouseName = req.body.spouseName

    //diease
    const disease = req.body.disease
    const usualMed = req.body.usualMed
    const allergy = req.body.allergy
    const allergyHis = req.body.allergyHis
    const otherTreatment = req.body.otherTreatment

    //addictive
    const smoking = req.body.smoking
    const smokingPeriod = req.body.smokingPeriod
    const cigaretteNumber = req.body.cigaretteNumber
    const cigaretteButt = req.body.cigaretteButt
    const alcohol = req.body.alcohol
    const alcoholGlass = req.body.alcoholGlass
    const alcoholPeriod = req.body.alcoholPeriod
    const typeAlcohol = req.body.typeAlcohol
    const nut = req.body.nut
    const nutPeriod = req.body.nutPeriod

    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        await conn.query(`insert into user (userName, type, firstName, lastName) values (?, 'patient', ?, ?)`, [userName, firstName, lastName])
        await conn.query(`insert into patient (HN, IDcard, prefix, firstName, lastName, birthDate, gender, phoneNumber, allergy) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [HN, IDcard, prefix, firstName, lastName, birthDate, gender, phoneNumber, allergyHis])
        await conn.query(`insert into diseases (disease, usualMed, otherTreatment, HN, IDcard) values (?, ?, ?, ?, ?)`, [disease, usualMed, otherTreatment, HN, IDcard])
        if (allergyHis == 'แพ้') {
            await conn.query(`insert into allergy (allergyDetail, HN, IDcard) values (?, ?, ?)`, [allergy, HN, IDcard])
        }else if (allergyHis == 'ไม่เคยแพ้'){
            await conn.query(`insert into allergy (allergyDetail, HN, IDcard) values (?, ?, ?)`, ['ไม่มีประวัติการแพ้', HN, IDcard])
        }
        await conn.query(`insert into addictive (smoking, alcohol, nut, HN, IDcard) values (?, ?, ?, ?, ?)`, [smoking, alcohol, nut, HN, IDcard])
        if (smoking == 'สูบ' || smoking == 'เคยสูบ') {
            await conn.query(`update addictive set smokingPeriod = ?, cigaretteNumber = ?, cigaretteButt = ? where addictiveId = last_insert_id()`, [Number(smokingPeriod), Number(cigaretteNumber), cigaretteButt])
        }
        if (alcohol == 'ดื่ม') {
            await conn.query(`update addictive set alcoholGlass = ?, alcoholPeriod = ?, typeAlcohol = ? where addictiveId = last_insert_id()`, [Number(alcoholGlass), Number(alcoholPeriod), typeAlcohol])
        }
        if (nut == 'เคย') {
            await conn.query(`update addictive set nutPeriod = ? where addictiveId = last_insert_id()`, Number(nutPeriod))
        }

        await conn.query(`insert into history (nationality, religious, marriageStatus, education, occupation, bloodGroup, IDcardAddress, currentAddress, contactAddress, contactPerson, relatedAs, fatherName, motherName, spouseName, HN, IDcard) 
        values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [nationality, religious, marriageStatus, education, occupation, bloodGroup, IDcardAddress, currentAddress, contactAddress, contactPerson, relatedAs, fatherName, motherName, spouseName, HN, IDcard])
        conn.commit()
        res.send('success')
    } catch (error) {
        conn.rollback()
        console.log(error)
    } finally {
        conn.release()
    }
})

router.put(`/updatePatientInfo`, async function (req, res, next) {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const birthDate = req.body.birthDate
    const phoneNumber = req.body.phoneNumber
    const IDcard = req.body.IDcard
    const gender = req.body.gender
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        await conn.query(`update patient set firstName = ?, lastName = ?, phoneNumber = ?, gender = ?`, [firstName, lastName, phoneNumber, gender])
        conn.commit()
    } catch (error) {
        conn.rollback()
    } finally {
        conn.release()
    }
})


router.get(`/Allpatient`, async function (req, res, next) {
    let data = new Array()
    let cancer = new Array()
    try {
        const [rows, fs] = await pool.query(`select max(brId) as brId, patient.HN from bloodresult join treatment on treatment.treatmentId=bloodresult.treatmentId join patient on treatment.HN=patient.HN group by treatment.treatmentId`)
        for (let i = 0; i < rows.length; i++) {
            const [row, _] = await pool.query(`select * from treatment join patient on patient.HN=treatment.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ?`, [rows[i].brId])
            const [row1, f1] = await pool.query(`select * from patient join cancer_patient on patient.HN=cancer_patient.HN join cancer on cancer.cancerId=cancer_patient.cancerId join treatment on treatment.HN=patient.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ?`, rows[i].brId)
            for (j = 0; j < row1.length; j++) {
                cancer.push(row1[j])
            }
            row[0].cancer = cancer
            data.push(row[0])
        }
        res.json(data)
    } catch (error) {
        console.log(error)
    }
})

router.get('/patient/:HN/:treatmentId', async function (req, res, next) {
    const HN = req.params.HN;
    const treatmentId = req.params.treatmentId
    let cancer = new Array()
    try {
        const [rows, _] = await pool.query('SELECT * FROM PATIENT join treatment on patient.HN=treatment.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId left join allergy on patient.HN=allergy.HN WHERE patient.HN=? and treatment.treatmentId= ?', [HN, treatmentId])
        const [row1, f1] = await pool.query(`select * from patient join cancer_patient on patient.HN=cancer_patient.HN join cancer on cancer.cancerId=cancer_patient.cancerId join treatment on treatment.HN=patient.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where treatment.HN = ?`, HN)
        for (j = 0; j < row1.length; j++) {
            cancer.push(row1[j])
        }
        rows[0].cancer = cancer
        res.json(rows)
    } catch (error) {
        console.log(error)
    }
})

router.get(`/detailPatient/:HN`, async function (req, res, next) {
    const HN = req.params.HN
    try {
        const [row, f] = await pool.query(`select * from patient where HN = ?`, HN)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

router.post(`/createTreatment`, async function (req, res, next) {
    const listCancer = req.body.listCancer
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const [row2, f2] = await pool.query(`select * from patient where firstName = ? and lastName = ?`, [firstName, lastName])
    const formulaName = req.body.formula
    const doctor = req.body.doctor.split(" ")
    const doctor_firstName = doctor[0]
    const doctor_lastName = doctor[1]
    const [row, _] = await pool.query(`select doctorId from doctor join user on userId=doctorId where firstName = ? and lastName = ?`, [doctor_firstName, doctor_lastName])
    const [row1, f1] = await pool.query(`select formulaId from formula where formulaName = ?`, formulaName)
    let cancer = new Array()
    for (let i = 0; i < listCancer.length; i++) {
        const [row4, f4] = await pool.query(`select cancerId from cancer where cancerType = ?`, listCancer[i].cancerType)
        cancer.push(row4[0])
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        if (row2.length == 0) {
            res.send('no')
        } else {
            for (let i = 0; i < cancer.length; i++) {
                await conn.query(`insert into cancer_patient (cancerId, IDcard, HN, cancerState) values (?, ?, ?, ?)`, [cancer[i].cancerId, row2[0].IDcard, row2[0].HN, listCancer[i].cancerState])
            }
            await conn.query(`insert into treatment (IDcard, HN, formulaId, doctorId, treatmentStatus) values (?, ?, ?, ?, 'อยู่ระหว่างการรักษา')`, [row2[0].IDcard, row2[0].HN, row1[0].formulaId, row[0].doctorId])
            await conn.query(`insert into bloodresult (status, doctorId, treatmentId) values ('ยังไม่ส่งผลเลือด', ?, last_insert_id())`, row[0].doctorId)
            await conn.query(`update patient set doctorId = ? where HN = ?`, [row[0].doctorId, row2[0].HN])
            conn.commit()
            const [row4, f4] = await conn.query(`select max(treatmentId) as treatmentId from treatment join patient on treatment.HN=patient.HN where patient.firstName = ? and lastName = ?`, [firstName, lastName])
            const [row3, f3] = await conn.query(`select * from patient join treatment on patient.HN=treatment.HN where treatment.treatmentId = ?`, row4[0].treatmentId)
            res.json(row3)
        }
    } catch (error) {
        conn.rollback()
        console.log(error)
    } finally {
        conn.release()
    }
})

router.get(`/treatment/:treatmentId`, async function (req, res, next) {
    const treatmentId = req.params.treatmentId
    try {
        const [row, f] = await pool.query(`select * from treatment join formula on formula.formulaId=treatment.formulaId where treatmentId = ? order by treatmentId desc`, treatmentId)
        res.json(row[0])
    } catch (error) {
        console.log(error)
    }
})

router.get(`/currentTreatment/:HN/:treatmentId`, async function (req, res, next) {
    const HN = req.params.HN
    const treatmentId = req.params.treatmentId
    try {
        const [row, f] = await pool.query(`select * from treatment join formula on formula.formulaId=treatment.formulaId where HN = ? and treatmentId = ?`, [HN, treatmentId])
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})

router.post(`/addDisease`, async function (req, res, next) {
    const HN = req.body.HN
    const disease = req.body.disease
    const usualMed = req.body.usualMed
    const allergyMed = req.body.allergyMed
    const otherTrearment = this.otherTrearment
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        await conn.query(`insert into diseases (disease, usualMed, allergyMed, otherTreatment, HN) values (?, ?, ?, ?, ?)`, [disease, usualMed, allergyMed, otherTrearment, HN])
        conn.commit()
        const [row, f] = await conn.query(`select * from diseases where HN = ?`, HN)
        res.json(row)
    } catch (error) {
        conn.rollback()
        console.log(error)
    } finally {
        conn.release()
    }
})

router.get(`/getDiseases/:HN`, async function (req, res, next) {
    const HN = req.params.HN
    try {
        const [row, f] = await pool.query(`select * from diseases where HN = ?`, HN)
        res.json(row)
    } catch (error) {
        console.log(error)
    }
})


router.post('/selectedPatient', async function (req, res, next) {
    const selected = req.body.selected
    let data = new Array();
    let cancer = new Array


    try {
        const [rows, fs] = await pool.query(`select max(brId) as brId, patient.HN from bloodresult join treatment on treatment.treatmentId=bloodresult.treatmentId join patient on treatment.HN=patient.HN group by treatment.treatmentId`)
        for (let i = 0; i < rows.length; i++) {
            const [row, _] = await pool.query(`select * from treatment join patient on patient.HN=treatment.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where patient.HN like ? or patient.firstName like ? or patient.lastName like ?`, [`%${selected}%`, `%${selected}%`, `%${selected}%`])
            const [row1, f1] = await pool.query(`select * from patient join cancer_patient on patient.HN=cancer_patient.HN join cancer on cancer.cancerId=cancer_patient.cancerId join treatment on treatment.HN=patient.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ?`, rows[i].brId)
            for (j = 0; j < row1.length; j++) {
                cancer.push(row1[j])
            }
            if (row.length != 0) {
                row[i].cancer = cancer
            }
            data.push(row)
        }
        /*if (selected == '') {
            for (let i = 0; i < rows.length; i++) {
                const [row, _] = await pool.query(`select * from treatment join patient on patient.HN=treatment.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ?`, [rows[i].brId])
                const [row1, f1] = await pool.query(`select * from patient join cancer_patient on patient.HN=cancer_patient.HN join cancer on cancer.cancerId=cancer_patient.cancerId join treatment on treatment.HN=patient.HN join bloodresult on treatment.treatmentId=bloodresult.treatmentId where brId = ?`, rows[i].brId)
                for (j = 0; j < row1.length; j++) {
                    cancer.push(row1[j])
                }
                row[i].cancer = cancer
                data.push(row)
            }
        }*/
        if (data.length != 0) {
            res.json(data)
        } else {
            res.send('ไม่พบรายชื่อที่ค้นหา')
        }
    } catch (error) {
        console.log(error)
    }
})

router.post(`/addQRcode`, imgUpload.single('image'), async function (req, res, next) {
    let filename = 'images/' + req.file.filename
    let formulaId = req.body.formulaId
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        await conn.query(`update guideBook set QRcode = ? where formulaId = ?`, [filename, formulaId])
        conn.commit()
        const [row, f] = await conn.query(`select * from formula left join guideBook on formula.formulaId=guideBook.formulaId`)
        res.json(row)
    } catch (error) {
        conn.rollback()
        console.log(error)
    } finally {
        conn.release()
    }
})

router.post(`/savePDF`, imgUpload.single('file'), async function (req, res, next) {
    let filename = 'images/' + req.file.filename
    let formulaId = req.body.formulaId
    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        await conn.query(`update guideBook set pdf = ? where formulaId = ?`, [filename, formulaId])
        conn.commit()
        const [row, f] = await conn.query(`select * from formula left join guideBook on formula.formulaId=guideBook.formulaId`)
        res.json(row)
    } catch (error) {
        conn.rollback()
        console.log(error)
    } finally {
        conn.release()
    }
})

router.post(`/searchGuideBook`, async function (req, res, next) {
    try {
        const [row, f] = await pool.query(`select * from formula left join guideBook on formula.formulaId=guideBook.formulaId where formulaName like ?`, [`%${req.body.search}%`])
        if (row.length != 0) {
            res.json(row)
        } else {
            res.send('ไม่พบสูตรยาที่ค้นหา')
        }
    } catch (error) {
        console.log(error)
    }
})

router.post('/sortGuideBook', async function (req, res, next) {
    let data = new Array();
    const sortFormula = req.body.sortFormula;
    try {
        if (sortFormula == '1') {
            const [rows, _] = await pool.query(`select * from formula left join guideBook on formula.formulaId=guideBook.formulaId order by formula.formulaId asc`)
            data.push(rows)
        } else if (sortFormula == '2') {
            const [rows1, _] = await pool.query(`select * from formula left join guideBook on formula.formulaId=guideBook.formulaId order by formula.formulaId desc`)
            data.push(rows1)
        } else if (sortFormula == '3') {
            const [rows2, _] = await pool.query(`select * from formula left join guideBook on formula.formulaId=guideBook.formulaId order by formulaName asc`)
            data.push(rows2)
        } else if (sortFormula == '4') {
            const [rows3, _] = await pool.query(`select * from formula left join guideBook on formula.formulaId=guideBook.formulaId order by formulaName desc`)
            data.push(rows3)
        }
        res.json(data)
    } catch (error) {
        console.log(error)
    }
})

exports.router = router;
