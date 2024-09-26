import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const PatientManual = () => {
  const [manualData, setManualData] = useState(null);
  const [formulaName, setFormulaName] = useState('');
  const [error, setError] = useState('');
  const [HN, setHN] = useState('');

  useEffect(() => { 
    setHN(Cookies.get('HN'));
    // ฟังก์ชันดึงข้อมูลคู่มือผู้ป่วยจาก Backend
    const fetchPatientManual = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/PatientManual/${HN}`);
        setManualData(response.data[0]);
        console.log(response.data)  // เก็บข้อมูลคู่มือที่ได้จาก API
      } catch (err) {
        setError('Error fetching patient manual');
        console.error(err);
      }
    };
     // ฟังก์ชันสำหรับดึงข้อมูล
     const fetchFormulaName = async () => {
      const response = await fetch(`http://localhost:3000/getFormulaName/${HN}`);
      const data = await response.json();
      setFormulaName(data.formulaName); // ปรับให้เข้ากับรูปแบบข้อมูลที่ได้รับ
    };
    console.log(HN);
    if (HN) {
      fetchPatientManual();
      fetchFormulaName();
    }
  }, [HN]);
  
  return (
    <div className="flex flex-col items-center justify-center p-10 space-y-4">
      <div>
      {error && <p>{error}</p>}
        {manualData ? (
          <div>
            <h2 className='p-10 text-center sarabun-semibold'>{formulaName}</h2>
            <img src={"http://localhost:3000/" + manualData.QRcode} className="w-40 h-40" />
          </div>
        ) : (
          <p>Loading patient manual...</p>
        )}
      </div>

      {/* ปุ่มดาวน์โหลด */}
      {manualData && (
        <div className="p-10">
          <a
            href={"http://localhost:3000/" + manualData.pdf}
            className="items-center text-white bt-blue"
            download
          >
            ดาวน์โหลดคู่มือผู้ป่วย
          </a>
        </div>
      )}

      <div className='p-20 text-center flex flex-col space-y-10 sm:p-1'>
        <Link to={'/Contacts'}><h2>ติดต่อโรงพยาบาล</h2></Link>
      </div>

    </div>
  )
}

export default PatientManual