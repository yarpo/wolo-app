import axios from 'axios';

const axiosInstance  = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  }
});
const setAuthToken = (token) => {
  if (token) {axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;console.log(token);}
  else {delete axiosInstance.defaults.headers.common['Authorization'];}

};

/*const isLoggedIn = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await fetch('http://localhost:8080/auth/validateToken', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) return true;
    }
    catch (error) {
      console.error('Error validating token:', error);
    }
  }
  return false;
};*/

export { axiosInstance , setAuthToken };