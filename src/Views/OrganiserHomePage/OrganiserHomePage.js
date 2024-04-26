import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../../styles/organiser-home-page.scss';
import OrganiserEventListDisplay from '../../Components/OrganiserEventListDisplay/OrganiserEventListDisplay.js';
import WelcomingBanner from '../../Components/WelcomingBanner/WelcomingBanner.js';
import { URLS } from '../../config.js';
import fetchDataWithAuth from '../../Utils/fetchDataWithAuth.js';
import fetchUser from '../../Utils/fetchUser.js';

const OrganiserHomePage = () => {
    const { t } = useTranslation();
    const [organisationEventsCurrent, setOrganisationEventsCurrent] = useState([]);
    const [organisationEventsPast, setOrganisationEventsPast] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await fetchUser();
            if (userData && userData.organisationId) {
                fetchDataWithAuth(`${URLS.ORGANISATIONS}/${userData.organisationId}/currentEvents`, setOrganisationEventsCurrent, localStorage.getItem('token'));
                fetchDataWithAuth(`${URLS.ORGANISATIONS}/${userData.organisationId}/pastEvents`, setOrganisationEventsPast, localStorage.getItem('token'));
            }
        };
    
        fetchUserData();
    }, []);

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
                {organisationEventsCurrent && organisationEventsCurrent.map((event) => (
                    <OrganiserEventListDisplay
                        key={event.id}
                        event={event} />
                ))}
                <div id="show_all_button">
                    <strong>{t('showAll')}</strong>
                </div>
            </div>
            <div id="events_in_moderation">
                <strong>{t('eventsInModeration')} - Archived </strong>
                {organisationEventsPast && organisationEventsPast.map((event) => (
                    <OrganiserEventListDisplay
                        key={event.id}
                        event={event} />
                ))}
                <div id="show_all_button">
                    <strong>{t('showAll')}</strong>
                </div>
            </div>
        </div>
    )
};

export default OrganiserHomePage;