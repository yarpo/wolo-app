import { useTranslation } from 'react-i18next';
import '../../../styles/your-event-volunteer.scss';

const YourEventVolunteer = ({name, date, startTime, endTime, street, homeNum, city}) => {

    const { t } = useTranslation();

    return (
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
            <div className="your_event_volunteer_event_item" id="your_event_volunteer_event_sign_off_button">
                <strong>{t('signOff')}</strong>
            </div>
        </div>
    )
};

export default YourEventVolunteer;