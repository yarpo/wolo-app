import { useTranslation } from 'react-i18next';
import '../../styles/organiser-event-list-display.scss';

const OrganiserEventListDisplay = ({ event }) => {

    const { t } = useTranslation();
    
    return (
        <div className='organiser_event_list_display_content'>
            <div className="column">
                {event.name}
            </div>
            <div className="column">
                <p><strong>{t('volunteers')}:</strong> 3 / 8</p>
                <p>Address</p>
            </div>
            <div className="column">
                <p>Date</p>
                <p>Time</p>
            </div>
            <div className="column">
                <strong>{t('details')}</strong>
            </div>
            <div className="column">
                <strong>{t('edit')}</strong>
            </div>
            <div className="column">
                <strong>{t('delete')}</strong>
            </div>
        </div>
    )
};

export default OrganiserEventListDisplay;