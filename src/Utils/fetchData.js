

const fetchData = async (url, setData, navigate) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      navigate('/events');
      return;
    }
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default fetchData;