import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {
  VscArrowLeft,
  VscBrowser,
  VscOrganization,
  VscLocation,
} from 'react-icons/vsc';
import { BiTime, BiBorderAll } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import ShiftCheckbox from './ShiftCheckbox/ShiftCheckbox.js';
import '../../styles/details.scss';
import EventCard from '../EventCard/EventCard';

const Details = () => {
  
  const { t } = useTranslation();
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [organiserEvents, setOrganiserEvents] = useState([]);
  const [selectedShifts, setSelectedShifts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/events/${id}`);
        const data = await response.json();
        console.log(data);
        setEventData(data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEventData();
  }, [id]);

 useEffect(() => {
  if (eventData && eventData.organisationId) {
    fetch(`http://localhost:8080/organisations/${eventData.organisationId}/events`)
      .then(response => response.json())
      .then(data => setOrganiserEvents(data))
      .catch(error => console.error(error));
  }
}, [eventData, eventData?.organisationId]);

const handleShiftCheckboxChange = (shiftId, selected) => {
  if (selected){
    setSelectedShifts((allSelectedShifts) => [...allSelectedShifts, shiftId]);
    setSelectedShifts((allSelectedShifts) => [...allSelectedShifts, 2]);
  } else {
    setSelectedShifts((allSelectedShifts) => allSelectedShifts.filter((id) => id !== shiftId));
    setSelectedShifts((allSelectedShifts) => allSelectedShifts.filter((id) => id !== 2));
  }
}

const handleJoinEvent = async (e) => {
  e.preventDefault();

  if (selectedShifts.length === 0) {
    setErrorMessage('Please select at least one shift to sign in.');
    return;
  }
  setErrorMessage('');

  const userConfirmed = window.confirm('I agree to give my phone number to the organizer.');

  if (userConfirmed) {
    const userId = 1; // TODO - edit this when there is a working login system

    for (const shiftId of selectedShifts) {
      const requestData = {
        user: userId,
        shift: shiftId,
      };

      console.log(requestData);

      try {
        const response = await fetch('http://localhost:8080/events/join', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (response.ok) {
          console.log(`Successfully joined shift ${shiftId}`);
        } else {
          console.error(`Failed to join shift ${shiftId}`);
        }
      } catch (error) {
        console.error(`Error joining shift ${shiftId}:`, error);
      }
    }
  }
}

  if (!eventData) {
    return <div>Loading...</div>;
  }

  const {
    name,
    organisationName,
    description,
    street,
    addressDescription,
    homeNum,
    district,
    imageUrl,
    shifts,
    alt,
} = eventData;

return (
  <div className="details_container">
    <div id="column">
      <Link to="/events" id="back">
        <VscArrowLeft id="back_arrow" /> {t('back')}
      </Link> 
        <h1 id="title">{name}</h1>
        <ul id="volunteers_numbers">
          <li>
            <strong>{shifts[0].signedUp}</strong> {t('haveBeenSignedIn')}
          </li>
          <li>
            <strong>{shifts[0].capacity - shifts[0].signedUp}</strong> {t('moreIsNeeded')}
          </li>
        </ul>
        <ul id="information">
          <li>
            <VscBrowser id="icon" /> <strong>{t('date')}:</strong> {new Date(shifts[0].date[0], shifts[0].date[1] - 1, shifts[0].date[2]).toLocaleDateString()}
          </li>
          <li>
            <BiTime id="icon" /> <strong>{t('time')}:</strong> {`${shifts[0].startTime} - ${shifts[0].endTime}`}
          </li>
          <li>
            <BiBorderAll id="icon" /> <strong>{t('category')}:</strong>{' '}
              {eventData.categories.map((category, index) => (
              <span key={category.id}>{category.name}{index < eventData.categories.length - 1 ? ', ' : ''}</span>
            ))}
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
              <VscOrganization id="icon" /> <strong>{t('organizer')}:</strong>{' '}
              {organisationName}
            </li>
            <li>
              <VscLocation id="icon" /> <strong>{t('location')}:</strong>{' '}
              {street} {homeNum}, {addressDescription}, {district}
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

      <div id="column" className="signin">
        <form onSubmit={handleJoinEvent}>
          <div id="details_shift_checkboxes">
            {eventData && eventData.shifts && eventData.shifts.map((shift, index) => (
              <ShiftCheckbox 
                key={index}
                id={shift.id}
                startTime={shift.startTime}
                endTime={shift.endTime}
                numVolunteers={shift.signedUp}
                maxVolunteers={shift.capacity}
                onChange={(selected) => handleShiftCheckboxChange(shift.id, selected)}
              />
            ))}
          </div>
          <button type="submit" id="sign-in">
            {t('signIn')}
          </button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
      </div>
      
      <div id="details_more_events">
        <h2>{t('moreEventsFromThisOrganizer')}</h2>
        <div id="details_more_events_container">
          {organiserEvents.map(event => (
            <EventCard key={event.id} event={event} id='details_more_events_item' />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
