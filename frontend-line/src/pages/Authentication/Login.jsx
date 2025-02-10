import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Input, Button, Checkbox, Form, Typography } from 'antd';
import liff from '@line/liff';
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
  const [profile, setProfile] = useState(null);
  const [userId, setUserId] = useState("");

  const userData = {
    userName: userName,
    UserIdLine: userId
  };

  useEffect(() => {
    const main = async () => {
      await liff.init({ liffId: "2006367428-DL91peYa" });
      if (!liff.isLoggedIn()) {
        liff.login();
      }

      const profileData = await liff.getProfile();
      setProfile(profileData);
      setUserId(profileData.userId);
      console.log("login complete", profileData);
    };
    
    main();
  }, []);

  const logout = async () => {
    liff.logout();
    window.location.reload();
  };


  const handleLogin = async (event) => {
    event.preventDefault();

    if (!userName.trim()){
      alert("กรุณากรอก userName");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/login34', userData)
      if (response.status === 200){
        localStorage.setItem('userName', userName);
        localStorage.setItem('HN', response.data.HN);
        localStorage.setItem('userId', userId);
        Cookies.set('userName', userName, { expires: 7 });
        Cookies.set('HN', response.data.HN, { expires: 7 });
        Cookies.set('userId',userId, { expires: 7 });
        alert("login success");
        navigate('/menu');
      }
    } catch (error) {
      console.error(error)
      alert(error);
    }
  }


  return (
    <div className="">
      <div className=''>
        <div className="sm:p-12 lg:p-5">
          <img src="ing/bg-svg.png" alt="" className='sm:hidden w-full' />
          <img src="ing/bloody_rm-bg.png" alt="" className='w-44 right-1 absolute top-20 sm:hidden' />
          <h2 className='text-5xl font-bold text-blue700 text-center drop-shadow-lg md:m-4'>Bloody</h2>
        </div>

        <div className='pt-10 text-center sm:pt-16 lg:pt-5'>
          <Title level={3} className='sarabun-extralight'>เข้าสู่ระบบ</Title>
        </div>

        <div className="flex items-center justify-center md:justify-center md:items-center">
          <Form
            className='p-12 w-full flex flex-col space-y-2'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <h1 className="">กรอกเลขบัตรจำตัวประชาชน</h1>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'กรุณากรอกเลขประจำตัวประชาชนให้ถูกต้อง' }]}>
              <Input
                showCount
                maxLength={13}
                size="large"
                placeholder="เลขประจำตัวประชาชน 13 หลัก"
                prefix={<UserOutlined />}
                onChange={e => setUserName(e.target.value)}
              />
            </Form.Item>

            <Form.Item className='pt-5'>
              <button
                type="submit"
                className='p-3 rounded-full w-full text-white bg-blue700 border-collapse hover:bg-blue600 duration-300 hover:drop-shadow-lg'
                onClick={handleLogin}
                >
                เข้าสู่ระบบ
              </button>
            </Form.Item>
          </Form>
        </div>

        <div className="lineProfile">
          {/* <div className="">Hello {profile ? profile.displayName : "Name"}</div>
          <div id="lineUID">UID: {userId || "Your UID"}</div>
          <div id="lineUID">username: {userName}</div>
          <button id="logout" onClick={logout}>Log out</button> */}
        </div>
      </div>
    </div>
  );
};

export default Login;