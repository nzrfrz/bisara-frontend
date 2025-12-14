import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { getSecureItem, removeSecureItem } from '../secureStorage';

// const LOCAL_END_POINT = import.meta.env.VITE_LOCAL_BASE_PATH;
const SERVER_END_POINT = import.meta.env.VITE_SERVER_BASE_PATH;

export const publicRequest = axios.create({
  baseURL: SERVER_END_POINT,
  withCredentials: false,
  timeout: 60000,
});

export const privateRequest = axios.create({
  baseURL: SERVER_END_POINT,
  withCredentials: false,
  timeout: 60000,
});

privateRequest.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    const existingAuth = config.headers?.Authorization ?? config.headers?.Authorization;
    if (!existingAuth) {
      const getItem = getSecureItem() as UserCredential
      const token = getItem?.accessToken;
      // const token = JSON.parse(getItem as string).accessToken
      
      if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
);

function isTOkenExpiredResponse(error: AxiosError<any>): boolean {
  const status = error.response?.status;

  if (status === 401) return true;

  const data = error.response?.data;
  if (data && typeof data === "object") {
    const msg = (data.message || data.detail || data.error) as string | undefined;
    if (msg && /token|expired|unauthoriz/i.test(msg)) return true;
  }

  return false;
}

privateRequest.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    try {
      if (isTOkenExpiredResponse(error)) removeSecureItem()
    } catch (err) {
      console.error("axios interceptor cleanup error:", error);      
    }
    return Promise.reject(error)
  }
);