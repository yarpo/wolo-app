import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const loadScript = (url, callback) => {
  const existingScript = document.getElementById('googleMaps');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = url;
    script.id = 'googleMaps';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (callback) callback();
    };
    document.body.appendChild(script);
  } else {
    if (callback) callback();
  }
};

const MapComponent = ({ addresses }) => {
  const { t } = useTranslation();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API key is missing');
      return;
    }

    loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=Function.prototype`, () => {
      setScriptLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!scriptLoaded) return;

    const initMap = () => {
      const mapDiv = document.getElementById('map');
      if (!mapDiv || !window.google) {
        console.error('Map initialization failed because Google Maps API or map div is missing');
        return;
      }

      const city = addresses.length > 0 ? addresses[0].city : 'Warszawa';
      const map = new window.google.maps.Map(mapDiv, {
        zoom: 12,
      });

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: city }, (results, status) => {
        if (status === 'OK') {
          map.setCenter(results[0].geometry.location);

          addresses.forEach((address) => {
            const fullAddress = `${address.street} ${address.homeNum}, ${address.city}`;
            const directions = address.directions || t('No directions available');
            geocoder.geocode({ address: fullAddress }, (results, status) => {
              if (status === 'OK') {
                const marker = new window.google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
                  title: fullAddress,
                });

                const infoWindow = new window.google.maps.InfoWindow({
                  content: `<div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; padding: 10px;">
                                <div style="margin-bottom: 10px; font-weight: bold;">${fullAddress}</div>
                                <div style="margin-bottom: 10px;">${directions}</div>
                                <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}" 
                                   target="_blank" 
                                   style="color: #1a73e8; text-decoration: none; font-weight: bold;">
                                   ${t('Directions')}
                                </a>
                              </div>`,
                });

                marker.addListener('click', () => {
                  infoWindow.open(map, marker);
                });
              } else {
                console.error(`Geocode was not successful for the following reason: ${status}`);
              }
            });
          });
        } else {
          console.error(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    };

    window.initMap = initMap;
    initMap();
  }, [scriptLoaded, addresses, t]);

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
};

export default MapComponent;