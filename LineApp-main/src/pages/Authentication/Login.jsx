import React from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons';
import { Input, Button, Checkbox, Form, Typography} from 'antd';

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const { Title } = Typography;

const onChange = (e) => {
  console.log('Change:', e.target.value);
};

const Login = () => {
  
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
        className='p-7 flex flex-col space-y-2'
        initialValues={{remember: true,}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
            <Form.Item              
              name="username"
              rules={[{required: true,message: 'กรุณากรอกเลขประจำตัวประชาชนให้ถูกต้อง',},]}>
              <Input showCount maxLength={13} onChange={onChange} size="large" placeholder="เลขประจำตัวประชาชน 13 หลัก" prefix={<UserOutlined />}/>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{required: true,message: 'กรุณากรอกรหัสผ่านให้ถูกต้อง',},]}>
              <Input.Password size="large" placeholder="รหัสผ่าน"/>
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked">
              <Checkbox>จดจำฉัน</Checkbox>
            </Form.Item>

            <Form.Item>
              {/* <Link to="/"> */}
                <Button type="primary" htmlType="submit" className='bt-blue'>เข้าสู่ระบบ</Button>
              {/* </Link> */}
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