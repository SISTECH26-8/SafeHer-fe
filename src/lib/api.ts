import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://safeher-be.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menyematkan token JWT ke setiap request
api.interceptors.request.use((config) => {
  const token = Cookies.get('token'); // Ambil token dari cookie
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor untuk menangani error respons
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Jika token expired atau tidak valid, hapus cookie (opsional bisa di-redirect)
      Cookies.remove('token');
      // window.location.href = '/login'; // Hapus komentar ini jika ingin otomatis redirect
    }
    return Promise.reject(error);
  }
);

export default api;
