import React from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Button, Typography} from 'antd';
const { Title } = Typography;

const Register = () => {
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
          <Title level={3} className='sarabun-extralight'>ลงทะเบียน</Title>
      </div>

      {/* form */}
      <div className="flex items-center justify-center md:justify-center md:items-center">
      <div className='p-7 flex flex-col space-y-5'>
          <Input size="large" placeholder="เลขประจำตัวประชาชน 13 หลัก" prefix={<UserOutlined />} />
          <Input.Password size="large" placeholder="รหัสผ่าน" />
          <Input.Password size="large" placeholder="ยืนยันรหัสผ่าน" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
          <Link to="/Login"><Button className='bt-blue'>ลงทะเบียน</Button></Link>
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