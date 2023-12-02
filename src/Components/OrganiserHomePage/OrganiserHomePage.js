import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import '../../styles/organiser-home-page.scss';
import OrganiserEventListDisplay from '../OrganiserEventListDisplay/OrganiserEventListDisplay.js';

const OrganiserHomePage = () => {
    const { i18n } = useTranslation();

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
                        <h1>Hello user, are you ready to change the world?</h1>
                    </div>
                    <div>
                        <h2>Your organisation: schronisko przyjazna łapa</h2>
                    </div>
                </div>
            </div>
            <div id="button_div">
                <form>
                    <div id="button_create_event">
                        Create new Event
                    </div>
                </form>
            </div>
            <div id="ongoing_events">
                <strong>Your ongoing events</strong>
                <OrganiserEventListDisplay />
                <OrganiserEventListDisplay />
            </div>
            <div id="events_in_moderation">
                <strong>Events in moderation</strong>
                <OrganiserEventListDisplay />
            </div>
        </div>
    )
};

export default OrganiserHomePage;
