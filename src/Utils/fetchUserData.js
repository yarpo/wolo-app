import { URLS } from "../config";
import { toast } from 'react-toastify';

const fetchUserData = async ( field ) => {
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
        if (Object.prototype.hasOwnProperty.call(data, field)) {
            return data[field]; 
        } else {
            throw new Error(`Field '${field}' not found in user data`);
        }
    } catch (error) {
        toast.error(`Failed to recognise the user. Please try again later`);
        return null; 
    }
};

export default fetchUserData;
