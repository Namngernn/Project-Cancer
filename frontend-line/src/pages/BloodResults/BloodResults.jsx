import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const BloodResults = () => {
  const [username, setUsername] = useState('');
  const [formula, setFormula] = useState('');
  const [cancerTypes, setCancerTypes] = useState([]);

  useEffect(() => {
    const user = Cookies.get('userName');
    if (user) {
      setUsername(user);
    }
  }, []); // ดึงค่าจาก Cookie เมื่อคอมโพเนนต์เริ่มต้นเท่านั้น

  useEffect(() => {
    const user = Cookies.get('userName');
    if (user && user !== username) {
      setUsername(user);
    }
  });

  useEffect(() => {
    const fetchFormula = async () => {
      try {
        // console.log(`Fetching formula for user: ${username}`);
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
  }, [username]); // ดึงข้อมูลสูตรยาทุกครั้งที่ username เปลี่ยน



  
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
  }, [username]); // ดึงข้อมูลประเภทมะเร็งทุกครั้งที่ username เปลี่ยน

  return (
    <div className='p-4 mt-4'>
      {/* <h1>เลือกแผนการรักษา</h1> */}

      <Link to={"/BloodResults/FillResults"}>
        <div className="flex items-center justify-center md:justify-center md:items-center">
          <div className="w-72 bg-white drop-shadow-md shadow-gray-200 px-4 py-2 rounded-lg flex items-center justify-center sm:px-14 ">
            <div className="flex flex-row items-center mr-4">
              <img src="ing/plan.png" alt="Plan Icon" />
            </div>
            <div>
              {cancerTypes.map((cancer, index) => (
                <p key={index}>{cancer.cancerType}</p>
              ))}
              <div className="flex gap-2 pt-2">
                <div>
                  <img src="ing/medicine.png" alt="Medicine Icon" />
                </div>
                <p>{formula}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>


    </div>
  );
};

export default BloodResults;