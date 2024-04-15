import { useTranslation } from 'react-i18next';
import '../../../styles/your-event-volunteer.scss';
import { toast } from 'react-toastify';
import { URLS } from '../../../config.js';

const YourEventVolunteer = ({shiftId, userId, name, date, startTime, endTime, street, homeNum, city}) => {

    const { t } = useTranslation();
    const token = localStorage.getItem('token');
    const handleLeaveEvent = async (e) => {
        e.preventDefault();

            const params = new URLSearchParams();
            params.append('user', userId);
            params.append('shift', shiftId);
    
            try {
                const response = await fetch(`${URLS.REFUSE}?${params.toString()}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                });
        
                if (response.ok) {
                toast.success(`Successfully left the shift`);
                window.location.reload();
                } else {
                toast.error(`Failed to leave the shift`);
                }

            } catch (error) {
                toast.error('An unexpected error occurred while joining event. Please try again later');
            }
        }
    return (
        <form onSubmit={handleLeaveEvent}>
        <div className='your_event_volunteer'>
            <div className="your_event_volunteer_event_item" id="your_event_volunteer_event_name">
                {name}
            </div>
            <div className="your_event_volunteer_event_item" id="your_event_volunteer_event_date">
                {date}
            </div>
            <div className="your_event_volunteer_event_item"  id="your_event_volunteer_event_date">
                {startTime} - {endTime}
            </div>
            <div className="your_event_volunteer_event_item"  id="your_event_volunteer_event_address">
                {street} {homeNum}, {city}
            </div>

            <button id="your_event_volunteer_event_sign_off_button">{t('signOff')}</button>
        </div>
        </form>)
};

export default YourEventVolunteer;