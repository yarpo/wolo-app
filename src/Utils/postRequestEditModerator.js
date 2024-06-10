import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const postRequestEditModerator = async (url, token, params, request, error) => {
    const response = await fetch(`${url}?${params.toString()}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        window.location.reload();
        request();
    } else {
        toast.error(`${error}`);
    }
};

export default postRequestEditModerator;