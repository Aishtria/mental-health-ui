import axios from 'axios';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL // This links to your .env
});
export default api;