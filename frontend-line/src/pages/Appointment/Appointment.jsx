import React from 'react'
import { Link } from 'react-router-dom'

const Appointment = () => {
  return (
    <div className='p-4'>
      <div className="flex items-center justify-center md:justify-center md:items-center">
      <div className="pt-6">
              <Link to={"/Appointment/PostponeAppointment"} className="box-sd ">
                <div className="text-center text-black shadow-sm">
                  <p className='text-sm'>นัดหมาย</p>
                  <h2 className='text-5xl'>17</h2>
                </div>
                  <h3 className='text-md'>มกราคม 2567</h3>
                <button className='p-3 rounded-full w-20 text-white bg-red300 border-collapse hover:bg-blue600 duration-300 hover:drop-shadow-lg'>
                  <h3 className='text-md'>9:00</h3>
                </button>
              </Link>
          </div>
      </div>
    </div>

  )
}

export default Appointment