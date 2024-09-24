import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const PatientManual = ({ manualTitle, downloadLink}) => {
  const [manualData, setManualData] = useState([]);
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

    console.log(HN);
    if (HN) {
      fetchPatientManual();
    }
  }, [HN]);
  
  return (
    <div>
      <div className="flex flex-col items-center justify-center md:justify-center md:items-center">
      <div className='p-10 text-center sarabun-extralight '>
          <h1 >ชื่อสูตรยา</h1>
          <h3>Patient Manual for HN: {HN}</h3>
      </div>

    <div className="flex flex-col items-center justify-center p-10 space-y-4">
    {error && <p>{error}</p>}
      {manualData ? (
        <div>
          <h2 className="text-lg font-semibold">{manualTitle}</h2>
          <img src={"http://localhost:3000/" + manualData.QRcode} className="w-40 h-40" />
        </div>
      ) : (
        <p>Loading patient manual...</p>
      )}
    </div>

    {/* Download Button */}
    <div className="mt-4">
        <a
          href={downloadLink}
          className="px-6 py-2 text-white bg-blue-500 rounded-full"
          download
        >
          ดาวน์โหลดข้อมูล
        </a>
      </div>

    {/* <div className='p-20 pt-1 text-center flex flex-col space-y-10 sm:p-1'>
      <Link to={'/Contacts'}><h2>ติดต่อโรงพยาบาล</h2></Link>
    </div> */}
      </div>
    </div>
  )
}

export default PatientManual