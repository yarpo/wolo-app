import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { VscChevronDown, VscChevronUp, VscClose } from 'react-icons/vsc';
import DatePicker from 'react-datepicker';
import { useFiltersContext } from './FiltersContext';
import fetchData from '../../Utils/fetchData.js';
import { URLS } from '../../config.js';

const Filters = ({ setFilteredEvents }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { filters, setFilters } = useFiltersContext();
  const [apiResponse, setApiResponse] = useState([]);
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [filteredDistricts, setFilteredDistricts] = useState([]);

  useEffect(() => {
    fetchData(URLS.EVENTS, setApiResponse);
  }, [filters, categories]);

  useEffect(() => {
    fetchData(URLS.CATEGORIES, setCategories);
    fetchData(URLS.DISTRICTS, setDistricts);
    fetchData(URLS.CITIES, setCities);
    fetchData(URLS.ORGANISATIONS, setOrganizations);
  }, []);

  useEffect(() => {
    const filteredEvents = apiResponse.filter((event) => {
      const isMatchingTag = filters.chosenTags.some((tag) =>
        tag === event.organisation ||
        event.categories.some(category => category === tag) ||
        event.shifts[0].district === tag ||
        event.shifts[0].requiredMinAge.toString() === tag ||
        event.city === tag
      );

      const isMatchingDate =
        filters.selectedDate === null || new Date(event.date) >= filters.selectedDate;

      const isMatchingVerification =
        !filters.requiresVerification || event.peselVerificationRequired === false;

      const isMatchingBooking =
        !filters.hideFullyBookedEvents || event.shifts[0].registeredUsers < event.shifts[0].capacity;

      return (
        (filters.chosenTags.length === 0 || isMatchingTag) &&
        isMatchingDate &&
        isMatchingVerification &&
        isMatchingBooking
      );
    });

    setFilteredEvents(filteredEvents);
  }, [filters, setFilteredEvents, apiResponse]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDateChange = (date) => {
    setFilters({ ...filters, selectedDate: date });
  };

  const handleTagChange = (event) => {
    const { value } = event.target;
    if (!filters.chosenTags.includes(value)) {
      setFilters({ ...filters, chosenTags: [...filters.chosenTags, value] });
    }
  };

  const handleTagRemove = (tag) => {
    setFilters({
      ...filters,
      chosenTags: filters.chosenTags.filter((chosenTag) => chosenTag !== tag),
    });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters({ ...filters, [name]: checked });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleToggle();
    }
  };

  const handleCityChange = (event) => {
    const newSelectedCity = Number(event.target.value);
    setSelectedCity(newSelectedCity);
  };

  useEffect(() => {
    const selectedCityObject = cities.find(city => city.id === selectedCity);
    if (selectedCityObject) {
      const newFilteredDistricts = districts.filter(district => district.cityName === selectedCityObject.name);
      setFilteredDistricts(newFilteredDistricts);
    } else {
      setFilteredDistricts([]);
    }
  }, [selectedCity, cities, districts]);

  const handleResetFilters = () => {
    setFilters({
      chosenTags: [],
      chosenLocation: '',
      chosenOrganisation: '',
      selectedDate: new Date(),
      requiresVerification: false,
      hideFullyBookedEvents: false,
      selectedAge: '',
    });
    setSelectedCity(null);
  };

  if (apiResponse.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div id="filters">
      {isOpen && (
        <>
          <div id="options">
            <DatePicker
              id="datePicker"
              selected={filters.selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText={t('date')}
            />
            {[
              { label: t('location'), options: cities.map((city) => ({ id: city.id, name: city.name })), handleChange: handleCityChange },
              { label: t('district'), options: filteredDistricts.map((district) => ({ id: district.id, name: district.name })) },
              { label: t('category'), options: categories.map((category) => ({ id: category.id, name: category.name })) },
              { label: t('organisations'), options: organizations.map((organization) => ({ id: organization.id, name: organization.name })) },
              { label: t('ageRestrictions'), options: [...new Set(apiResponse.flatMap((event) => event.shifts.map((shift) => shift.requiredMinAge)))] },
            ].map((filter, index) => (
              <select
                key={index}
                id="selectInput"
                onChange={filter.handleChange ? filter.handleChange : handleTagChange}
                value=""
                disabled={!isOpen}
              >
                <option value="" disabled>{filter.label}</option>
                {filter.options.map((option, index) => (
                  <option key={index} value={option.id ? option.id : option}>
                    {option.name ? option.name : option}
                  </option>
                ))}
              </select>
            ))}
            <button className="filters-reset-button" onClick={handleResetFilters}>{t('resetAllFilters')}</button>
            <br />
          </div>
          <div className="checkbox-container">
            <label className="select-boolean">
              {t('noVolunteerVerificationRequired')}
              <input
                type="checkbox"
                className="checkbox-round"
                name="requiresVerification"
                checked={filters.requiresVerification}
                onChange={handleCheckboxChange}
                disabled={!isOpen}
              />
            </label>
            <label className="select-boolean" htmlFor="booked">
              {t('hideFullyBookedEvents')}
              <input
                type="checkbox"
                className="checkbox-round"
                id="booked"
                name="hideFullyBookedEvents"
                checked={filters.hideFullyBookedEvents}
                onChange={handleCheckboxChange}
                disabled={!isOpen}
              />
            </label>
          </div>
          <ul className="chosen-tags-container">
            {filters.chosenTags.map((tag, index) => (
              <li key={index} className="chosen-tags">
                {tag} <VscClose className="icon" onClick={() => handleTagRemove(tag)} />
              </li>
            ))}
          </ul>
        </>
      )}
      <br />
      <button id="toggle-filters" onClick={handleToggle} onKeyDown={handleKeyDown}>
        {isOpen ? (
          <>
            {t('hideFilters')} <VscChevronUp />
          </>
        ) : (
          <>
            {t('showFilters')} <VscChevronDown />
          </>
        )}
      </button>
    </div>
  );
};

export default Filters;
