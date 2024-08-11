import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios';
import { AxiosClient } from "../../../src/apiClient";
//หน้าประวัติผลข้างเคียง
const Effects = () => {
  const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await  AxiosClient.get(`/feedback/${hn}`);
                setHistory(response.data);
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        fetchHistory();
    }, []);
  return (
    <div className='p-4'>
    
      <div className="pt-6">
      <h3 className='pb-2'>ประวัติการบันทึกผลข้างเคียง</h3>
        {history.length > 0 ? (
          history.map((record, index) => (
            <div key={record.id} className="box-sd">
              <div className="text-center text-blue700 shadow-sm">
                <p className='text-sm'>บันทึกครั้งที่</p>
                <h2 className='text-5xl'>{index + 1}</h2>
              </div>
              <div>
                <h3 className='text-md'>
                  วันที่ {new Date(record.record_date).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h3>
                <p>{record.patientSideEffect}</p>
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