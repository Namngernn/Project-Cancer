import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex md:justify-center md:items-center">
    <div className='flex flex-col items-center text-center p-4 w-full space-y-8 md:w-1/3'>
      <div className="w-full flex justify-between  text-white ">
        <Link to={"/Login"} className='bg-blue700 border-collapse hover:bg-blue600 duration-300 hover:drop-shadow-lg w-5/12 m-2 p-3 rounded-full '>เข้าสู่ระบบ</Link>
        <Link to={"/Register"} className='bg-blue700 border-collapse hover:bg-blue600 duration-300 hover:drop-shadow-lg w-5/12 m-2 p-3 rounded-full'>ลงทะเบียน</Link>
      </div>
        
        <Link to={"/BloodResults"} className='bt-blue md:p-1'>ส่งผลเลือด</Link>
        <Link to={"/Appointment"} className='bt-blue'>การนัดหมาย</Link>
        <Link to={"/Contacts"} className='bt-blue'>ติดต่อโรงพยาบาล</Link>
        <Link to={"/Effects"} className='bt-blue'>ผลข้างเคียง</Link>
        <Link to={"/PatientManual"} className='bt-blue'>คู่มือผู้ป่วย</Link>
        
    </div>
    </div>
  )
}

export default Home