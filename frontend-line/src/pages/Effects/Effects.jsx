import React, { useState, useEffect } from 'react'
import { AxiosClient } from '../../apiClient';

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
  const HN = '000001';
  const appointId = 31;
  useEffect(() => {
    const fetchHistory = async () => {
        try {
            const response = await AxiosClient.get(`/selectedFeedback/${appointId}`);
            setHistory(response.data);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };
    fetchHistory();
}, [HN]);
  return (
<div className='p-4'>
      <div className="pt-6">
        <h3 className='pb-2'>ประวัติการบันทึกผลข้างเคียง</h3>
        {history.length > 0 ? (
          [...history].reverse().map((record, index) => (
            <div key={`${record.id}-${index}`} className="mt-4 box-sd">
              <div className="text-center text-blue700 shadow-sm">
                <p className='text-sm'>บันทึกครั้งที่</p>
                <h2 className='text-5xl'>{history.length - index}</h2>
              </div>
              <div>
                <h3 className='text-md'>
                  วันที่ {formatThaiDate(record.sendAt)}
                </h3>
                {/* <p>{record.patientSideEffect}</p> */}
              </div>
            </div>
          ))
        ) : (
          <p>ไม่พบประวัติการบันทึกผลข้างเคียง</p>
        )}
    </div>   
    </div>
  )
}

export default Effects