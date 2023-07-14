import React, {  useState,useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-datepicker/dist/react-datepicker.css';
import EventCard from '../EventCard/EventCard';
import Filters from '../Filters/Filters';
import '../../styles/all-events.scss';

const AllEvents = () => {
  const { i18n } = useTranslation();
  const [filteredEvents, setFilteredEvents] = useState([]);


  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  return (
    <div id="container">
      <Filters setFilteredEvents={setFilteredEvents} />

      {/* Generate event cards */}
      {filteredEvents.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default AllEvents;