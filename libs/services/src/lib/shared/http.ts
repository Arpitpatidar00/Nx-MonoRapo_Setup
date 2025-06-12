import axios, { AxiosError } from 'axios';

const baseURL =
  import.meta.env.VITE_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export const http = axios.create({
  baseURL,
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (axios.isCancel(error)) {
      if (typeof window !== 'undefined') {
        console.log('Request canceled', error.message);
      }
    }

    return Promise.reject(error);
  },
);
