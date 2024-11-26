import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://flowly-backend.up.railway.app', 
  timeout: 5000, 
});

export default apiClient;
