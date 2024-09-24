import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Input, Radio } from 'antd';
import axios from 'axios';

const PostponeAppointment = () => {
  const [username, setUsername] = useState('');
  const [userIdLine, setUserIdLine] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAppointments, setNewAppointments] = useState([]);
  const { appointId } = useParams();
  const navigate = useNavigate();

  // Input values
  const [reason, setReason] = useState('');
  const [email, setEmail] = useState('');
  const [requestPhone, setRequestPhone] = useState('');
  const [newAppointDate, setNewAppointDate] = useState("");

  // Set value newAppointDate
  const onChangenewAppointDate = (e) => {
    setNewAppointDate(e.target.value);
  };

  

  // Format date in db
  function formatDateForValue(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    const user = Cookies.get('userName');
    if (user) {
      setUsername(user);
    }
  }, []);

  useEffect(() => {
    if (username) {
      fetch(`http://localhost:3000/PatientAppointment2/${username}/${appointId}`)
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

  useEffect(() => {
    if (appointments.length > 0) {
      const firstAppointment = appointments[0];
      const nextAppointments = getNextAppointments(firstAppointment.appointDate);
      setNewAppointments(nextAppointments);
    }
  }, [appointments]);

   // LINE
  useEffect(() => {
    const fetchUserIdLine = async () => {
      console.log(username)
      try {
        const response = await axios.get(`http://localhost:3000/useridline/${username}`);
        console.log(response.data[0].UserIdLine);
        if (response.data) {
          setUserIdLine(response.data[0].UserIdLine);
        }
      } catch (error) {
        console.error("Error fetching UserIdLine:", error);
      }
    };
    fetchUserIdLine();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  function getNextAppointments(appointDate) {
    const date = new Date(appointDate);
    const result = [];
    const targetDay = date.getDay(); 
    let count = 0;
  
    while (count <= 4) {
      if (date.getDay() === targetDay) {
        result.push(new Date(date));
        count++;
      }
      date.setDate(date.getDate() + 1);
    }
    return result;
  }

  const handleSubmit = () => {
    fetch(`http://localhost:3000/PatientPostpone/${appointId}/${userIdLine}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newAppointDate,
        reason,
        email,
        requestPhone,
      }),
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        // navigate('/Appointment/AppointmentDetails');
        navigate(`/Appointment/AppointmentDetails?appointId=${appointId}`);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  
  return (
    <div>
      <div className="p-4 space-y-12">
        <div className="">
          <h2 className="text-lg">นัดหมายเดิม</h2>
          <h1>User ID Line: {userIdLine}</h1>
          <h1>UserName: {username}</h1>
          {appointments.map((appointment) => (
            <div key={appointment.appointId} className="pt-2">
              <h3 className="text-md">{new Date(appointment.appointDate).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</h3>
              <div className="">{new Date(appointment.appointDate).toLocaleTimeString('th-TH', {
                hour: '2-digit',
                minute: '2-digit',
              })} น.</div>
            </div>
          ))}
        </div>
        <div className="">
          <h2 className="text-lg">นัดหมายใหม่</h2>
          <Radio.Group onChange={onChangenewAppointDate} value={newAppointDate}>
            {newAppointments.length > 0 ? (
              newAppointments.slice(1).map((date, index) => (
                <Radio key={index} className="pt-2 w-11/12" value={formatDateForValue(date)}>
                  {date.toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })} {date.toLocaleTimeString('th-TH', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })} น.
                </Radio>
              ))
            ) : (
              <p>ไม่มีวันนัดหมายใหม่ที่ตรงกัน</p>
            )}
          </Radio.Group>
          {/* <h1>Appointment ID: {appointId}</h1> */}
          <div className="mt-8"></div>

          <div className="space-y-4">
            <div>
              <div>เหตุผล</div>
              <Input placeholder="เหตุผล" onChange={e => setReason(e.target.value)} />
            </div>
            <div>
              <div>อีเมลล์</div>
              <Input placeholder="อีเมลล์" onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <div>เบอร์โทร</div>
              <Input placeholder="เบอร์โทร" onChange={e => setRequestPhone(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button className="bt-blue" onClick={handleSubmit}>ยืนยันการเลื่อนการนัดหมาย</button>
      </div>
    </div>
  );
};

export default PostponeAppointment;