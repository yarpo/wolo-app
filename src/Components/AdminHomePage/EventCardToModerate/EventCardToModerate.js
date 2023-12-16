import React from 'react';
import { useTranslation } from 'react-i18next';
import { VscLocation, VscBrowser, VscOrganization } from 'react-icons/vsc';
import { BiTime } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import '../../../styles/event-card-to-moderate.scss';

const EventCardToModerate = () => {
  const { t } = useTranslation();

  return (
    <Link to="/details" style={{ textDecoration: 'none' }}>
      <div id="event_card_to_moderate">
        <div id="event_card_to_moderate_card_img">
            <img alt="img"/>
        </div>
        <div id="event_card_to_moderate_information">
          <h2 id="event_card_to_moderate_title">Title title title title title title title</h2>
          <ul>
            <li>
              <VscLocation className="event_card_to_moderate_icon" /> <strong>{t('location')}:</strong>{' '}
              
            </li>
            <li>
              <VscBrowser className="event_card_to_moderate_icon" /> <strong>{t('date')}:</strong>{' '}
              
            </li>
            <li>
              <BiTime className="event_card_to_moderate_icon" /> <strong>{t('time')}:</strong>{' '}
              
            </li>
            <li>
              <VscOrganization className="event_card_to_moderate_icon" />{' '}
              <strong>{t('organizedBy')}:</strong>
            </li>
            <li>
              <strong>{t('needed')}:</strong>
            </li>
            <li>
              <strong>{t('signedIn')}:</strong>
            </li>
          </ul>
            <div id="event_card_to_moderate_button">
                Accept
            </div>
            <div id="event_card_to_moderate_button">
                Discard
            </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCardToModerate;