import React from 'react';
import { useTranslation } from 'react-i18next';
import { VscLocation, VscBrowser, VscOrganization, VscAccount } from 'react-icons/vsc';
import formatDate from '../../Utils/formatDate';
import { Link } from 'react-router-dom';
import '../../styles/event-card.scss';

const EventCard = ({ event }) => {
  
  const { t } = useTranslation();

  return (
    <Link to={`/details/${event.id}`} style={{ textDecoration: 'none' }}>
      <div className="card">
        <div id="card-img">
          <img src={event.imageUrl} alt={event.name}  onError={(event) => event.target.style.display = 'none'}/>
        </div>
        <div id="information">
          <h2>{event.name}</h2>
          <ul>
            <li>
              <VscLocation className="icon" /> <strong>{t('location')}:</strong>{' '}
              {event.street} {event.homeNum}, {event.district}, {event.city}
            </li>
            <li>
              <VscBrowser className="icon" /> <strong>{t('date')}:</strong> {' '}
              {formatDate(new Date(event.shifts[0].date).toLocaleDateString())}
            </li>
            <li>
              <VscOrganization className="icon" />{' '}
              <strong>{t('organizedBy')}:</strong> {event.organisation}
            </li>
            <li>
              <VscAccount  className="icon"/>{' '}
              <strong>{t('volunteers')}:</strong> {event.shifts[0].signedUp} / {event.shifts[0].capacity}
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;