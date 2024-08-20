import React from 'react'
import { Link } from 'react-router-dom'

const AppointmentDetails = () => {
  return (
    <div className='p-3 pt-8 flex flex-col items-center justify-center md:justify-center md:items-center'>
      <div className='px-20 py-6 rounded-lg flex justify-around items-center space-x-5'>
          {/* มาเพิ่มรูป Avatar ปฎิทิน*/}
          <div className='flex flex-col'>
          <h2 className='text-xl'>นัดหมาย</h2>
          <h3 className='text-sm text-yellow'>รอดำเนินการ</h3>
            
          </div>
      </div>

      {/* รายละเอียด */}
      <div className='p-10 space-y-10'>
          <h1>000001</h1>
          <div className="">
            <h1>ชื่อ - นามสกุล</h1>
            <h3>ชื่อสมมุติ1 นามสกุลสมมุติ1</h3>
          </div>
          <div className="">
            <h1>วันที่นัดหมาย</h1>
            <h3>วันที่ 17 มกราคม 2567 9:00</h3>
          </div>
          
      </div>

      <div className='p-7 flex flex-col space-y-2'>
          <Link to={"/"}><button className='bt-blue'>กลับไปยังหน้าหลัก</button></Link>
      </div>

    </div>

  )
}

export default AppointmentDetails