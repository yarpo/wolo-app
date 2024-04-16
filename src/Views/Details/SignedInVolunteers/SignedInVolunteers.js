import { useTranslation } from 'react-i18next';
import '../../../styles/signed-in-volunteers.scss';
import ShiftEntry from './ShiftEntry';
import { URLS } from '../../../config.js';

const SignedInVolunteers = ({ eventData }) => {
    const { t } = useTranslation();

    const handleListExport = () => {
        console.log(eventData)
        const token = localStorage.getItem('token');    
        const params = new URLSearchParams();
        params.append('id', eventData.id);
        const url = `${URLS.EVENT_USERS_PDF}?${params.toString()}`;
    
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'event_users.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch(error => {
            console.error('Error exporting PDF:', error);
        });
    };

    return (
        <div className='signed_in_volunteers'>
            <hr />
            <div className='signed_in_volunteers_content'>
                <h2 className='signed_in_volunteers_header'>{t('participants')}</h2>
                <button onClick={handleListExport} className='signed_in_volunteers_export_button'>{t('export list')}</button>
            </div>

            {eventData && eventData.shifts && eventData.shifts.map((shift, index) => (
            <ShiftEntry 
                key={index}
                id={shift.id}
                startTime={shift.startTime}
                endTime={shift.endTime}
                numVolunteers={shift.signedUp}
                maxVolunteers={shift.capacity}
            />
            ))}
        </div>
    )
}

export default SignedInVolunteers;