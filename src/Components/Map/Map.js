import React from 'react';

const Map = ({ address }) => {
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(address)}`;

  return (
    <iframe
      src={googleMapsUrl}
      title="map"
      allowfullscreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default Map;