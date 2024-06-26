import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useFiltersContext } from '../../Components/Filters/FiltersContext';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/hero.scss';
import fetchData from '../../Utils/fetchData';
import { URLS } from '../../config';
import WelcomingBanner from '../../Components/WelcomingBanner/WelcomingBanner.js';

const Hero = () => {

    const { t } = useTranslation();
    const { filters, setFilters } = useFiltersContext();
    const [selectedLocation, setSelectedLocation] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        fetchData(URLS.CITIES, setCities); 
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleLocationChange = (event) => {
        const { value } = event.target;
        setSelectedLocation(value);
    };

    const handleSubmit = () => {
        let newFilters = { ...filters, selectedDate: selectedDate };

        if (selectedLocation !== "") {
            newFilters.chosenTags = [...filters.chosenTags, selectedLocation];
        }

        setFilters(newFilters);
    };

    return (
        <div className='hero-container'>
            <div id="mainContainer_hero">
                <WelcomingBanner isOrganizerPage={ false }/>
            </div>
            <form id="form_hero">
                <div id="MainRow_hero">
                    <div>
                        <DatePicker
                            id="datePicker_hero"
                            selected={selectedDate}
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
                        <option value="" disabled>{t('city')}</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city.name}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
            <div id="filters_hero">
                <div id="button_hero">
                    <Link to="/events">
                        <input id="hero_submmit_button" type="submit" value={t('mainSearch')} onClick={handleSubmit} />
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Hero;
