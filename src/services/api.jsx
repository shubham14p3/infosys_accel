import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-base-url.com/api', // Replace with your API endpoint
  headers: {
    'Content-Type': 'application/json',
  },
});

// (Optional) Add request interceptors here
api.interceptors.request.use(
  (config) => {
    // For example: attach auth tokens if required
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
