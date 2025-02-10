import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AppointmentDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const appointId = queryParams.get('appointId');
  const [postponeDetail, setPostponeDetail] = useState([]);

  useEffect(() => {
    const fetchCancerTypes = async () => {
      try {
        const response = await fetch(`http://localhost:8080/request2/${appointId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('postponeDetail received from API:', data);
          setPostponeDetail(data); 
        } else {
          console.error('Failed to fetch postponeDetail');
        }
      } catch (error) {
        console.error('Error fetching postponeDetail:', error);
      }
    };

    if (appointId) {
      fetchCancerTypes();
    }
  }, [appointId]);

  return (
    <div className='p-3 pt-8 flex flex-col items-center justify-center md:justify-center md:items-center'>
      <div className='px-20 py-6 rounded-lg flex justify-around items-center space-x-5'>
        {/* มาเพิ่มรูป Avatar ปฎิทิน */}
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-xl'>ขอเลื่อนนัดหมายแล้ว</h2>
          {/* {postponeDetail.length > 0 && (
            <h3 className='text-sm text-yellow'>{postponeDetail[0].requestStatus}</h3>
          )} */}
        </div>
      </div>

      {/* รายละเอียด */}
      <div className='p-10 space-y-8'>
        {postponeDetail.length > 0 && (
          <>
            <div className="">
              <h1>ชื่อ - นามสกุล</h1>
              <h3>{postponeDetail[0].firstName} {postponeDetail[0].lastName}</h3>
            </div>
            <div className="">
              <h1>วันที่ขอเลื่อนนัดหมาย</h1>
              <h3>{new Date(postponeDetail[0].newAppointDate).toLocaleString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })} น.
              </h3>
            </div>
          </>
        )}
      </div>

      <div className='p-7 flex flex-col space-y-2'>
        <Link to={"/"}><button className='p-3 rounded-full w-52 text-white bg-blue700 border-collapse hover:bg-blue600 duration-300 hover:drop-shadow-lg'>กลับไปยังหน้าหลัก</button></Link>
      </div>
    </div>
  );
}

export default AppointmentDetails;