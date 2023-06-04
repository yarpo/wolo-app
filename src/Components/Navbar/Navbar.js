import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Navbar.css';
import logo from '../../images/logo.svg';


const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <nav>
        <a href="/#" id="logo"><img src={logo} alt="Logo" /></a>
        <ul id="navbar" className={clicked ? "#navbar active" : "navbar"}>
          <li><a href="/#">{t('allEvents')}</a></li>
          <li><a href="/#">{t('calendar')}</a></li>
          <li><a href="/#">{t('forVolunteers')}</a></li>
          <li><a href="/#">{t('theyNeedYou')}</a></li>
          <li>
            <select
              id="langauges-select"
              onChange={(e) => handleLanguageChange(e.target.value)}
              defaultValue={i18n.language}
            >
              <option value="en">English</option>
              <option value="pl">Polish</option>
              <option value="ua">Ukrainian</option>
              <option value="ru">Russian</option>
            </select>
          </li>
          <li><a href="/#">{t('login')}</a></li>
        </ul>
        <div id="mobile" onClick={handleClick}>
          <i
            id="bar"
            className={clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
