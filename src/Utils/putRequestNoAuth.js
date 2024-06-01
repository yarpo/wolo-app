import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const putRequestNoAuth = async (url, data, success, error, redirect) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    if (response.ok) {
        toast.success(`${success}`);
        if(redirect !== undefined){
        window.location.href = redirect;
        }
    } else {
        toast.error(`${error}`);
    }
};

export default putRequestNoAuth;
