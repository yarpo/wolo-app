import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Filters from '../Filters/Filters';
import { useFiltersContext } from '../Filters/FiltersContext';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/hero.scss';
import fetchData from '../../Utils/fetchData';

const Hero = () => {

    const { t } = useTranslation();
    const { filters, setFilters } = useFiltersContext();
    const [selectedLocation, setSelectedLocation] = useState("");
    const [locations, setLocations] = useState([]);
    const [  , setFilteredEvents] = useState([]);

    useEffect(() => {
        fetchData('http://localhost:8080/districts', setLocations);
    }, []);

   const handleDateChange = (date) => {
    setFilters({ ...filters, selectedDate: date });
    };

    const handleLocationChange = (event) => {
        const { value } = event.target;
        setSelectedLocation(value);
        setFilters({ ...filters, chosenTags: [...filters.chosenTags, value] });
    };

    return (
        <div className='hero-container'>
            <form id="form_hero">
                <div id="mainContainer_hero">
                    <div id="background_hero">
                        <div id="containerHero_hero">
                            <h1>{t('welcome')}</h1>
                        </div>
                        <div id="subtext_hero">
                            <h2><Link to="/login">{t('signInToday')}</Link> {t('or')} <Link to="/events">{t('findEvent')}</Link></h2>
                        </div>
                    </div>
                    <div id="MainRow_hero">
                        <div>
                        <DatePicker
                            id="datePicker_hero"
                            selected={filters.selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            placeholderText={t('selectDate')}
                            className="MainInput"
                        />
                        </div>
                       <select 
                            id="selectInput_hero" 
                            className="MainInput" 
                            data-testid="location-select"
                            value={selectedLocation}
                            onChange={handleLocationChange}
                            >
                            <option value="" disabled>{t('location')}</option>
                            {locations.map((location, index) => (
                                <option key={index} value={location.name}>
                                {location.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
            <div id="filters_hero">
                <Filters setFilteredEvents={setFilteredEvents} />
                <div id="button_hero">
                    <Link to="/events">
                        <input id="hero_submmit_button" type="submit" value={t('mainSearch')} />
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Hero;