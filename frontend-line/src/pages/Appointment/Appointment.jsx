import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Appointment = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
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
    const userId = Cookies.get('userId');
    if (userId) {
      setUserId(userId);
    }
  }, []);

  useEffect(() => {
    if (username) {
      fetch(`http://localhost:8080/PatientAppointment2/${username}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setAppointments(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [username]);

  if (loading) return <p>กำลังโหลด...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // แยกนัดหมายล่าสุดกับนัดหมายที่เหลือ
  const latestAppointment = appointments.length > 0 ? appointments[0] : null;
  const pastAppointments = appointments.length > 1 ? appointments.slice(1) : [];

  return (
    <div className='p-4'>
      <div className="flex flex-wrap gap-2 items-center justify-center">
        {/* นัดหมายล่าสุด */}
        {latestAppointment && (
          <div className="pt-4">
            <h2 className="text-lg font-bold pb-4">นัดหมายล่าสุด</h2>
            <Link to={`/Appointment/PostponeAppointment/${latestAppointment.appointId}`} className="flex items-center gap-4 p-4 bg-white shadow-md rounded-md hover:shadow-lg transition duration-300">
              <div className="flex flex-col items-center justify-center text-black">
                <p className="text-sm font-medium">นัดหมายที่</p>
                <h2 className="text-5xl font-extrabold">{latestAppointment.appoint_no}</h2>
              </div>
              <div className="flex-grow">
                <h3 className="text-md font-medium text-gray-700">
                  {new Date(latestAppointment.appointDate).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h3>
              </div>
              <button 
                className="p-4 rounded-full w-18 h-12 flex items-center justify-center text-white bg-red-400 hover:bg-blue-600 hover:drop-shadow-lg transition duration-300"
              >
                <h3 className="text-md font-semibold">
                  {new Date(latestAppointment.appointDate).toLocaleTimeString('th-TH', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </h3>
              </button>
            </Link>
          </div>
        )}

        {/* นัดหมายที่ผ่านมาแล้ว */}
        {pastAppointments.length > 0 && (
          <div className='pt-4'>
            <h2 className="text-lg font-bold pb-4">นัดหมายที่ผ่านมาแล้ว</h2>
            {pastAppointments.map((appointment) => (
              <div key={appointment.appointId} className="pt-2">
                <Link to={`/Appointment/PostponeAppointment/${appointment.appointId}`} className="flex items-center gap-4 p-4 bg-white shadow-md rounded-md hover:shadow-lg transition duration-300">
                  <div className="flex flex-col items-center justify-center text-black">
                    <p className="text-sm font-medium">นัดหมายที่</p>
                    <h2 className="text-5xl font-extrabold">{appointment.appoint_no}</h2>
                  </div>
                  <h3 className='text-md font-medium text-gray-700'>
                    {new Date(appointment.appointDate).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </h3>
                  <button className='p-4 rounded-full w-18 h-12 flex items-center justify-center text-white bg-red-400 hover:bg-blue-600 hover:drop-shadow-lg transition duration-300'>
                    <h3 className='text-md font-semibold'>
                      {new Date(appointment.appointDate).toLocaleTimeString('th-TH', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </h3>
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;