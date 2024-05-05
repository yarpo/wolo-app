import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const deleteRequest = async (url, token, successMessage, errorMessage) => {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            toast.success(successMessage);
            window.location.reload();
        } else {
            throw new Error(errorMessage);
        }
    } catch (error) {
        toast.error(error.message || errorMessage);
    }
};

export default deleteRequest;