import React from 'react'
import { Link } from 'react-router-dom';


const PatientManual = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center md:justify-center md:items-center">
      <div className='p-10 text-center sarabun-extralight '>
          <h1 >Cis CCRT Cervix</h1>
      </div>

      {/* ใส่ข้อมูลเลย */}
      <div className="text-red-500">รอออออออออ</div>

      <div className='p-20 pt-1 text-center flex flex-col space-y-10 sm:p-1'>
        <Link to={'/Contacts'}><h2>ติดต่อโรงพยาบาล</h2></Link>
      </div>
      </div>
    </div>
  )
}

export default PatientManual