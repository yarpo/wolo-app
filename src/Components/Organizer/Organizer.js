import { useTranslation } from 'react-i18next';
import {
  VscArrowLeft,
  VscMail,
  VscCallOutgoing,
  VscLocation,
} from 'react-icons/vsc';
import { AiOutlineInstagram, AiOutlineUpload, AiFillHeart, AiOutlineFacebook, AiOutlineYoutube } from "react-icons/ai";
import { Link } from 'react-router-dom';
import MoreEvents from '../MoreEventsFromOrganizer/MoreEvents';
import '../../styles/organizer.scss';

const Organizer = () => {

  const { t } = useTranslation();

  return (
    <div className="organizer_container">
      <div id="column">
        <Link to="/events" id="back">
          <VscArrowLeft id="back_arrow" /> {t('back')}
        </Link>
        <div>
          <img src="#" alt="logo" />
          <h1 id="title">Nazwa Wolontariatu</h1>
        </div>
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
            <VscCallOutgoing id="icon" /> <strong>{t('phone')}: </strong>{' +48 123 456 789'}
          </li>
          <li>
            <VscMail id="icon" /> <strong>{t('E-mail')}: </strong>{'losowa@organizacja.'}
          </li>
        </ul>
      </div>

      <div id="column">
        <div>
          <VscLocation id="icon" /> <strong>{t('location')}:</strong>{'ul. Losowa 56 "hejka"'}
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d148784.80927349653!2d18.52522342001657!3d54.36117516765159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd731c14d4fa6f%3A0x9bb9fbf163b7be8d!2zR2RhxYRzaw!5e0!3m2!1spl!2spl!4v1685735055387!5m2!1spl!2spl"
          title="map of Gdansk"
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className='icons_under_map'>
          <AiOutlineUpload id="icon" />
          <AiFillHeart id="icon" />
          <AiOutlineInstagram id="icon" />
          <AiOutlineFacebook id="icon" />
          <AiOutlineYoutube id="icon" />
        </div>
      </div>
      <div id="more_events">
        <MoreEvents />
      </div>
    </div>
  );
};

export default Organizer;