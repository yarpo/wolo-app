import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fetchData = async (url, setData) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    toast.error('An unexpected error occurred while gathering data. Please try again later');
  }
};

export default fetchData;