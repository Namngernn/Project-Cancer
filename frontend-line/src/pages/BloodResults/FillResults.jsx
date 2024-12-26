import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

const FillResults = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // COOKIES
  useEffect(() => {
    const user = Cookies.get('userName');
    if (user) {
      setUsername(user);
    }
  }, []);

  function handleUpload() {
    if (files.length === 0) {
      setMsg("ยังไม่เลือกรูปภาพ");
      return;
    }

    const fd = new FormData();
    // ส่งไฟล์ทั้งหมดที่เลือก
    files.forEach((file) => {
      fd.append('images', file);
    });
    // ใช้ username เป็น IDcard
    fd.append('IDcard', username);

    setMsg("กำลังส่งผลเลือด...");
    setProgress({ started: true, pc: 0 });

    axios.post('http://localhost:3000/uploadBloodResult', fd, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress({ started: true, pc: percentCompleted });
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      setMsg("ส่งผลเลือดสำเร็จ");
      setTimeout(() => {
        navigate('/BloodResults/DisplayBloodResults');
      }, 2000);

      console.log(res.data);
    })
    .catch(err => {
      setMsg(`ส่งผลเลือดไม่สำเร็จ : ${err.response ? err.response.data : err.message}`);
      console.log(err);
    });
  }

  return (
  <div>
    {/* // <div className="flex items-center justify-center min-h-[calc(100vh-64px)]"> */}
    <div className="p-4">
      <div className="flex flex-col justify-center mb-6">
        <h2 className="text-lg font-bold pb-4">ส่งผลตรวจเลือด</h2>
        <label 
          htmlFor="file-upload" 
          className="cursor-pointer m-7 bg-blue-400 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-300"
        >
          เลือกรูปผลเลือด
        </label>
        <input
          type="file"
          id="file-upload"
          multiple
          className="hidden"
          onChange={(e) => setFiles(Array.from(e.target.files))}
        />
      </div>
      {files.length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">ไฟล์ที่เลือก:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {files.map((file, index) => (
              <li key={index} className="text-sm">{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-col items-center justify-center space-y-4 mb-6">
        {progress.started && (
          <progress 
            max="100" 
            value={progress.pc} 
            className="w-full h-4 rounded-md overflow-hidden"
          ></progress>
        )}
        {msg && (
          <div className="text-center text-gray-700">
            {msg}
          </div>
        )}
      </div>

      <div className="flex items-center justify-center">
        <button
          className="bt-blue text-white font-semibold py-2 px-6 rounded-md shadow hover:bg-blue-600 transition"
          onClick={handleUpload}
        >
          ส่งผลเลือด
        </button>
      </div>
    </div>
  </div>
  );
}

export default FillResults;