import axios from 'axios';


// axios instance for base url, 

const axiosIntance = axios.create({
  baseURL: 'http://localhost:900'
});

export default axiosIntance;
