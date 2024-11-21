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
    // <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
    <div className="">
      {/* <h1>{username}</h1> */}
      <div className="flex items-center justify-center m-4">
        <label for="file-upload" class="custom-file-upload">
          เลือกรูปผลเลือด
        </label>
        <input
          type="file"
          id="file-upload"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
        />
      </div>

      <div className="flex items-center justify-center flex-col">
        <div>{progress.started && <progress max="100" value={progress.pc}></progress>}</div>
        <div>{msg && <div>{msg}</div>}</div>
      </div>


      <div className="flex items-center justify-center">
        <button
          className=' bg-blue-700 border-collapse hover:bg-blue-600 duration-300 hover:drop-shadow-lg w-11/12 m-2 p-3 rounded-full text-white'
          onClick={handleUpload}
        >
          ส่งผลเลือด
        </button>
      </div>
    </div>
    // </div>
  );
}

export default FillResults;