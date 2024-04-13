import { URLS } from "../config";
import { toast } from 'react-toastify';

const fetchUserId = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null; 
    }

    try {
        const response = await fetch(URLS.USER, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        return data.id;
    } catch (error) {
        console.error('Error fetching user ID:', error);
        toast.error(`Failed to recognise the user. Please try again later`);
        return null; 
    }
};

export default fetchUserId;
