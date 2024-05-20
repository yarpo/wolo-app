import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const putRequest = async (url, token, data, success, error, redirect) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if (response.ok) {
        toast.success(`${success}`);
        window.location.reload();
        if(redirect !== undefined){
        window.location.href = redirect;
        }
    } else {
        toast.error(`${error}`);
    }
};

export default putRequest;
