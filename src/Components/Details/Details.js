import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { VscArrowLeft, VscBrowser, VscOrganization, VscLocation } from "react-icons/vsc";
import { BiTime, BiBorderAll } from "react-icons/bi";
import './Details.css';

const Details = () => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
          i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]);

    return (
        <div>
            <div id="container">
                <div id="column">
                    <a href="/#" id="back"><VscArrowLeft class="icons"/> {t('back')}</a>
                    <h1 id="title">Event details will show up here...</h1>
                    <ul id="volunteers_numbers">
                        <li><strong>X</strong> {t('haveBeenSignedIn')}</li>
                        <li><strong>X</strong> {t('moreIsNeeded')}</li>
                    </ul>
                    <ul id="information">
                        <li><VscBrowser class="icons"/> <strong>{t('date')}:</strong> </li>
                        <li><BiTime class="icons"/> <strong>{t('time')}:</strong> </li>
                        <li><BiBorderAll class="icons"/> <strong>{t('category')}:</strong> </li>
                        <li><VscOrganization class="icons"/> <strong>{t('organizer')}:</strong> </li>
                    </ul>
                </div>
                <div id="column" class="photo">
                    <img src="#"/>
                </div>
                <p id="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla est sit amet ultricies tempus. 
                Praesent ultricies, arcu at lobortis porttitor, risus erat porta purus, at imperdiet sapien turpis vitae dolor. 
                Fusce congue porttitor metus sit amet vehicula. Etiam commodo volutpat vulputate. Donec in dolor a orci laoreet tristique vitae
                 ut ipsum. Quisque commodo, tortor quis efficitur vestibulum, nibh nisl maximus risus, sed imperdiet felis tortor eget tellus. 
                 Morbi pellentesque vehicula sem et tempus. In sapien leo, tincidunt at nisl sit amet, luctus venenatis quam. Maecenas malesuada 
                 at erat eu viverra.</p>
                <div id="column" class="location">
                    <p id="location"><VscLocation class="icons"/> <strong>{t('location')}:</strong> </p>
                </div>
                <div id="column" class="signin">
                    <form action='#'>
                        <div id="shift-btn">
                                <label for="shift1">
                                    <input type="checkbox" id="shift1" name="checkbox" class="checkbox-round"/>
                                    00:00-00:00
                                </label>

                                <label for="shift2">
                                    <input type="checkbox" id="shift2" name="checkbox" class="checkbox-round"/>
                                    00:00-00:00
                                </label>

                                <label for="shift3">
                                    <input type="checkbox" id="shift3" name="checkbox" class="checkbox-round"/>
                                    00:00-00:00
                                </label>
                        </div>
                        <button type='submit' id="sign-in">{t('signIn')}</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Details;