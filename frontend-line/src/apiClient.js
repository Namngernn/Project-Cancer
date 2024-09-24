import axios from 'axios';

export const AxiosClient = axios.create({ // ใช้ named export
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});