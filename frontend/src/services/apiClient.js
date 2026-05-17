import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Point to Node.js backend
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For cookies if needed, though we use localStorage token here
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('employeeToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle global errors (like 401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and force reload to clear state and redirect to login
      localStorage.removeItem('employeeToken');
      localStorage.removeItem('userProfile'); // also clear user data just in case
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
