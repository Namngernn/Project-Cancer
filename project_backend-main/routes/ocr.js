//const express = require('express');
//const pool = require('../config');
//const app = express()
//const cors = require('cors');
/*const sharp = require('sharp');
const Tesseract = require('tesseract.js');


//app.use(cors());

async function imgpro() {
    try {
        await sharp('../uploads/366728334_831240735124746_6226562480074597281_n.png').grayscale().png().toFile('../uploads/img.png');
        await sharp('../uploads/img.png').threshold().png().toFile('../uploads/img1.png');
        await sharp('../uploads/img1.png').sharpen({ sigma: 2 }).png().toFile('../uploads/img2.png');
    } catch (error) {
        console.log(error)
    }
}

/*router.get('/imgocr', async function (req, res, next) {
    //const imgPath = req.body.imgPath
    imgpro()
    Tesseract.recognize('../uploads/img.png', 'tha+eng',
        { logger: m => console.log(m) }).then(function (result) {
            console.log(result)
            let confidence = result.data.confidence
            let text = result.data.text
            console.log(confidence, text)
            res.json({confidence: result.data.confidence, text: result.data.text})
        })

})*/

/*function ocr() {
    /*Tesseract.recognize('../uploads/366728334_831240735124746_6226562480074597281_n.png', 'tha+eng',
        { logger: m => console.log(m) }).then(function (result) {
            console.log(result)
            let confidence = result.data.confidence
            let text = result.data.text
            console.log(confidence, text)
            //res.json({ confidence: result.data.confidence, text: result.data.text })
        })
    Tesseract.recognize('../uploads/img.png', 'tha+eng',
        { logger: m => console.log(m) }).then(function (result) {
            console.log(result)
            let confidence = result.data.confidence
            let text = result.data.text
            console.log(confidence, text)
            //res.json({ confidence: result.data.confidence, text: result.data.text })
        })*/
    /*Tesseract.recognize('../uploads/img1.png', 'tha+eng',
        { logger: m => console.log(m) }).then(function (result) {
            console.log(result)
            let confidence = result.data.confidence
            let text = result.data.text
            console.log(confidence, text)
            //res.json({ confidence: result.data.confidence, text: result.data.text })
        })
    Tesseract.recognize('../uploads/img2.png', 'tha+eng',
        { logger: m => console.log(m) }).then(function (result) {
            console.log(result)
            let confidence = result.data.confidence
            let text = result.data.text
            console.log(confidence, text)
            //res.json({ confidence: result.data.confidence, text: result.data.text })
        })
}

imgpro()
ocr()

//router = express.Router();



//exports.router = router;*/