import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link, useNavigate } from 'react-router-dom';
import '.././App.css'

const Main = () => {
  

  const logout = () => {
    try {
    localStorage.removeItem('userName')
    // ลบคุกกี้ด้วยการกำหนดวันหมดอายุที่ผ่านมา
    document.cookie = 'userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    alert('ออกจากระบบแล้ว');
    navigate('/login');
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
        <nav className='text-center p-4 shadow-sm shadow-black-100 bg-white grid grid-cols-3'>
          
          <h4 className='col-start-2'>Bloody</h4>
          <Link className='text-right' onClick={logout}>ออกจากระบบ</Link>
        </nav>
        {/* form react router dom at in rounter.jsx*/}
        <Outlet/>
    </div>
  )
}

export default Main