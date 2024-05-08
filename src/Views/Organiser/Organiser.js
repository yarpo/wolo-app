import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {
  VscArrowLeft,
  VscMail,
  VscCallOutgoing,
  VscLocation,
} from 'react-icons/vsc';
import { AiOutlineInstagram, AiOutlineUpload, AiFillHeart, AiOutlineFacebook, AiOutlineYoutube } from "react-icons/ai";
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
    street,
    homeNum,
    logoUrl
  } = organiserData;

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
            <li>
              <VscCallOutgoing id="icon" /> <strong>{t('phoneNumber')}: </strong>{phoneNumber}
            </li>
            <li>
              <VscMail id="icon" /> <strong>{t('E-mail')}: </strong>{email}
            </li>
          </ul>
        </div>
      )}

      {organiserData && Object.keys(organiserData).length > 0 && (
        <div id="column">
          <div>
            <VscLocation id="icon" /><strong>{t('location')}:</strong>{" "} {street} {homeNum}
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d148784.80927349653!2d18.52522342001657!3d54.36117516765159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd731c14d4fa6f%3A0x9bb9fbf163b7be8d!2zR2RhxYRzaw!5e0!3m2!1spl!2spl!4v1685735055387!5m2!1spl!2spl"
            title="map of Gdansk"
            allowfullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className='icons_under_map'>
            <AiOutlineUpload id="icon" />
            <AiFillHeart id="icon" />
            <AiOutlineInstagram id="icon" />
            <AiOutlineFacebook id="icon" />
            <AiOutlineYoutube id="icon" />
          </div>
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