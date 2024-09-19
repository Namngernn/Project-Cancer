import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { decodeToken } from "react-jwt";
import { UserOutlined } from '@ant-design/icons';
import { Input, Button, Checkbox, Form, Typography} from 'antd';
import Cookies from 'js-cookie';

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const { Title } = Typography;




const Login = () => {



  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [psw, setPsw] = useState("");

  const userData = {
    userName: userName,
    psw: psw
  };


  const handleLogin = async (event) => {
    event.preventDefault();

    if (!userName.trim()){
      alert("กรุณากรอก userName");
      return;
    }
    else if (!psw.trim()){
      alert("กรุณากรอก password");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/login2', userData)
      if (response.status === 200){
        localStorage.setItem('userName', userName);
        Cookies.set('userName', userName, { expires: 7 }); // Set cookie with expiration of 7 days
        alert("login success");
        navigate('/');
      }
    } catch (error) {
      console.error(error)
      alert("Username or password incorrect");
    }
  }

  
  return (
    <div className="">
    <div className=''>
      {/* header */}
      <div className="sm:p-12 lg:p-5">
        <img src="ing/bg-svg.png" alt="" className='sm:hidden w-full' />
        <img src="ing/bloody_rm-bg.png" alt="" className='w-44 right-1 absolute top-20 sm:hidden'/>
        <h2 className='text-5xl font-bold text-blue700 text-center drop-shadow-lg md:m-4'>Bloody</h2>
      </div>

      {/* เข้าสู่ระบบ */}
      <div className='pt-10 text-center sm:pt-16 lg:pt-5'>
          <Title level={3} className='sarabun-extralight'>เข้าสู่ระบบ</Title>
      </div>

      <div className="flex items-center justify-center md:justify-center md:items-center">
      <Form
        className='p-12 w-full flex flex-col space-y-2'
        initialValues={{remember: true,}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
            <Form.Item
              name="username"
              rules={[{required: true,message: 'กรุณากรอกเลขประจำตัวประชาชนให้ถูกต้อง',},]}>
              <Input showCount maxLength={13}  size="large" placeholder="เลขประจำตัวประชาชน 13 หลัก" prefix={<UserOutlined />}  onChange={e => setUserName(e.target.value)} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{required: true,message: 'กรุณากรอกรหัสผ่านให้ถูกต้อง',},]}>
              <Input.Password size="large" placeholder="รหัสผ่าน" onChange={e => setPsw(e.target.value)}/>
            </Form.Item>

            {/* <Form.Item
              name="remember"
              valuePropName="checked">
              <Checkbox>จดจำฉัน</Checkbox>
            </Form.Item> */}

            <Form.Item>
              
              <Button type="primary" htmlType="submit" className='bt-blue' onClick={handleLogin} >เข้าสู่ระบบ</Button>
              
            </Form.Item>
            
      </Form>
      </div>

        <div className='pt-10 text-blue600 text-center'>
          <Link to="/Register">หากคุณยังไม่มีบัญชีกรุณาลงทะเบียน</Link>
        </div>   
    </div>
    </div>

  )
}

export default Login