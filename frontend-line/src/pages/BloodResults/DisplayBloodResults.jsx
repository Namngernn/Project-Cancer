import React from 'react'
import { Link } from 'react-router-dom'

const DisplayBloodResults = () => {
  return (
    <div className="p-4 flex flex-col md:justify-center md:items-center ">
      <div className="flex flex-col bg-white drop-shadow-md shadow-gray-200 px-4 py-2 rounded-lg ">
        <h2 className='font-bold'>HN</h2>
        <h3 className='mb-4'>000001</h3>

        <h2 className='font-bold'>เลขประจำตัวประชาชน</h2>
        <h3 className='mb-4'>0000000000001</h3>

        <h2 className='font-bold'>ชื่อ - นามสกุล</h2>
        <h3 className='mb-4'>ชื่อสมมุติ1 นามสกุลสมมุติ1</h3>

        <h2 className='font-bold'>ประเภทมะเร็ง</h2>
        <h3 className='mb-4'>มะเร็งต่อมไทรอยด์ ระยะที่ 2, มะเร็งต่อมลูกหมาก ระยะที่ 4</h3>

        <h2 className='font-bold'>สูตรยา</h2>
        <h3 className='mb-4'>Cis CCRT Cervix</h3>

      </div>

      {/* His */}
      <div className=''>
          {/* His Effects */}
          <div className="pt-6">
            <h3 className='pb-2'>ประวัติการส่งผลเลือด</h3>
            {/* กล่อง Loop ที่นี่*/}
            <div className="box-sd">
              <div className="">
                <img src="/ing/img.png" alt="" />
              </div>
              <div className="">
                <h3>images/123456.jpg</h3>
                <h3>สถานะ: อนุมัติ</h3>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default DisplayBloodResults