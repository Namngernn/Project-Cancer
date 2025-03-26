import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Weight = () => {
    const [weight, setWeight] = useState("");
    const [message, setMessage] = useState("");
    const [history, setHistory] = useState([]);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const user = Cookies.get('userName');
        if (user) {
          setUserName(user);
        }
      }, []);

    useEffect(() => {
        const user = Cookies.get('userName');
        if (user && user !== userName) {
          setUserName(user);
        }
      });

      useEffect(() => {
        const fetchHistory = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/weight-history/${userName}`, {
              params: { userName},
            });
            setHistory(response.data);
          } catch (error) {
            console.error("Error fetching history", error);
          }
        };
        if (userName) fetchHistory();
      }, [userName]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`http://localhost:3000/weight/${userName}`, {
            weight,
          });
      
          setMessage(response.data.message);
          setHistory([
            ...history,
            { weightId: response.data.weightId, numWeight: weight, createAt: new Date().toISOString() },
          ]);
        } catch (error) {
          console.error("Error:", error.response?.data || error.message); // ดู error จริง
          setMessage("เกิดข้อผิดพลาดในการบันทึกน้ำหนัก");
        }
      };

  return (
    <div className="pt-14 p-9 max-w-md mx-auto bg-white rounded-xl">
        <h2 className="text-lg font-semibold">HN : {userName}</h2>
        <h2 className="text-lg font-semibold">บันทึกน้ำหนักของท่าน</h2>
            <form onSubmit={handleSubmit} className="mt-4">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="กรอกน้ำหนัก (kg)"
                className="w-full p-2 border rounded"
                required
              />
              <button type="submit" className="mt-3 w-full bg-blue-500 text-white p-2 rounded">
                บันทึก
              </button>
            </form>
            {message && <p className="mt-2 text-green-600">{message}</p>}

        {/* แสดงประวัติน้ำหนัก */}
        <div className="mt-5">
          <h3 className="text-lg font-semibold">ประวัติการบันทึก</h3>
          <ul className="mt-2">
            {history.map((entry, index) => (
              <li key={index} className="p-2 border-b">
                {new Date(entry.createAt).toLocaleDateString()} - {entry.numWeight} kg
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
};
 
 export default Weight