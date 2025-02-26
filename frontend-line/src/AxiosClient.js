import axios from "axios";

const AxiosClient = axios.create({
  baseURL: "http://localhost:3000", // เปลี่ยนเป็น URL ของ backend ถ้า deploy จริง
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ถ้ามีการใช้ Cookies ต้องเปิดใช้งาน
});

export default AxiosClient;
