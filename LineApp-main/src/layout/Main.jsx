import React from 'react'
import { Outlet } from 'react-router-dom'
import '.././App.css'

const Main = () => {
  return (
    <div>
        <nav className='text-center p-4 shadow-sm shadow-black-100 bg-white'>
          Bloody
        </nav>
        {/* form react router dom at in rounter.jsx*/}
        <Outlet/>
    </div>
  )
}

export default Main