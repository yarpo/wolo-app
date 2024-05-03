import { useTranslation } from 'react-i18next';
import '../../styles/organiser-event-list-display.scss';
import formatDate from '../../Utils/formatDate.js';
import { Link } from 'react-router-dom';
import { URLS } from '../../config.js';

const OrganiserEventListDisplay = ({ event, isArchived }) => {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language.toUpperCase();
    const eventName = `name${currentLang}`;
    
    return (
        <div className='organiser_event_list_display_content'>
            <div className="column">
                <Link to={`${URLS.DETAILS}/${event.id}`}>
                    {event[eventName]}
                </Link>
            </div>
            <div className="column">
                {formatDate(event.date)}
            </div>
            <div className="column">
                {event.city}
            </div>
            <div className="column">
                <strong>{t('details')}</strong>
            </div>
            {!isArchived && <div className="column">
                <strong>{t('edit')}</strong>
            </div>}
            {!isArchived && <div className="column">
                <strong>{t('delete')}</strong>
            </div>}
        </div>
    )
};

export default OrganiserEventListDisplay;