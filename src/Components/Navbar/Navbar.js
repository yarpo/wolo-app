import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/navbar.scss';
import logo from '../../images/logo.svg';
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { FaRegUserCircle } from 'react-icons/fa';
import fetchUser from '../../Utils/fetchUser';

const Navbar = () => {
  const [role, setRole] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'))
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchUser().then(data => {
      if (data) {
        setRole(data.roles);
      }
    })
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

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

const toggleDropdown = () => {
  setShowDropdown(prevShowDropdown => !prevShowDropdown);
};

function handleLogout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  navigate('/login');
}

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
          {role && role.includes('USER') && <li>
            <Link to="/calendar">{t('calendar')}</Link>
          </li>}
          <li>
            <Link to="/for-volunteers">{t('forVolunteers')}</Link>
          </li>
          <li>
            <Link to="/they-need-you">{t('theyNeedYou')}</Link>
          </li>
          <li>
            <select
              id="languages-select"
              onChange={e => handleLanguageChange(e.target.value)}
              defaultValue={i18n.language}
              data-testid="languages-select"
            >
              <option value="en" className='language-select-language'>English</option>
              <option value="pl" className='language-select-language'>Polski</option>
              <option value="ua" className='language-select-language'>Українська</option>
              <option value="ru" className='language-select-language'>Русский</option>
            </select>
          </li>
          <li className="navbar-dropdown">
            {user ? (
              <>
                <button 
                  className="navbar-dropdown-button" 
                  onClick={toggleDropdown}
                >
              <div className="user-info">
                <FaRegUserCircle className="user-icon" />
                <span>{user.email}</span>
                <div className="dropdown-icon">
                  {showDropdown ? <HiChevronUp size={25}/> : <HiChevronDown size={25}/>}
                </div>
              </div>
                </button>
                {showDropdown && (
                  <ul ref={dropdownRef} className="navbar-dropdown-menu">
                    {role && role.includes('USER') && <li id="navbar-dropdown-li"><Link to='/volunteer-home-page'>{t('volunteerPage')}</Link></li>}
                    {role && role.includes('ADMIN') && <li id="navbar-dropdown-li"><Link to='/admin-home-page'>{t('adminPage')}</Link></li>}
                    {role && role.includes('MODERATOR') && <li id="navbar-dropdown-li"><Link to='/organisation-home-page'>{t('organiserPage')}</Link></li>}
                    <li id="navbar-dropdown-li"><Link to="/settings">{t('settings')}</Link></li>
                    {role && role.includes('MODERATOR') && <li id="navbar-dropdown-li"><Link to='/organisation-settings'>{t('organiserSettings')}</Link></li>}
                    <li id="navbar-dropdown-li">
                      <button onClick={handleLogout}>{t('logout')}</button>
                    </li>
                  </ul>
                )}
              </>
            ) : (
              <Link to="/login">{t('logIn')}</Link>
            )}
          </li>
        </ul>
        <button
          id="mobile"
          onClick={handleClick}
          onKeyPress={handleKeyPress}
          tabIndex={0}
          aria-label="Toggle Menu"
          data-testid="mobile"
        >
          <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'} data-testid="bar"></i>
        </button>
      </nav>
    </>
  );
};

export default Navbar;