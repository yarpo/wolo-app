import { useTranslation } from 'react-i18next';
import '../../styles/organiser-event-list-display.scss';
import formatDate from '../../Utils/formatDate.js';

const OrganiserEventListDisplay = ({ event }) => {

    const { t } = useTranslation();

    console.log(event)
    
    return (
        <div className='organiser_event_list_display_content'>
            <div className="column">
                {event.name}
            </div>
            <div className="column">
                {formatDate(event.shifts[0].date)}
            </div>
            <div className="column">
                {event.city}
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