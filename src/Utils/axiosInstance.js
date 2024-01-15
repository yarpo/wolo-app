import axios from 'axios';

const axiosInstance  = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});
const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

/*const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return !!token;
};*/

export { axiosInstance , setAuthToken };
