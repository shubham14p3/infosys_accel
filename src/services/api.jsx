import axios from 'axios';

// Helper function to determine which credentials to use
const getAuthCredentials = (url) => {
  // Use admin credentials for delete operations
  if (url.includes('delete') || url.toLowerCase().includes('delete')) {
    return {
      username: 'admin',
      password: 'adminpass',
    };
  }
  // Use regular user credentials for all other operations
  return {
    username: 'user',
    password: 'password',
  };
};

// Create API instance without baseURL as we'll rely on the proxy
const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adding request interceptors to handle authentication
api.interceptors.request.use(
  (config) => {
    // Get the appropriate credentials based on the endpoint
    const credentials = getAuthCredentials(config.url);
    
    // Create the auth header (base64 encoded username:password)
    const auth = btoa(`${credentials.username}:${credentials.password}`);
    config.headers.Authorization = `Basic ${auth}`;
    
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
