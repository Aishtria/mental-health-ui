import axios from 'axios';

const api = axios.create({
  // Replace the old one with this:
  baseURL: 'https://mood-tracker-api-production-7fd6.up.railway.app' 
});

export default api;