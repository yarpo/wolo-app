const fetchDataWithAuth = async (url, setData, jwtToken) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      }
    });
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default fetchDataWithAuth;