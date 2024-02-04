import React from 'react';
import { useTranslation } from 'react-i18next';
import { VscLocation, VscBrowser, VscOrganization } from 'react-icons/vsc';
import { BiTime } from 'react-icons/bi';
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
              <VscBrowser className="icon" /> <strong>{t('date')}:</strong>{' '}
              {event.shifts[0].date.join('/')}
            </li>
            <li>
              <BiTime className="icon" /> <strong>{t('time')}:</strong>{' '}
              {event.shifts[0].startTime.join(':')} - {event.shifts[0].endTime.join(':')}
            </li>
            <li>
              <VscOrganization className="icon" />{' '}
              <strong>{t('organizedBy')}:</strong> {event.organisation}
            </li>
            <li>
              <strong>{t('needed')}:</strong> {event.shifts[0].capacity}
            </li>
            <li>
              <strong>{t('signedIn')}:</strong> {event.shifts[0].signedUp}
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;