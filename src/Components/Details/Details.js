import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {
  VscArrowLeft,
  VscBrowser,
  VscOrganization,
  VscLocation,
} from 'react-icons/vsc';
import { BiBorderAll } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import '../../styles/details.scss';
import EventCard from '../EventCard/EventCard';
import 'react-toastify/dist/ReactToastify.css';
import fetchData from '../../Utils/fetchData.js';
import formatDate from '../../Utils/formatDate.js';
import SignedInVolunteers from './SignedInVolunteers/SignedInVolunteers.js';
import { URLS } from '../../config.js'
import ShiftCard from './ShiftCard/ShiftCard.js';

const Details = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [organiserEvents, setOrganiserEvents] = useState([]);

  useEffect(() => {
      const url = `${URLS.EVENTS}/${id}`;
      fetchData(url, setEventData);
  }, [id]);

  useEffect(() => {
      if (eventData && eventData.organisationId) {
          const url = `${URLS.ORGANISATIONS}/${eventData.organisationId}/events`;
          fetchData(url, setOrganiserEvents);
      }
  }, [eventData, eventData?.organisationId]);

  if (!eventData) {
    return <div>{t('loading')}...</div>;
  }

  const {
    name,
    organisationName,
    description,
    city,
    imageUrl,
    shifts,
    alt,
    categories
} = eventData;

return (
  <div className="details_container">
    <div id="column">
      <Link to="/events" id="back">
        <VscArrowLeft id="back_arrow" /> {t('back')}
      </Link> 
        <h1 id="title">{name}</h1>
        <ul id="information">
          <li>
            <VscBrowser id="icon" /> <strong>{t('date')}:</strong> {formatDate(shifts[0].date)}
          </li>
          <li>
            <BiBorderAll id="icon" /> <strong>{t('category')}:</strong>{' '}
            {categories}
            {console.log(categories)}
          </li>
          <li>
              <VscOrganization id="icon" /> <strong>{t('organizer')}:</strong>{' '}
              <Link to={`/organiser?organisationId=${eventData.organisationId}`}> {organisationName} </Link>
          </li>
        </ul>
      </div>

      <div className="details_photo">
        <img src={imageUrl} alt={alt} onError={(event) => event.target.style.display = 'none'} />
      </div>

    <p id="description">{description}</p>

      <div id="extra_information">
        <ul id="information">
            <li>
              <VscLocation id="icon" /> <strong>{t('location')}:</strong>{' '}
              {city}
            </li>
        </ul>
      </div>

      <div id="column">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d148784.80927349653!2d18.52522342001657!3d54.36117516765159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd731c14d4fa6f%3A0x9bb9fbf163b7be8d!2zR2RhxYRzaw!5e0!3m2!1spl!2spl!4v1685735055387!5m2!1spl!2spl"
        title="map of Gdansk"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      </div>

      {eventData.shifts.map(shift => (
        <ShiftCard key={shift.id} shift={shift} id='details_more_events_item' />
      ))}
      
      <div id="details_more_events">
        <h2>{t('moreEventsFromThisOrganizer')}</h2>
        <div id="details_more_events_container">
          {organiserEvents.map(event => (
            <EventCard key={event.id} event={event} id='details_more_events_item' />
          ))}
        </div>
      </div>

      <SignedInVolunteers />
    </div>
  );
};

export default Details;
