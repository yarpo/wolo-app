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
    const [organisationName, setOrganisationName] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await fetchUser();
            if (userData && userData.organisationId) {
                setOrganisationName(userData.organisationName)
                fetchDataWithAuth(`${URLS.ORGANISATIONS_EVENTS_CURRENT}/${userData.organisationId}`, setOrganisationEventsCurrent, localStorage.getItem('token'));
                fetchDataWithAuth(`${URLS.ORGANISATIONS_EVENTS_PAST}/${userData.organisationId}`, setOrganisationEventsPast, localStorage.getItem('token'));
            }
        };
    
        fetchUserData();
    }, []);

    return (
        <div className='organiser_home_page_container'>
            <div id="organiser_home_page_background_photo">
                <WelcomingBanner isOrganizerPage={ true } organisationName={organisationName}/>
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
                <h2>{t('yourEvents')}</h2>
                {organisationEventsCurrent.length === 0 ? (
                    <p id='organiser_home_page_text'>{t('noCurrentEventsOrganisation')}</p>
                ) : (
                    organisationEventsCurrent.map((event) => (
                        <OrganiserEventListDisplay
                        key={event.id}
                        event={event}
                        isArchived={false} />
                        ))
                    )}
            </div>
            <div id="events_in_moderation">
                <h2>{t('yourPastEvents')}</h2>
                {organisationEventsPast.length === 0 ? (
                    <p id='organiser_home_page_text'>{t('noPastEventsOrganisation')}</p>
                ) : (
                    organisationEventsPast.map((event) => (
                        <OrganiserEventListDisplay
                        key={event.id}
                        event={event}
                        isArchived={true} />
                        ))
                    )}
            </div>
        </div>
    )
};

export default OrganiserHomePage;