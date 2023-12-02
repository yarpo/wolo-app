import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import '../../styles/organiser-event-list-display.scss';


const OrganiserEventListDisplay = () => {
    const { i18n } = useTranslation();

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]);

    return (
        <div className='organiser_event_list_display_content'>
            <div className="column">
                Name
            </div>
            <div className="column">
                <p><strong>Volunteers:</strong> 3 / 8</p>
                <p>Address</p>
            </div>
            <div className="column">
                <p>Date</p>
                <p>Time</p>
            </div>
            <div className="column">
                <strong>Detials</strong>
            </div>
            <div className="column">
                <strong>Edit</strong>
            </div>
            <div className="column">
                <strong>Delete</strong>
            </div>
        </div>
    )
};

export default OrganiserEventListDisplay;