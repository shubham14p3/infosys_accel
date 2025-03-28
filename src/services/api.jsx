import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8086/api', // Replace with local API endpoint later will change to .ENV
  headers: {
    'Content-Type': 'application/json',
  },
});

// (Optional) Adding request interceptors here
api.interceptors.request.use(
  (config) => {
    // Will change to auth tokens if required
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
