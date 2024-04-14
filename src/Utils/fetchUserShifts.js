import { URLS } from "../config";
import { toast } from 'react-toastify';

const fetchUserShifts = async (userId) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    try {
        const response = await fetch(`${URLS.USERS}/${userId}/shifts`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user shifts');
        }

        const data = await response.json();
        const shiftIds = data.map(shift => shift.shiftId);
        return shiftIds;
    } catch (error) {
        toast.error(`Failed to fetch user shifts. Please try again later`);
        return null; 
    }
};

export default fetchUserShifts;
