import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const MapComponent = ({ addresses }) => {
    const { t } = useTranslation();

    useEffect(() => {
        const city = addresses.length > 0 ? addresses[0].city : 'Warszawa';
        const map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 12,
        });

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: city }, (results, status) => {
            if (status === 'OK') {
                map.setCenter(results[0].geometry.location);

                addresses.forEach(address => {
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
                                          </div>`
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
    }, [addresses, t]);

    return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
};

export default MapComponent;