import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const PatientManual = () => {
  const [manualData, setManualData] = useState(null);
  const [formulaName, setFormulaName] = useState('');
  const [formulaNameTHDisplay, setFormulaNameTHDisplay] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [error, setError] = useState('');
  const [HN, setHN] = useState('');
  const mealPlan = [
    {
      day: 1,
      breakfast: ['ข้าวต้มปลา', 'โอวัลติน / นมขนมปัง'],
      lunch: ['ข้าวผัดทะเล', 'กล้วยบวดชี'],
      dinner: ['ข้าวสวย', 'แกงเขียวหวานไก่', 'ผัดวุ้นเส้น', 'ผลไม้ตามฤดูกาล'],
    },
    {
      day: 2,
      breakfast: ['ข้าวต้ม', 'หมูหยอง', 'ผัดกะหล่ำปลีไก่บด'],
      lunch: ['ข้าวสวย', 'ผัดกะเพราไก่', 'ต้มจืดหัวไชเท้าซี่โครงหมู', 'มันต้มน้ำตาล'],
      dinner: ['ข้าวสวย', 'ต้มโคล้งปลาเห็ดฟาง', 'ผัดผักรวม', 'ผลไม้ตามฤดูกาล'],
    },
    {
      day: 3,
      breakfast: ['ข้าวต้มตับหมูเลือดหมู', 'น้ำเต้าหู้/ นม'],
      lunch: ['บะหมี่เกี๊ยวหมูแดง', 'แกงบวด ฟักทอง'],
      dinner: ['ข้าวสวย', 'ต้มข่าไก่เห็ดนางฟ้า', 'ปลาทอดผัดพริกหวาน', 'ผลไม้ตามฤดูกาล'],
    },
    {
      day: 4,
      breakfast: ['ข้าวต้ม', 'ผัดผักบุ้ง', 'ไข่ตุ๋น', 'โอวัลติน/ นม'],
      lunch: ['ข้าวสวย', 'แกงจืดเต้าหู้ไข่หมูสับ', 'กุ้งผัดพริกแกง', 'ถั่วเขียวต้มน้ำตาล'],
      dinner: ['ข้าวสวย', 'แกงส้มผักรวม', 'หมูรวนเค็ม', 'ผลไม้ตามฤดูกาล'],
    },
    {
      day: 5,
      breakfast: ['ข้าวต้มกุ้ง', 'น้ำเต้าหู้/ นม', 'ขนมปังสังขยา'],
      lunch: ['ก๋วยเตี๋ยวหมูลูกชิ้น', 'ลอดช่องน้ำกะทิ'],
      dinner: ['ข้าวสวย', 'แกงจืดมะระยัดไส้', 'ปลานิลนึ่งมะนาว', 'ผลไม้ตามฤดูกาล'],
    },
    {
      day: 6,
      breakfast: ['ก๋วยจั๊บ หมูสับ เลือดหมู ตับหมู', 'ผลไม้ตามฤดูกาล'],
      lunch: ['สุกี้หมู', 'แกงบวดมัน'],
      dinner: ['ข้าวสวย', 'ต้มจืดเต้าหู้ไข่ผักกาดขาว', 'ผัดพริกอ่อนตับหมู'],
    },
    {
      day: 7,
      breakfast: ['ข้าวต้มขาว', 'ผัดกะหล่ำปลีหมูชิ้น'],
      lunch: ['ก๋วยเตี๋ยวไก่ตุ๋น', 'ขนมบัวลอย'],
      dinner: ['ข้าวสวย', 'แกงส้มผักรวม', 'หมูทอด', 'ผลไม้ตามฤดูกาล'],
    }
  ];
  const formulaNameTH = [
    {
      formulaName: 'AC',
      formulaNameTH: 'เอ-ซี',
      medicine: [
        { name: 'Adriamycin (อะเดรียมัยซิน)', dosage: '...', unit: 'มก.' },
        { name: 'Cyclophosphamide (ไซโคลฟอสฟามายด์)', dosage: '...', unit: 'มก.' }
      ]
    },
    {
      formulaName: 'FAC',
      formulaNameTH: 'เอฟ-เอ-ซี',
      medicine: [
        { name: 'Fluorouracil (ฟลูออโรยูราซิล)', dosage: '...', unit: 'มก.' },
        { name: 'Adriamycin (อะเดรียมัยซิน)', dosage: '...', unit: 'มก.' },
        { name: 'Cyclophosphamide (ไซโคลฟอสฟามายด์)', dosage: '...', unit: 'มก.' }
      ]
    },
    {
      formulaName: 'Cis CCRT',
      formulaNameTH: 'ซิสพลาตินร่วมกับการฉายรังสีบริเวณอุ้งเชิงกราน',
      medicine: [
        { name: 'Cisplatin (ซิสพลาติน)', dosage: '...', unit: 'มก.' }
      ]
    },
    {
      formulaName: 'Carbo CCRT',
      formulaNameTH: 'คาร์โบพลาตินร่วมกับการฉายรังสีบริเวณอุ้งเชิงกราน',
      medicine: [
        { name: 'Carboplatin (คาร์โบพลาติน)', dosage: '...', unit: 'มก.' }
      ]
    },
    {
      formulaName: '5-FU/ Leucovorin',
      formulaNameTH: 'ไฟท์เอฟยู/ ลิวโคโวริน',
      medicine: [
        { name: 'Fluorouracil (ฟลูออโรยูราซิล)', dosage: '...', unit: 'มก.' },
        { name: 'Leucovorin (ลิวโคโวลิน)', dosage: '...', unit: 'มก.' }
      ]
    },
    {
      formulaName: 'Pac/Carbo',
      formulaNameTH: 'แพค/คาร์โบ',
      medicine: [
        { name: 'Paclitaxel (แพคลิแทกเซล)', dosage: '...', unit: 'มก.' },
        { name: 'Carboplatin (คาร์โบพลาติน)', dosage: '...', unit: 'มก.' }
      ]
    }
  ];

  useEffect(() => { 
    setHN(Cookies.get('HN'));
    const fetchPatientManual = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/PatientManual/${HN}`);
        setManualData(response.data);
        console.log('Manual Data:', response.data);
      } catch (err) {
        setError('Error fetching patient manual');
        console.error(err);
      }

    };

    const fetchFormulaName = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getFormulaName/${HN}`);
        const data = response.data;
    
        // แมชเอาข้อมูลสูตรยาที่ตรงกัน
        const matchedFormula = formulaNameTH.find(item => item.formulaName === data.formulaName);
        
        if (matchedFormula) {
          setFormulaName(matchedFormula.formulaName); // เก็บชื่อสูตรยาที่ตรงกัน
          setFormulaNameTHDisplay(matchedFormula.formulaNameTH); // เก็บชื่อสูตรยาภาษาไทย
          setMedicineName(matchedFormula.medicine); // เก็บชื่อยาทั้งหมดในสูตรนั้น
        } else {
          setFormulaNameTHDisplay('ไม่พบสูตรยาที่ตรงกัน');
          setMedicineName([]);
        }
      } catch (err) {
        setError('Error fetching formula name');
        console.error(err);
      }
    };

    if (HN) {
      fetchPatientManual();
      fetchFormulaName();
    }
  }, [HN]);
  
  return (
  <div className="flex flex-col p-10 space-y-4">
    {/* Header */}
    <div className="mb-6 text-center">
      <h1 className="text-5xl font-bold text-center">{formulaName}</h1>
      <h2 className="mt-2 text-xl font-semibold">การปฏิบัติตัวสำหรับผู้ป่วยที่ได้รับ</h2>
      <h2 className="text-xl font-semibold">ยาเคมีบำบัดสูตร: {formulaNameTHDisplay}</h2>
    </div>
    
    {/* Section เหมือนกัน */}
    <div className="mb-4">
      <h1 className="text-lg font-bold text-center border-2 border-blue700 bg-blue50 inline-block px-4 py-2">
        เคมีบำบัดคืออะไร
      </h1>
      <p className="mt-4 text-base text-gray-900">
        เคมีบำบัด คือ การรักษาด้วยการใช้ยาเคมีเพื่อควบคุมหรือทำลายเซลล์มะเร็งไม่ให้การกระจายหรืออุดกล้ามากขึ้น
        การบริหารยาเคมีบำบัดสามารถทำได้หลายวิธี เช่นในรูปแบบของยาเม็ด ยาฉีดปรับประเภท เป็นต้น
      </p>
    </div>
    
    {/* Section ชื่อยา-ไม่เหมือนกัน*/}
    <div className="mb-6">
      <h2 className="text-lg font-bold text-center border-2 border-blue700 bg-blue50 inline-block px-4 py-2">
        ยาเคมีบำบัดที่ท่านได้รับครั้งนี้ประกอบด้วย 
      </h2>
      <div className='mt-4'>
      {medicineName.length > 0 ? (
        medicineName.map((medicine, index) => (
          <span key={index} className="block text-base text-gray-900">
            {index + 1}. {medicine.name} {medicine.dosage} {medicine.unit}
          </span>
        ))
      ) : (
        <span className="text-base text-gray-900">ไม่พบข้อมูลยา</span>
      )}
      </div>
    </div>

    {/* Section ตารางรับยา-รอถามจารว่าต้องแมพข้อมูลมาใส่มั้ย??????? */}
    <div className="mb-6">
      <p className="text-lg font-bold text-center text-gray-900">
        จำนวน ...... รอบ
      </p>
      <table className="min-w-full border mt-2 text-base text-gray-800">
        <thead>
          <tr>
            <th className="border px-4 py-2">รอบที่</th>
            <th className="border px-4 py-2">วันที่รับยาเคมีบำบัด</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(6)].map((_, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Section Side effects ไม่เหมือนกัน */}
    <div className="mb-6">
      <h2 className="text-lg font-bold text-center border-2 border-blue700 bg-blue50 inline-block px-4 py-2">
        อาการข้างเคียงที่อาจเกิดขึ้นจากการได้รับยา
      </h2>
      <ul className="mt-4 text-base text-gray-900 list-disc list-inside">
        <li>กดการทำงานของไขกระดูก/ภูมิคุ้มกันท่านต่ำ</li>
        <li>เนื้อปากอักเสบ เกิดแผลร้อนในในปาก</li>
        <li>ผมร่วง/ บางลง</li>
        <li>อ่อนเพลีย คลื่นไส้อาเจียน</li>
        <li>ผิวหนังเส้นเล็บดำ</li>
        <li>ไอจาม/ พอมน้อยง่าย</li>
        <li>กระเพาะปัสสาวะอักเสบ</li>
      </ul>
    </div>

    {/* Section */}
    <div className="mb-6">
      <h2 className="text-lg font-bold text-center border-2 border-blue700 bg-blue50 inline-block px-4 py-2">
          การดูแลตนเองทั่วไปในช่วงที่ได้รับยาเคมีบำบัด
      </h2>
      <ul className="mt-4 text-base text-gray-900 list-disc list-inside">
        <li>นอนหลับพักผ่อนให้เพียงพออย่างน้อย 6-8 ชั่วโมงต่อวัน</li>
        <li>รับประทานอาหารให้ครบ 5 หมู่</li>
        <li>ควรดื่มน้ำ 2-3 ลิตร หรือ 8-12 แก้วต่อวัน เพื่อช่วยขับยาเคมีที่อาจตกค้างในร่างกายออกทางปัสสาวะ ปัสสาวะของผู้ป่วยอาจเปลี่ยนเป็นสีส้มแดงภายใน 1-3 วันหลังได้รับยาเคมีบำบัด (ซึ่งไม่ใช่อาการผิดปกติ)</li>
        <li className="font-bold">งด!!! รับประทานของหมักดอง อาหารสุกๆ ดิบๆ ยำต้ม ยำหม้อ ยำจีน และสมุนไพรทุกชนิด</li>
        <li className="font-bold underline">ผู้ป่วยทุกรายทั้งชายและหญิงควรคุมกำเนิดและป้องกัน ไม่ให้มีการตั้งครรภ์ในระหว่างรับการรักษาด้วยยำเคมีบำบัด เพราะยาเคมีบำบัดอาจส่งผลทำให้ทารกมีความผิดปกติหรือพิการได้ หากสงสัยตั้งครรภ์ให้แจ้งแพทย์ทันที</li>
      </ul>
    </div>

    {/* Section */}
    <div className="mb-6">
      <h2 className="text-lg font-bold text-center border-2 border-blue700 bg-blue50 inline-block px-4 py-2">
        การปฏิบัติตัวเมื่อเกิดอาการข้างเคียงต่างๆ
      </h2>
      <p className="mt-4 text-lg font-bold text-gray-900 underline">
        1. ภูมิต้านทานต่ำ
      </p>
      <p className='mt-4 text-lg font-bold text-gray-900'>
        จากการที่เม็ดเลือดขาวลดลง ทำให้เกิดการติดเชื้อได้ง่าย ภูมิต้านทานจะต่ำที่สุดหลังจากได้รับยาเคมีบำบัดไปแล้ว 10-14 วัน
      </p>
      <ul className="mt-4 text-base text-gray-900 list-disc list-inside">
        <li>ดูแลรักษาความสะอาดของร่างกาย ปากและฟัน</li>
        <li>ล้างมือบ่อยๆ โดยเฉพาะก่อนรับประทานอาหารและหลังจากเข้าห้องน้ำทุกครั้ง</li>
        <li>หลีกเลี่ยงการพบปะบุคคลที่เป็นไข้หวัด หัด อีสุกอีใส วัณโรค รวมทั้งโรคติดเชื้ออื่นๆ</li>
        <li>หลีกเลี่ยงการไปในชุมชนที่แออัด หากจำเป็นต้องไป ให้ใส่หน้ากากอนามัยทุกครั้ง</li>
        <li>รับประทานอาหารที่มีโปรตีนสูง ได้แก่ นม เนื้อสัตว์ ไข่ ที่ปรุงสุกและสะอาด</li>
      </ul>
      <p className="mt-2 font-bold text-base text-gray-900 underline">*** สังเกตการติดเชื้อ เช่น มีไข้สูง เจ็บคอ ปัสสาวะแสบขัด ให้ผู้ป่วยมาพบแพทย์ก่อนนัด หรือไปตรวจที่โรงพยาบาลใกล้บ้าน</p>
      
      <p className="mt-4 text-lg font-bold text-gray-900 underline">
        2. โลหิตจาง
      </p>
      <p className='mt-4 text-lg font-bold text-gray-900'>
        ทำให้รู้สึกเหนื่อยและอ่อนเพลียได้ง่าย
      </p>
      <ul className="mt-4 text-base text-gray-900 list-disc list-inside">
        <li>รับประทานนม เนื้อสัตว์ เครื่องในสัตว์และไข่ รวมถึงอาหารที่มีธาตุเหล็กสูงต่างๆ</li>
        <li>ดื่มน้ำผลไม้หรือรับประทานผลไม้ที่มีวิตามินซีสูง เช่น ส้ม ฝรั่ง เพราะวิตามินซีจะช่วยทำให้ร่างกายดูดซึมธาตุเหล็กได้ดี</li>
      </ul>

      <p className="mt-4 text-lg font-bold text-gray-900 underline">
        3. เกล็ดเลือดต่ำ
      </p>
      <p className='mt-4 text-lg font-bold text-gray-900'>
        ทำให้เลือดออกง่ายแต่หยุดยาก
      </p>
      <ul className="mt-4 text-base text-gray-900 list-disc list-inside">
        <li>เฝ้าระวังการเกิดอุบัติเหตุ ถ้ามีบาดแผลให้กดบาดแผลเป็นเวลานานอย่างน้อย 5 นาที</li>
        <li>เฝ้าระวังเลือดออกตามไรฟัน ใช้แปลงสีฟันขนอ่อนนุ่ม</li>
        <li>ระวังไม่ให้มีอาการท้องผูก</li>
      </ul>
      <p className="mt-2 font-bold text-base text-gray-900">*** หากเลือดไหลไม่หยุดให้รีบไปพบแพทย์โรงพยาบาลใกล้บ้าน</p>

      <p className="mt-4 text-lg font-bold text-gray-900 underline">
        4. คลื่นไส้/ อาเจียน
      </p>
      <p className="mt-4 text-lg font-bold text-gray-900">
        อาจเกิดขึ้นได้ตั้งแต่หลังได้รับยาเคมีบำบัดและอาจมีอาการนานได้ถึง 48 ชั่วโมงหรือนานเป็นสัปดาห์
      </p>
      <ul className="mt-4 text-base text-gray-900 list-disc list-inside">
        <li>รับประทานอาหารครั้งละน้อยๆ แต่บ่อยครั้ง</li>
        <li>หลีกเลี่ยงอาหารหวานจัด มันจัด กลิ่นฉุน</li>
        <li>ควรดื่มน้ำอุ่ม น้ำขิง น้ำมะนาว น้ำผลไม้ หรือรับประทานผลไม้รสเปรี้ยว</li>
        <li>บ้วนปากด้วยน้ำอุ่นหรือน้ำเกลือเจือจางหลังอาเจียน หรือหลังรับประทานอาหารทุกครั้ง</li>
        <li>ใช้เทคนิคผ่อนคลาย เพื่อลดความวิตกกังวลต่างๆ</li>
        <li>รับประทานยาแก้อาเจียนที่แพทย์จ่ายให้ในช่วง 3-7 วันแรก หลังจากที่ได้รับยาเคมีบำบัด</li>
      </ul>

      <p className="mt-4 text-lg font-bold text-gray-900 underline">
        5. ผมร่วง/ บางลง
      </p>
      <ul className="mt-4 text-base text-gray-900 list-disc list-inside">
        <li>ควรใช้หวีซี่ห่างๆ หวีผม เวลาหวีอย่ากระตุก ให้หวีเบาๆ</li>
        <li>ไม่ควรย้อมหรือดัดผมเพราะอาจทำให้ผมร่วงมากขึ้น</li>
        <li>ให้ใช้แชมพูสระผมชนิดอ่อน</li>
      </ul>

      <p className="mt-4 text-lg font-bold text-gray-900 underline">
        6. การเปลี่ยนแปลงของสีผิว
      </p>
      <p className='mt-4 text-lg font-bold text-gray-900'>
        เช่น สีผิวคล้ำขึ้น แห้ง แสบหรือคัน
      </p>
      <ul className="mt-4 text-base text-gray-900 list-disc list-inside">
        <li>หลีกเลี่ยงการสัมผัสแสงแดดโดยตรง หากจำเป็นต้องโดนแดด ควรใส่เสื้อแขนยาว ทาครีมกันแดดหรือกางร่ม</li>
      </ul>

      <p className="mt-4 text-lg font-bold text-gray-900 underline">
        7. เยื่อบุปากอักเสบ เกิดแผลร้อนในในปาก
      </p>
      <ul className="mt-4 text-base text-gray-900 list-disc list-inside">
        <li>รักษาความสะอาดในช่องปากอยู่เสมอ</li>
        <li>ควรใช้แปลงสีฟันที่มีขนแปรงอ่อนนุ่ม แปลงเบาๆ</li>
        <li>รับประทานอาหารอ่อน เคี้ยวง่าย รสไม่จัด</li>
        <li>งดเหล้า บุหรี่ หมาก เมี่ยง</li>
        <li>ดื่มน้ำมากๆ อย่างน้อยวันละ 8-12 แก้วต่อวัน</li>
        <li>บ้วนปากด้วยน้ำเกลือบ่อยๆ และหลังรับประทานอาหารทุกครั้ง (น้ำ 1 ลิตร ผสมเกลือ 3 ช้อนชา)</li>
      </ul>
    </div>     

    {/* Section */}
    <div className="mb-6">
      <h2 className="text-lg font-bold text-center border-2 border-red300 bg-red300 inline-block px-4 py-2">
          อาการผิดปกติที่ต้องรีบมาพบแพทย์
      </h2>
      <ul className="mt-4 text-base text-gray-900 list-disc list-inside">
        <li>ปัสสาวะแสบขัด/ น้อยลง/ ไม่ออก/ มีเลือดปน</li>
        <li>บวมตามเท้า/ ขาช่วงล่าง</li>
        <li>รู้สึกปวด บวม แดง หรือสงสัยมียารั่วซึมออกนอกหลอดลเือดบริเวณที่ฉีดยา</li>
        <li>ใจสั่น/ หอบเหนื่อย</li>
        <li>อาเจียน/ ท้องเสียอย่างรุนแรง</li>
        <li>มีไข้</li>
      </ul>
        <p className="mt-2 font-bold text-base text-gray-900">*** หากบ้านไกลสามารถไปพบแพทย์ใกฃ้บ้านได้และให้โทรมาแจ้งที่โรงพยาบาลมะเร็งชลบุรีในแผนกที่ท่านรักษาตัวอยู่ ถึงอาการผิดปกติที่เกิดขึ้น</p>
    </div>

    {/* Section กรอบให้กำลังใจ5555 เหมือนกัน */}
    <div className="border border-black rounded-md p-4 bg-gray-50 text-sm text-center">
      <p>“อาการข้างเคียงทั้งหมดที่กล่าวมานั้น เกิดขึ้นในผู้ป่วยบางรายและเกิดมากน้อยแตกต่างกันไป ผู้ป่วยอาจไม่มี อาการข้างเคียงดังกล่าวเลยก็ได้ การให้ยาเคมีบำบัดไม่น่ากลัวอย่างที่คิด และสามารถป้องกันหรือบรรเทาอาการข้างเคียงต่างๆได้”</p>
    </div>

    {/* Section schedule เหมือนกัน */}
    <div className="mb-6">
      <h2 className="text-lg font-bold text-center border-2 border-blue700 bg-blue50 inline-block px-4 py-2">
        ตัวอย่างรายการอาหารสำหรับผู้ป่วยที่ได้รับยำเคมีบำบัด (อาหารธรรมดา) พลังงาน 1,800 - 2,000 กิโลแคลอรี่ต่อวัน
      </h2>
      <table className="mt-2 table-auto w-full border-collapse border border-gray-800">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">รายการที่</th>
              <th className="border border-gray-400 px-4 py-2">มื้อเช้า</th>
              <th className="border border-gray-400 px-4 py-2">มื้อกลางวัน</th>
              <th className="border border-gray-400 px-4 py-2">มื้อเย็น</th>
            </tr>
          </thead>
          <tbody>
            {mealPlan.map((meal) => (
              <tr key={meal.day}>
                <td className="border border-gray-400 px-4 py-2 text-center">{meal.day}</td>
                <td className="border border-gray-400 px-4 py-2">
                  <ul className="list-disc list-inside">
                    {meal.breakfast.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <ul className="list-disc list-inside">
                    {meal.lunch.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <ul className="list-disc list-inside">
                    {meal.dinner.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 font-bold text-base text-gray-900">*** ผู้ป่วยสามารถปรับเเปลี่ยนรายการอาหารได้ตามความต้องการและสามารถเสริมนม/ น้ำเต้าหู้/ น้ำผลไม้ต่างๆ ได้ระหว่างมื้ออาหาร</p>
    </div>
    
    {/* Section Hospital Info เหมือนกัน */}
    <div className="border border-black rounded-md p-4 bg-gray-50 text-sm text-center">
      <p>โรงพยาบาลมะเร็งชลบุรี โทร: 038-455632-6</p>
      <p>ต่อ 191, 173 (เคมีบำบัด)</p>
      <p>ต่อ 169, 174 (รังสีรักษา)</p>
      <p>ต่อ 109, 102 (เภสัชกรรม)</p>
      <p>ต่อ 180 (โภชนาการ)</p>
      <p>ในวันและเวลาราชการ: 8:00 - 16:00 น.</p>
      <a href="http://www.ccc.in.th" className="text-blue-500">www.ccc.in.th</a>
    </div>

    {/* Section version เหมือนกัน*/}
    <div className="mt-6 text-xs text-center">
      <p>Version 1/2561</p>
    </div>

    {/* Section โหลดรูป */}        
    {manualData ? (
      <div className="p-10 text-center">
        {manualData.pdf ? (
          <a
            href={`http://localhost:3000/${manualData.pdf}`}
            className="items-center text-white bt-blue"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            ดาวน์โหลดคู่มือผู้ป่วย
          </a>
        ) : (
          <p>ไม่พบข้อมูล PDF สำหรับคู่มือผู้ป่วย</p>
        )}
      </div>
    ) : (
    <p>กำลังโหลดข้อมูล...</p>
    )}



  </div>    
  )
}

export default PatientManual