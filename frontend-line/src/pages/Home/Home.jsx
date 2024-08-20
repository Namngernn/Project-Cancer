import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex md:justify-center md:items-center">
    <div className='flex flex-col items-center text-center p-4 w-full space-y-8 md:w-1/3'>
      <div className="w-full flex justify-between  text-white ">
        <Link to={"/Login"} className='bg-blue700 border-collapse hover:bg-blue600 duration-300 hover:drop-shadow-lg w-5/12 m-2 p-3 rounded-full '>Login</Link>
        <Link to={"/Register"} className='bg-blue700 border-collapse hover:bg-blue600 duration-300 hover:drop-shadow-lg w-5/12 m-2 p-3 rounded-full'>Register</Link>
      </div>
        
        <Link to={"/BloodResults"} className='bt-blue md:p-1'>Blood Results</Link>
        <Link to={"/Appointment"} className='bt-blue'>Appointment</Link>
        <Link to={"/Contacts"} className='bt-blue'>Contacts</Link>
        <Link to={"/Effects"} className='bt-blue'>Effects</Link>
        <Link to={"/PatientManual"} className='bt-blue'>Patient Manual</Link>
        
    </div>
    </div>
  )
}

export default Home