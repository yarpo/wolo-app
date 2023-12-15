import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import {
  VscArrowLeft,
  VscBrowser,
  VscOrganization,
  VscLocation,
} from 'react-icons/vsc';
import { BiTime, BiBorderAll } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import MoreEvents from '../MoreEventsFromOrganizer/MoreEvents';
import ShiftCheckbox from './ShiftCheckbox/ShiftCheckbox.js';
import '../../styles/details.scss';

const Details = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  return (
    <div className="details_container">
      <div id="column">
        <Link to="/events" id="back">
          <VscArrowLeft id="back_arrow" /> {t('back')}
        </Link> 
        <h1 id="title">Event details will show up here...</h1>
        <ul id="volunteers_numbers">
          <li>
            <strong>X</strong> {t('haveBeenSignedIn')}
          </li>
          <li>
            <strong>X</strong> {t('moreIsNeeded')}
          </li>
        </ul>
        <ul id="information">
          <li>
            <VscBrowser id="icon" /> <strong>{t('date')}:</strong>{' '}
          </li>
          <li>
            <BiTime id="icon" /> <strong>{t('time')}:</strong>{' '}
          </li>
          <li>
            <BiBorderAll id="icon" /> <strong>{t('category')}:</strong>{' '}
          </li>
        </ul>
      </div>

      <div id="column" className="photo">
        <img src="#" alt="hands holding in circle" />
      </div>

      <p id="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
        fringilla est sit amet ultricies tempus. Praesent ultricies, arcu at
        lobortis porttitor, risus erat porta purus, at imperdiet sapien turpis
        vitae dolor. Fusce congue porttitor metus sit amet vehicula. Etiam
        commodo volutpat vulputate. Donec in dolor a orci laoreet tristique
        vitae ut ipsum. Quisque commodo, tortor quis efficitur vestibulum,
        nibh nisl maximus risus, sed imperdiet felis tortor eget tellus. Morbi
        pellentesque vehicula sem et tempus. In sapien leo, tincidunt at nisl
        sit amet, luctus venenatis quam. Maecenas malesuada at erat eu
        viverra.
      </p>

      <div id="extra_information">
        <ul id="information">
            <li>
              <VscOrganization id="icon" /> <strong>{t('organizer')}:</strong>{' '}
            </li>
            <li>
              <VscLocation id="icon" /> <strong>{t('location')}:</strong>{' '}
            </li>
        </ul>
      </div>

      <div id="column">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d148784.80927349653!2d18.52522342001657!3d54.36117516765159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd731c14d4fa6f%3A0x9bb9fbf163b7be8d!2zR2RhxYRzaw!5e0!3m2!1spl!2spl!4v1685735055387!5m2!1spl!2spl"
            title="map of Gdansk"
            allowfullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
      </div>

      <div id="column" className="signin">
        <form action="#">
          <div id="details_shift_checkboxes">
            <ShiftCheckbox />
            <ShiftCheckbox />
            <ShiftCheckbox />
            <ShiftCheckbox />
          </div>
          <button type="submit" id="sign-in">
            {t('signIn')}
          </button>
        </form>
      </div>

      <div id="more-events">
        <MoreEvents />
      </div>
    </div>
  );
};

export default Details;
