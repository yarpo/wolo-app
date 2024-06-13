import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {
  VscArrowLeft,
  VscMail,
  VscCallOutgoing,
} from 'react-icons/vsc';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/organizer.scss';
import fetchData from '../../Utils/fetchData.js';
import { URLS } from '../../config.js';
import EventCard from '../../Components/EventCard/EventCard.js';
import { useNavigate } from 'react-router-dom';
import fetchDataWithNavigate from '../../Utils/fetchDataWithNavigate.js';

const Organiser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const organisationId = searchParams.get('organisationId');
  const { t } = useTranslation();
  const [organiserData, setOrganiserData] = useState([]);
  const [organiserEvents, setOrganiserEvents] = useState([]);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const organisationDescription = `description${localStorage.getItem('i18nextLng').toUpperCase()}`;

  useEffect(() => {
    const fetchDataForOrganiser = async () => {
      const url = `${URLS.ORGANISATIONS}/${organisationId}`;
      fetchDataWithNavigate(url, setOrganiserData, navigate);
    };

    if (organisationId) {
      fetchDataForOrganiser();
    }
  }, [organisationId, navigate]);

  useEffect(() => {
    const url = `${URLS.ORGANISATIONS}/${organisationId}/events`;
    fetchData(url, setOrganiserEvents);
  }, [organisationId]);

  const {
    name,
    email,
    phoneNumber,
    // street,
    // homeNum,
    logoUrl
  } = organiserData;

  const handleShowContactInfo = () => {
    setShowContactInfo(true);
  };

  return (
    <div className="organizer_container">
      {organiserData && Object.keys(organiserData).length > 0 && (
        <div id="column">
          <Link to="/events" id="back">
            <VscArrowLeft id="back_arrow" /> {t('back')}
          </Link>
          <div className='organizer_container_logo_text'>
            <h1 id="title">{name}</h1>
            <img src={logoUrl} alt="logo" className='organizer_container_logo' onError={(organiserData) => organiserData.target.style.display = 'none'} />
          </div>
        </div>
      )}
      {organiserData && Object.keys(organiserData).length > 0 && (
        <p id="description">
          {organiserData[organisationDescription]}
        </p>
      )}

      {organiserData && Object.keys(organiserData).length > 0 && (
        <div id="extra_information">
          <ul id="information">
            {!showContactInfo && (
              <li>
                <button className="confirm_button" onClick={handleShowContactInfo}>Show contact information</button>
              </li>
            )}
            {showContactInfo && (
              <>
                <li>
                  <VscCallOutgoing id="icon" /> <strong>{t('phoneNumber')}: </strong>{phoneNumber}
                </li>
                <li>
                  <VscMail id="icon" /> <strong>{t('E-mail')}: </strong>{email}
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {organiserData && Object.keys(organiserData).length > 0 && (
        <div id="organiser_more_events">
          <h2>{t('moreEventsFromThisOrganizer')}</h2>
          <div id="organiser_more_events_container">
            {organiserEvents.map(event => (
              <EventCard key={event.id} event={event} id='organiser_more_events_item' />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Organiser;
