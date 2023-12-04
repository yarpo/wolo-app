import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import '../../styles/organiser-home-page.scss';
import OrganiserEventListDisplay from '../OrganiserEventListDisplay/OrganiserEventListDisplay.js';

const OrganiserHomePage = () => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]);

    return (
        <div className='organiser_home_page_container'>
            <div id="background_photo">
                <div id="welcome_text">
                    <div>
                        <h1>{t('hello')} user. {t('welcome')}</h1>
                    </div>
                    <div>
                        <h2>{t('yourOrganisation')}: schronisko przyjazna łapa</h2>
                    </div>
                </div>
            </div>
            <div id="button_div">
                <form>
                    <Link to="/createEvent">
                        <div id="button_create_event">
                            {t('createNewEvent')}
                        </div>
                    </Link>
                </form>
            </div>
            <div id="ongoing_events">
                <strong>{t('yourOngoingEvents')}</strong>
                <OrganiserEventListDisplay />
                <OrganiserEventListDisplay />
                <div id="show_all_button">
                    <strong>{t('showAll')}</strong>
                </div>
            </div>
            <div id="events_in_moderation">
                <strong>{t('eventsInModeration')}</strong>
                <OrganiserEventListDisplay />
                <div id="show_all_button">
                    <strong>{t('showAll')}</strong>
                </div>
            </div>
        </div>
    )
};

export default OrganiserHomePage;
