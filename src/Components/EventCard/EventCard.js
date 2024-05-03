import React from 'react';
import { useTranslation } from 'react-i18next';
import { VscLocation, VscBrowser, VscOrganization } from 'react-icons/vsc';
import formatDate from '../../Utils/formatDate';
import { Link } from 'react-router-dom';
import '../../styles/event-card.scss';

const EventCard = ({ event }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.toUpperCase();
  const eventName = `name${currentLang}`;

  return (
    <Link to={`/details/${event.id}`} style={{ textDecoration: 'none' }}>
      <div className="card">
        <div id="card-img">
          <img src={event.imageUrl} alt={event.name}  onError={(event) => event.target.style.display = 'none'}/>
        </div>
        <div id="information">
          <h2>{event[eventName]}</h2>
          <ul>
            <li>
              <VscLocation className="icon" /> <strong>{t('location')}:</strong>{' '}
              {event.city}
            </li>
            <li>
              <VscBrowser className="icon" /> <strong>{t('date')}:</strong> {' '}
              {formatDate(event.shifts[0].date)}
            </li>
            <li>
              <VscOrganization className="icon" />{' '}
              <strong>{t('organizedBy')}:</strong> {event.organisation}
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;