import axios from 'axios';

const api = axios.create({
  // Vite uses import.meta.env, not process.env
  baseURL: import.meta.env.VITE_API_URL 
});

export default api;