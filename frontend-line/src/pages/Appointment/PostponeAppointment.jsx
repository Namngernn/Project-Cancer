import React from 'react'
import { Link } from 'react-router-dom'

const PostponeAppointment = () => {
  return (
    <div>
      {/* ทำใหม่ รอแป้ป*/}
      {/* นัดหมายเดิม นัดหมายใหม่*/}
      <div className="p-4 space-y-12">
        <div className="space-y-2">
          <h2 className='text-lg'>นัดหมายเดิม</h2>
          <h3>วันที่ 7 มกราคม 2567 9:00 น.</h3>
        </div>
        <div className="">
          <h2 className='text-lg'>นัดหมายใหม่</h2>
          <h3>วันที่ 14 มกราคม 2567 9:00 น.</h3>
        </div>
      </div>

      {/* THIS PLACE IS CALENDAR */}

      {/* ปุ่มยืนยันเลื่อนวันนัด */}
        <Link to={"/Appointment/AppointmentDetails"} class="flex justify-center items-center">
          <button className='bt-blue'>ยืนยันการเลื่อนการนัดหมาย</button>
        </Link>
      
    </div>
  );
};





export default PostponeAppointment