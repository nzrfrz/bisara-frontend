import axios from "axios";

const LOCAL_END_POINT = import.meta.env.VITE_LOCAL_BASE_PATH;
// const SERVER_END_POINT = import.meta.env.VITE_SERVER_BASE_PATH;

export const publicRequest = axios.create({
  baseURL: LOCAL_END_POINT,
  withCredentials: true,
  timeout: 60000,
});

export const privateRequest = axios.create({
  baseURL: LOCAL_END_POINT,
  withCredentials: true,
  timeout: 60000,
});