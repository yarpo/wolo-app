import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import EventCard from '../../Components/EventCard/EventCard';
import Filters from '../../Components/Filters/Filters';
import '../../styles/all-events.scss';

const AllEvents = () => {

  const [filteredEvents, setFilteredEvents] = useState([]);

  return (
    <div id="container">
      <Filters setFilteredEvents={setFilteredEvents} />

      {filteredEvents.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default AllEvents;