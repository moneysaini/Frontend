import axios from 'axios';
import { API_BASE_URL } from '../constants/endpoints';
// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL, // Example base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Sending request to ${config.url}`);
    // Example: Attach an authorization token
    config.headers.Authorization = `Bearer ${process.env.ACCESS_TOKEN}`;
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log(`Received response with status ${response.status}`);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
