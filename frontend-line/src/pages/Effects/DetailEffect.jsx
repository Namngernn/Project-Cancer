import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AxiosClient from "../../AxiosClient";

const thaiMonthNames = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];

const formatThaiDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear() + 543; // ปีพ.ศ.
  const month = thaiMonthNames[date.getMonth()];
  const day = date.getDate();
  return `${day} ${month} ${year}`;
};

// หน้า "รายละเอียดผลข้างเคียง"
const DetailEffect = () => {
  const { feedbackId } = useParams(); // ดึง feedbackId จาก URL
  const [record, setRecord] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await AxiosClient.get(`/selectedFeedback/${feedbackId}`);
        if (response.data) {
          setRecord(response.data[0]); // ใช้ข้อมูลที่ดึงมา (assuming only one record per feedbackId)
        } else {
          console.error("No record found");
        }
      } catch (error) {
        console.error("Error fetching record:", error);
      }
    };

    if (feedbackId) {
      fetchRecord();
    }
  }, [feedbackId]);

  if (!record) return <p>กำลังโหลดข้อมูล...</p>;

  return (
    <div className="flex justify-center items-center bg-gray-100 py-10 px-4">
      <div className="w-full sm:w-96 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-center text-blue-600 pb-4">ประวัติการบันทึกผลข้างเคียง</h3>
          
          {record ? (
            <>
              <div className="text-center mb-4">
                <h5 className="text-xl font-bold">การนัดหมายครั้งที่ {record.appointId}</h5>
                <p className="text-lg text-gray-600">บันทึกเมื่อวันที่ {formatThaiDate(record.sendAt)}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold text-lg text-gray-800 mb-2">ผลข้างเคียง:</h5>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{record.patientSideEffect}</p>
              </div>
            </>
          ) : (
            <p className="text-center text-red-500">ไม่พบข้อมูลการบันทึกผลข้างเคียง</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailEffect;
