//หน้าบันทึกผลข้างเคียง
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Checkbox, Button } from 'antd';
import Cookies from 'js-cookie';
import axios from 'axios';
import AxiosClient from "../../AxiosClient";

const { TextArea } = Input;

const AddEffects = () => {
  const [selectedEffects, setSelectedEffects] = useState([]);
  const [customEffect, setCustomEffect] = useState('');
  const navigateHistory = useNavigate();
  const [username, setUsername] = useState('');
  const [userIdLine, setUserIdLine] = useState('');
  
  const onChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
        setSelectedEffects([...selectedEffects, value]);
    } else {
        setSelectedEffects(selectedEffects.filter(effect => effect !== value));
    }
  };

  useEffect(() => {
    const user = Cookies.get('userName', { expires: 7 });
    console.log("User from Cookies:", user);
    if (user) {
      setUsername(user);
    }
  }, []);

  const handleCheckboxChange = (effect) => {
    setSelectedEffects((prev) =>
        prev.includes(effect)
            ? prev.filter((e) => e !== effect)
            : [...prev, effect]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const patientSideEffect = [...selectedEffects, customEffect].filter(Boolean).join(', ');
    const sendAt = new Date().toISOString().slice(0, 19).replace('T', ' '); // "YYYY-MM-DD HH:MM:SS"

    if (!username) {
      alert('ไม่พบ username ในระบบ กรุณาลงชื่อเข้าใช้ใหม่');
      return;
    }
    // check
    console.log('username:', username);
    console.log('Request payload:', {
      username,
      sideEffect: patientSideEffect,
      date: sendAt,
    });
    
    try {
      const response = await axios.post(`http://localhost:3000/feedback/${username}`,
        {
          sideEffect: patientSideEffect, // ผลข้างเคียงที่ผู้ป่วยระบุ
          date: sendAt, // วันที่และเวลาที่บันทึก
        },
        {
          withCredentials: true, // ส่ง cookies ไปด้วย
        }
      );
      alert("บันทึกผลข้างเคียงสำเร็จ");
      console.log("Effect added:", response.data);
      navigateHistory("/Effects");
    } catch (error) {
      alert("บันทึกผลข้างเคียงไม่สำเร็จ");
      console.error("Error adding effect:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Response Status:", error.response.status);
        console.error("Response Headers:", error.response.headers);
      } else if (error.request) {
        console.error("No Response Received:", error.request);
      } else {
        console.error("Axios Error:", error.message);
      }
    }
  };

  return (
<div className="p-8 max-w-lg mx-auto bg-white rounded-lg">
  <div className="flex flex-col items-center">
    <h2 className="text-2xl font-semibold pb-6">บันทึกผลข้างเคียง</h2>
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col space-y-6">
        <label className="flex items-center space-x-2 text-lg">
          <input
            type="checkbox"
            value="กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ"
            onChange={() => handleCheckboxChange('กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ')}
            className="form-checkbox"
          />
          <span>กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ</span>
        </label>
        <label className="flex items-center space-x-2 text-lg">
          <input
            type="checkbox"
            value="เยื่อบุปากอักเสบ"
            onChange={() => handleCheckboxChange('เยื่อบุปากอักเสบ')}
            className="form-checkbox"
          />
          <span>เยื่อบุปากอักเสบ</span>
        </label>
        <label className="flex items-center space-x-2 text-lg">
          <input
            type="checkbox"
            value="ผมร่วง / ผมบาง"
            onChange={() => handleCheckboxChange('ผมร่วง/ ผมบาง')}
            className="form-checkbox"
          />
          <span>ผมร่วง / ผมบาง</span>
        </label>
        <label className="flex items-center space-x-2 text-lg">
          <input
            type="checkbox"
            value="อ่อนเพลีย / ครั่นเนื้อครั่นตัว"
            onChange={() => handleCheckboxChange('อ่อนเพลีย / ครั่นเนื้อครั่นตัว')}
            className="form-checkbox"
          />
          <span>อ่อนเพลีย / ครั่นเนื้อครั่นตัว</span>
        </label>
        <label className="flex items-center space-x-2 text-lg">
          <input
            type="checkbox"
            value="ผิวหนังสีเข้มขึ้น"
            onChange={() => handleCheckboxChange('ผิวหนังสีเข้มขึ้น')}
            className="form-checkbox"
          />
          <span>ผิวหนังสีเข้มขึ้น</span>
        </label>
        <label className="flex items-center space-x-2 text-lg">
          <input
            type="checkbox"
            value="ใจสั่น / หอบเหนื่อยง่าย"
            onChange={() => handleCheckboxChange('ใจสั่น / หอบเหนื่อยง่าย')}
            className="form-checkbox"
          />
          <span>ใจสั่น / หอบเหนื่อยง่าย</span>
        </label>
        <label className="flex items-center space-x-2 text-lg">
          <input
            type="checkbox"
            value="กระเพาะปัสสาวะอักเสบ"
            onChange={() => handleCheckboxChange('กระเพาะปัสสาวะอักเสบ')}
            className="form-checkbox"
          />
          <span>กระเพาะปัสสาวะอักเสบ</span>
        </label>
        <label className="flex items-center space-x-2 text-lg">
          <input
            type="checkbox"
            value="อื่นๆ โปรดระบุ"
            className="form-checkbox"
          />
          <span>อื่นๆ โปรดระบุ</span>
        </label>
        <textarea
          placeholder="โปรดระบุผลข้างเคียง"
          className="mt-2 p-3 border rounded-lg w-full"
          style={{ height: 100 }}
          value={customEffect}
          onChange={(e) => setCustomEffect(e.target.value)}
        />
      </div>
      <button
        className="mt-6 w-full py-3 bg-blue111 text-white font-semibold rounded-lg hover:bg-blue-600"
        type="submit"
      >
        บันทึกผลข้างเคียง
      </button>
    </form>
  </div>
</div>

  )
}

export default AddEffects