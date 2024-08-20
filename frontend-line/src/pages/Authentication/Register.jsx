import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [psw, setPsw] = useState("");
  const [confirmPsw, setConfirmPsw] = useState("");
  
  const userData = {
    userName: userName,
    psw: psw
  };





  const handleReg = async (event) => {
    event.preventDefault();
    if (!userName.trim()) {
      alert("กรุณากรอก userName");
      return;
    }
    else if (!psw.trim()) {
      alert("กรุณากรอก password");
      return;
    }
    else if (!confirmPsw.trim()) {
      alert("กรุณากรอก confirm password");
      return;
    }
    else if (psw !== confirmPsw){
      alert("รหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/register2', userData)

      if (response.status === 200){
        alert("reg success");
        navigate('/Login');
      }

    } catch (error) {
      console.error(error.response)
    }

  }

















  return (
    <div>
      {/* header */}
      <div className="sm:p-12 lg:p-5">
        <img src="ing/bg-svg.png" alt="" className='sm:hidden w-full'/>
        <img src="ing/bloody_rm-bg.png" alt="" className='w-44 right-1 absolute top-20 sm:hidden'/>
        <h2 className='text-5xl font-bold text-blue700 text-center drop-shadow-lg md:m-4'>Bloody</h2>
      </div>
      
      {/* ลงทะเบียน */}
      <div className='pt-10 text-center sm:pt-16 lg:pt-5'>
          <h2 level={3} className='sarabun-extralight text-2xl'>ลงทะเบียน</h2>
      </div>

      {/* form */}
      <div className="flex items-center justify-center md:justify-center md:items-center">
      <div className='p-12 w-full flex flex-col space-y-5'>
          <input size="large" placeholder="เลขประจำตัวประชาชน 13 หลัก" onChange={e => setUserName(e.target.value)}/>
          <input size="large" placeholder="รหัสผ่าน" onChange={e => setPsw(e.target.value)} />
          <input size="large" placeholder="ยืนยันรหัสผ่าน" onChange={e => setConfirmPsw(e.target.value)}/>
          <button className='bt-blue' onClick={handleReg} >ลงทะเบียน</button>
      </div>
      </div>

        
      {/* ปุ่มกดไปหน้า login */}
      <div className='pt-10 text-blue600 text-center'>
        <Link to="/Login" >หากมีบัญชีแล้วสามารถกดเข้าสู่ระบบ Login</Link>
      </div>

    </div>
  )
}

export default Register