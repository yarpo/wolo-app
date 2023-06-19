import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../../styles/navbar.scss';
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

  const handleLanguageChange = language => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <>
      <nav>
        <Link to="/" id="logo">
          <img src={logo} alt="Logo" />
        </Link>
        <ul id="navbar" className={clicked ? '#navbar active' : 'navbar'}>
          <li>
            <Link to="/events">{t('allEvents')}</Link>
          </li>
          <li>
            <Link to="/calendar">{t('calendar')}</Link>
          </li>
          <li>
            <Link to="/volunteers">{t('forVolunteers')}</Link>
          </li>
          <li>
            <Link to="/needyou">{t('theyNeedYou')}</Link>
          </li>
          <li>
            <select
              id="langauges-select"
              onChange={e => handleLanguageChange(e.target.value)}
              defaultValue={i18n.language}
            >
              <option value="en">English</option>
              <option value="pl">Polish</option>
              <option value="ua">Ukrainian</option>
              <option value="ru">Russian</option>
            </select>
          </li>
          <li>
            <Link to="/login">{t('login')}</Link>
          </li>
        </ul>
        <button
          id="mobile"
          onClick={handleClick}
          onKeyPress={handleKeyPress}
          tabIndex={0}
          aria-label="Toggle Menu"
        >
          <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>
      </nav>
    </>
  );
};

export default Navbar;
