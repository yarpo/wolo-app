import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/navbar.scss';
import logo from '../../images/logo.svg';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { FaRegUserCircle } from 'react-icons/fa';
import ReactFlagsSelect from 'react-flags-select';
import fetchUser from '../../Utils/fetchUser';

const Navbar = () => {
  const [role, setRole] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const dropdownRef = useRef(null);
  const [selected, setSelected] = useState(i18n.language.toUpperCase());

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

  const handleLanguageChange = code => {
    const language = code.toLowerCase();
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
    setSelected(code);
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
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
            <Link to="/forVolunteers">{t('forVolunteers')}</Link>
          </li>
          <li>
            <Link to="/needyou">{t('theyNeedYou')}</Link>
          </li>
          <li>
            <ReactFlagsSelect
              countries={["GB", "PL", "UA", "RU"]}
              customLabels={{ GB: "English", PL: "Polski", UA: "Українська", RU: "Русский" }}
              selected={selected}
              onSelect={handleLanguageChange}
              placeholder="Select Language"
              className="custom-flags-select"
            />
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
                      {showDropdown ? <RiArrowDropUpLine size={25}/> : <RiArrowDropDownLine size={25}/>}
                    </div>
                  </div>
                </button>
                {showDropdown && (
                  <ul ref={dropdownRef} className="navbar-dropdown-menu">
                    {role && role.includes('USER') && <li id="navbar-dropdown-li"><Link to='/volunteerHomePage'>{t('volunteerPage')}</Link></li>}
                    {role && role.includes('ADMIN') && <li id="navbar-dropdown-li"><Link to='/adminHomePage'>{t('adminPage')}</Link></li>}
                    {role && role.includes('MODERATOR') && <li id="navbar-dropdown-li"><Link to='/organiserHomePage'>{t('organiserPage')}</Link></li>}
                    <li id="navbar-dropdown-li"><Link to="/settings">{t('settings')}</Link></li>
                    {role && role.includes('MODERATOR') && <li id="navbar-dropdown-li"><Link to='/organiserSettings'>{t('organiserSettings')}</Link></li>}
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
