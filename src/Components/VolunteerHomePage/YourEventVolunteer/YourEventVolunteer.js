import { useTranslation } from 'react-i18next';
import '../../../styles/your-event-volunteer.scss';

const YourEventVolunteer = () => {

    const { t } = useTranslation();

    return (
        <div className='your_event_volunteer'>
            <div className="your_event_volunteer_event_item" id="your_event_volunteer_event_name">
                Event 1
            </div>
            <div className="your_event_volunteer_event_item" id="your_event_volunteer_event_date">
                01.01.2024
            </div>
            <div className="your_event_volunteer_event_item"  id="your_event_volunteer_event_date">
                14:00-18:00
            </div>
            <div className="your_event_volunteer_event_item"  id="your_event_volunteer_event_address">
                Mickiewicza 23 - Przedszkole Szeroki Uśmiech 
            </div>
            <div className="your_event_volunteer_event_item" id="your_event_volunteer_event_sign_off_button">
                <strong>{t('signOff')}</strong>
            </div>
        </div>
    )
};

export default YourEventVolunteer;