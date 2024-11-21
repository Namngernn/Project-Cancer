import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import { Button, Modal } from 'antd';

const DisplayBloodResults = () => {
  // ดึงเลขปชชจาก cookie
  const [username, setUsername] = useState('');
  const [patientInfo, setPatientInfo] = useState([]);
  const [formula, setFormula] = useState('');
  const [cancerTypes, setCancerTypes] = useState([]);
  const [recordBlooadResult, setRecordBlooadResult] = useState([]);

  useEffect(() => {
    const user = Cookies.get('userName');
    if (user) {
      setUsername(user);
    }
  }, []);                                 // ดึงค่าจาก Cookie เมื่อคอมโพเนนต์เริ่มต้นเท่านั้น

  useEffect(() => {
    const user = Cookies.get('userName');
    if (user && user !== username) {
      setUsername(user);
    }
  });

  useEffect(() => {
    const fetchFormula = async () => {
      try {
        console.log(`Fetching formula for user: ${username}`);
        const response = await fetch(`http://localhost:8080/patientss/${username}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Data received from API:', data);
          if (data.length > 0) {
            setPatientInfo(data[0]); // ดึงค่า formulaName จากอาร์เรย์ที่ได้รับ
          } else {
            console.error('No formula found for this user');
          }
        } else {
          console.error('Failed to fetch formula');
        }
      } catch (error) {
        console.error('Error fetching formula:', error);
      }
    };
    if (username) {
      fetchFormula();
    }
  }, [username]);

  useEffect(() => {
    const fetchFormula = async () => {
      try {
        console.log(`Fetching formula for user: ${username}`);
        const response = await fetch(`http://localhost:8080/formulas/${username}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Data received from API:', data);
          if (data.length > 0) {
            setFormula(data[0].formulaName); // ดึงค่า formulaName จากอาร์เรย์ที่ได้รับ
          } else {
            console.error('No formula found for this user');
          }
        } else {
          console.error('Failed to fetch formula');
        }
      } catch (error) {
        console.error('Error fetching formula:', error);
      }
    };
    if (username) {
      fetchFormula();
    }
  }, [username]);                                       // ดึงข้อมูลสูตรยาทุกครั้งที่ username เปลี่ยน

  useEffect(() => {
    const fetchCancerTypes = async () => {
      try {
        console.log(`Fetching cancer types for user: ${username}`);
        const response = await fetch(`http://localhost:8080/cancerType/${username}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Cancer types received from API:', data);
          setCancerTypes(data); // ตั้งค่าสถานะ cancerTypes ด้วยข้อมูลที่ได้รับ
        } else {
          console.error('Failed to fetch cancer types');
        }
      } catch (error) {
        console.error('Error fetching cancer types:', error);
      }
    };

    if (username) {
      fetchCancerTypes();
    }
  }, [username]);                                 // ดึงข้อมูลประเภทมะเร็งทุกครั้งที่ username เปลี่ยน

  useEffect(() => {
    const fetchCancerTypes = async () => {
      try {
        console.log(`Fetching cancer types for user: ${username}`);
        const response = await fetch(`http://localhost:8080/recordbloodresult/${username}`);
        if (response.ok) {
          const data = await response.json();
          console.log('RecordBlooadResult received from API:', data);
          setRecordBlooadResult(data); 
        } else {
          console.error('Failed to fetch RecordBlooadResult');
        }
      } catch (error) {
        console.error('Error fetching RecordBlooadResult:', error);
      }
    };

    if (username) {
      fetchCancerTypes();
    }
  }, [username]); 


  // POPUP
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openPopup = (imageSrc) => {
    setSelectedImage(imageSrc);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedImage(null);
  };
  // END POPUP

  return (
    <div className="p-4 flex flex-col md:justify-center md:items-center ">
      <div className="flex flex-col bg-white drop-shadow-md shadow-gray-200 px-4 py-2 rounded-lg ">
        <h2 className='font-bold'>HN</h2>
        <h3 className='mb-4'>{patientInfo.HN}</h3>

        <h2 className='font-bold'>เลขประจำตัวประชาชน</h2>
        <h3 className='mb-4'>{username}</h3>

        <h2 className='font-bold'>ชื่อ - นามสกุล</h2>
        <h3 className='mb-4'>{patientInfo.firstName} {patientInfo.lastName}</h3>

        <h2 className='font-bold'>ประเภทมะเร็ง</h2>
        {cancerTypes.map((cancer, index) => (
                <p className='mb-4' key={index}>{cancer.cancerType}</p>
              ))}

        <h2 className='font-bold'>สูตรยา</h2>
        <h3 className='mb-4'>{formula}</h3>

      </div>

      {/* His */}
      <div className=''>
          {/* His Effects */}
          <div className="pt-6">
            <h3 className='pb-2'>ประวัติการส่งผลเลือด</h3>
            {/* กล่อง Loop ที่นี่*/}
            {recordBlooadResult.map((recordBlooad, index) => (
              <div className="">
              <div className="box-sd mb-2">
                <div className="">
                  {/* <img src="/ing/img.png" alt="" /> */}
                  <img src={"http://localhost:8080/" + recordBlooad.picture} className="w-20 h-20" 
                  onClick={() => openPopup("http://localhost:8080/" + recordBlooad.picture)}
                  />
                  
                </div>
                <div className="">
                  {/* <h3>{recordBlooad.picture}</h3> */}
                  {/* <img src={recordBlooad.picture} alt="Blood Result" style={{ maxWidth: '100%', height: 'auto' }} /> */}
                  <h3 key={index}>สถานะ:  {recordBlooad.status}</h3>
                  <h3>{new Date(recordBlooad.date).toLocaleString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    })}
                  </h3>
                </div>
              </div>
              {/* POPUP */}
              {isPopupOpen && (
                <div className="fixed inset-0 bg-black/[.01] flex items-center justify-center z-50 p-4" onClick={closePopup}>
                  <div className="relative bg-white p-4 rounded-lg">
                    <img src={selectedImage} alt="Popup" className="max-w-full max-h-[80vh] rounded-lg" />
                    <button className="absolute top-2 right-2 text-back rounded-full p-2 font-blod" onClick={closePopup}>
                      X
                    </button>
                  </div>
                </div>
              )}
              {/* END POPUP */}
              </div>
            ))}




          </div>
        </div>
    </div>
  )
}

export default DisplayBloodResults