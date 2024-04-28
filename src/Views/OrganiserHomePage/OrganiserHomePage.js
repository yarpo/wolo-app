import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import '../../styles/organiser-home-page.scss';
import OrganiserEventListDisplay from '../../Components/OrganiserEventListDisplay/OrganiserEventListDisplay.js';
import WelcomingBanner from '../../Components/WelcomingBanner/WelcomingBanner.js';

const OrganiserHomePage = () => {

    const { t } = useTranslation();

    return (
        <div className='organiser_home_page_container'>
            <div id="organiser_home_page_background_photo">
                <WelcomingBanner isOrganizerPage={ true }/>
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