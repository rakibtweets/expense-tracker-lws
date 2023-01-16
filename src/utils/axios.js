import axios from 'axios';

const axiosIntance = axios.create({
  baseURL: 'http://localhost:900'
});

export default axiosIntance;
