// หน้าประวัติการบันทึกผลข้างเคียง
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosClient from "../../AxiosClient";
import Cookies from 'js-cookie';


const thaiMonthNames = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const formatThaiDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear() + 543; //ปีพศ
  const month = thaiMonthNames[date.getMonth()];
  const day = date.getDate();
  return `${day} ${month} ${year}`;
};

//หน้าประวัติผลข้างเคียง
const Effects =  () => {
  const [history, setHistory] = useState([]);
  const navigateDetailHistory = useNavigate();
  const [username, setUsername] = useState('');
  const [userIdLine, setUserIdLine] = useState('');
  const [appointId, setAppointId] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      const user = Cookies.get('userName', { expires: 7 });
      console.log("User from Cookies:", user);
      if (user) {
        setUsername(user);
      }else {
        console.error("No username found in cookies");
        return;
      }

      try {
        // ดึง max appointId ตาม username (IDcard)
        const appointResponse = await AxiosClient.get(`/maxAppoint/${user}`);
        if (!appointResponse.data.max_appointId) {
          console.error("No appointment found");
          return;
        }

        const latestAppointId = appointResponse.data.max_appointId;
        setAppointId(latestAppointId);
        console.log("Last appoint ID :", latestAppointId);

        // ดึงข้อมูล feedback โดยใช้ appointId ที่ได้มา
        const feedbackResponse = await AxiosClient.get(
          `/selectedFeedback/${latestAppointId}`
        );
        setHistory(feedbackResponse.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    fetchHistory();
  }, [username]);


  return (
    <div className="p-4">
    <div className="pt-6">
      {history.length > 0 && (
        <h3 className="pb-4 text-center">ประวัติการบันทึกผลข้างเคียง</h3>
      )}
      {history.length > 0 ? (
        [...history].reverse().map((record, index) => (
          <div 
          key={`${record.id}-${index}`} 
          className="mt-6 entry"
          > 
          {/* onClick={() => navigateDetailHistory(/DetailEffect/${record.appointId})} */}
            <div className="entry-left">
              <p className="text-sm text-center">บันทึกครั้งที่</p>
              <h2 className="text-4xl text-blue700">{history.length - index}</h2>
            </div>
            <div className="entry-right">
              <h3 className="text-md font-bold">
                วันที่ {formatThaiDate(record.sendAt)}
              </h3>
              <p className="text-sm whitespace-pre-wrap">
                {record.patientSideEffect}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">ไม่พบประวัติการบันทึกผลข้างเคียง</p>
      )}
    </div>
  </div>
  

  )
}

export default Effects