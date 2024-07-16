import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Flex } from 'antd';

const Effects = () => {
  return (
    <div className='p-4'>
      
      
        <div className="flex flex-col md:justify-center md:items-center">
          {/* button */}
          <Link to={"/Effects/AddEffects"}>
          <button className='bt-blue'>+ เพิ่มผลค้างเคียง</button>
          </Link>
          {/* His Effects */}
          <div className="pt-6">
            <h3 className='pb-2'>ประวัติการบันทึกผลข้างเคียง</h3>
            {/* กล่อง Loop ที่นี่*/}
            <div className="box-sd">
              <div className="text-center text-blue700 shadow-sm">
                <p className='text-sm'>บันทึกครั้งที่</p>
                <h2 className='text-5xl'>6</h2>
              </div>
              <div className="">
                <h3 className='text-md'>วันที่ 17 มกราคม 2567</h3>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  )
}

export default Effects