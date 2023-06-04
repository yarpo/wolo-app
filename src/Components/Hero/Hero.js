import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';

import './Hero.css';

const Hero = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);
  const [isOpen, setIsOpen] = useState(false);

  const locations = ['Zaspa', 'Chełm', 'Wrzeszcz'];



  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  return (

    <form>
      <div id="mainContainer">
        <div id="background">
          <div id="containerHero">
            <h1>{t('welcome')}</h1>

          </div>

          <div id="subtext">
            <h2><a href='#'>{t('signInToday')}</a> {t('or')} <a href='#'>{t('findEvent')}</a></h2>
          </div>
        </div>

        <div id="row">
          <DatePicker
            id="datePicker"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a date"
          />
          <select id="selectInput">
            <option value="" disabled selected>Location</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div id="button">
        <input type="submit" value={t('MainSearch')} />
      </div>


    </form>







  )
};

export default Hero;