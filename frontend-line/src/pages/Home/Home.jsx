import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      {/* header */}
      <div className="sm:p-12 lg:p-5">
        <img src="ing/bg-svg.png" alt="" className='sm:hidden w-full' />
        <img src="ing/bloody_rm-bg.png" alt="" className='w-44 right-1 absolute top-20 sm:hidden'/>
        <h2 className='text-5xl font-bold text-blue700 text-center drop-shadow-lg md:m-4'>Bloody</h2>
      </div>

      <div className="flex md:justify-center md:items-center">
      <div className='flex flex-col items-center text-center p-4 w-full space-y-8 md:w-1/3'>
      <div className="w-full flex justify-between  text-white ">
        <Link to={"/Login"} className='bg-blue700 border-collapse hover:bg-blue600 duration-300 hover:drop-shadow-lg w-5/12 m-2 p-3 rounded-full '>เข้าสู่ระบบ</Link>
        <Link to={"/Register"} className='bg-blue700 border-collapse hover:bg-blue600 duration-300 hover:drop-shadow-lg w-5/12 m-2 p-3 rounded-full'>ลงทะเบียน</Link>
      </div>
      </div> 
      </div>

      {/* แถบฟังก์ชัน */}
      <div className="container">
        <div className="grid-container">
          <Link to={"/BloodResults"} className='grid-item bt-blue md:p-1'>ส่งผลเลือด</Link>
          <Link to={"/Appointment"} className='grid-item bt-blue'>การนัดหมาย</Link>
          <Link to={"/Contacts"} className='grid-item bt-blue'>ติดต่อโรงพยาบาล</Link>
          <Link to={"/AddEffects"} className='grid-item bt-blue'>ผลข้างเคียง</Link>
          <Link to={"/PatientManual"} className='grid-item bt-blue'>คู่มือผู้ป่วย</Link>
          <Link className='grid-item bt-blue'>CHAT BOT</Link>
        </div>
      </div>
      
    </div>
  )
}

export default Home;