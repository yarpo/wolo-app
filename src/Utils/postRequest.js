import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const postRequest = async (url, token, params, success, error) => {
    const response = await fetch(`${url}?${params.toString()}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        toast.success(`${success}`);
        window.location.reload();
    } else {
        toast.error(`${error}`);
    }
};

export default postRequest;