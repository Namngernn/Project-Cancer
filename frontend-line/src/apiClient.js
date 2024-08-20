import axios from "axios";

export const AxiosClient = axios.create({
    baseURL: "http://localhost:8080/",
  });