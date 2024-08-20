import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const FillResults = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [username, setUsername] = useState('');

  // COOKIES
  useEffect(() => {
    const user = Cookies.get('userName');
    if (user) {
      setUsername(user);
    }
  }, []);

  function handleUpload() {
    if (files.length === 0) {
      setMsg("No file selected");
      return;
    }

    const fd = new FormData();
    // ส่งไฟล์ทั้งหมดที่เลือก
    files.forEach((file) => {
      fd.append('images', file);
    });
    // ใช้ username เป็น IDcard
    fd.append('IDcard', username);

    setMsg("Uploading...");
    setProgress({ started: true, pc: 0 });

    axios.post('http://localhost:8080/uploadBloodResult', fd, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress({ started: true, pc: percentCompleted });
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      setMsg("Upload Successful");
      console.log(res.data);
    })
    .catch(err => {
      setMsg(`Upload failed: ${err.response ? err.response.data : err.message}`);
      console.log(err);
    });
  }

  return (
    <div>
      <h1>{username}</h1>
      <input
        type="file"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files))}
      />
      <button
        className='bg-blue-700 border-collapse hover:bg-blue-600 duration-300 hover:drop-shadow-lg w-11/12 m-2 p-3 rounded-full mt-20 text-white'
        onClick={handleUpload}
      >
        ส่งผลเลือด
      </button>
      {progress.started && <progress max="100" value={progress.pc}></progress>}
      {msg && <span>{msg}</span>}
    </div>
  );
}

export default FillResults;