import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Appointment = () => {
  const [username, setUsername] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = Cookies.get('userName');
    if (user) {
      setUsername(user);
    }
  }, []);

  useEffect(() => {
    if (username) {
      fetch(`http://localhost:3000/PatientAppointment2/${username}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setAppointments(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }
  }, [username]);

  if (loading) return <p>กำลังโหลด...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const now = new Date();
  const upcomingAppointments = appointments.filter(appointment => new Date(appointment.appointDate) >= now);
  const pastAppointments = appointments.filter(appointment => new Date(appointment.appointDate) < now);

  return (
    <div className='p-4'>
      <h2 className="text-xl font-semibold mb-4">นัดหมายปัจจุบัน</h2>
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {upcomingAppointments.length > 0 ? (
          upcomingAppointments.map((appointment) => (
            <div key={appointment.appointId} className="pt-2">
              <Link to={`/Appointment/PostponeAppointment/${appointment.appointId}`} className="box-sd">
                <div className="text-center text-black shadow-sm w-18">
                  <p className='text-sm'>นัดหมายที่</p>
                  <h2 className='text-5xl'>{appointment.appoint_no}</h2>
                </div>
                <h3 className='text-md'>{new Date(appointment.appointDate).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</h3>
                <button className='p-3 rounded-full w-18 text-white bg-red-300 border-collapse hover:bg-blue-600 duration-300 hover:drop-shadow-lg'>
                  <h3 className='text-md'>{new Date(appointment.appointDate).toLocaleTimeString('th-TH', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}</h3>
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p>ไม่มีการนัดหมาย</p>
        )}
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">นัดหมายที่ผ่านไปแล้ว</h2>
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {pastAppointments.length > 0 ? (
          pastAppointments.map((appointment) => (
            <div key={appointment.appointId} className="pt-2">
              <Link to={`/Appointment/PostponeAppointment/${appointment.appointId}`} className="box-sd">
                <div className="text-center text-black shadow-sm w-18">
                  <p className='text-sm'>นัดหมายที่</p>
                  <h2 className='text-5xl'>{appointment.appoint_no}</h2>
                </div>
                <h3 className='text-md'>{new Date(appointment.appointDate).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</h3>
                <button className='p-3 rounded-full w-18 text-white bg-red-300 border-collapse hover:bg-blue-600 duration-300 hover:drop-shadow-lg'>
                  <h3 className='text-md'>{new Date(appointment.appointDate).toLocaleTimeString('th-TH', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}</h3>
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p>ไม่มีนัดหมายที่ผ่านไปแล้ว</p>
        )}
      </div>
    </div>
  );
};

export default Appointment