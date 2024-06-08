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

  useEffect(() => {
    fetchData(URLS.EVENTS, setApiResponse);
  }, [filters]);

  useEffect(() => {
    fetchData(URLS.CATEGORIES, setCategories);
    fetchData(URLS.DISTRICTS, setDistricts);
    fetchData(URLS.CITIES, setCities);
    fetchData(URLS.ORGANISATIONS, setOrganizations);
  }, []);

  useEffect(() => {
    const filteredEvents = apiResponse.filter((event) => {
      const isMatchingTag = filters.chosenTags.length === 0 || filters.chosenTags.some((tag) =>
        tag === event.organisation ||
        event.categories.includes(tag) ||
        event.shifts.some(shift => shift.district === tag) ||
        event.shifts.some(shift => shift.requiredMinAge.toString() === tag) ||
        event.city === tag
      );

      const isMatchingDate =
        !filters.selectedDate || new Date(event.date) >= filters.selectedDate;

      const isMatchingVerification =
        !filters.requiresVerification || event.isAgreementNeeded;

      const isMatchingPeselVerification =
        !filters.peselVerificationRequired || event.isPeselVerificationRequired;

      const isMatchingBooking =
        !filters.hideFullyBookedEvents || event.shifts.some(shift => shift.registeredUsers < shift.capacity);

      return (
        isMatchingTag &&
        isMatchingDate &&
        isMatchingVerification &&
        isMatchingPeselVerification &&
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

  const handleResetFilters = () => {
    setFilters({
      chosenTags: [],
      selectedDate: null,
      requiresVerification: false,
      peselVerificationRequired: false,
      hideFullyBookedEvents: false,
    });
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
              { label: t('location'), options: cities.map((city) => city.name) },
              { label: t('district'), options: districts.map((district) => district.name) },
              { label: t('category'), options: categories.map((category) => category.name) },
              { label: t('organisations'), options: organizations.map((organization) => organization.name) },
              { label: t('ageRestrictions'), options: [...new Set(apiResponse.flatMap((event) => event.shifts.map((shift) => shift.requiredMinAge)))] },
            ].map((filter, index) => (
              <select
                key={index}
                id="selectInput"
                onChange={handleTagChange}
                value=""
                disabled={!isOpen}
              >
                <option value="" disabled>{filter.label}</option>
                {filter.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
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
            <label className="select-boolean">
              {t('noPeselVerificationRequired')}
              <input
                type="checkbox"
                className="checkbox-round"
                name="peselVerificationRequired"
                checked={filters.peselVerificationRequired}
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