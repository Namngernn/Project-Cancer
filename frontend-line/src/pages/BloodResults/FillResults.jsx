import React from 'react'
import { Link } from 'react-router-dom'

const FillResults = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center md:justify-center md:items-center">
      <div className="mt-4"></div>
      {/* ปุ่มเลือกรูป / ถ่ายรูป */}
      <div className="w-full flex justify-around sm:justify-between sm:w-1/2 md:1/3">
        <button className='bt2-blue w-5/12 m-2 sm:text-sm'>เลือกรูปภาพ</button>
        <button className='bt2-blue w-5/12 m-2 sm:text-sm'>ถ่ายรูป</button>
      </div>

      {/* แสดงรูป */}
      <div className="flex justify-center items-center h-full pt-12">
        <img src="/ing/bloodrs.png" alt="" className='sm:w-96'/>
      </div>

      {/* ที่กรองออกจากรูปมาเป็น text input */}
      {/* <div className="box-sd m-2">
        <h1>dddddd</h1>
      </div> */}



      {/* ปุ่มส่งผลเลือด */}
      <Link to={"/BloodResults/DisplayBloodResults"}>
        <button className='bg-blue700 border-collapse hover:bg-blue600 duration-300 hover:drop-shadow-lg w-full m-2 p-3 rounded-full  mt-20 text-white'>ส่งผลเลือด</button>
      </Link>
    </div>
    </div>
    
  )
}

export default FillResults