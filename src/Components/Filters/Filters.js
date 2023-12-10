import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { VscChevronDown, VscChevronUp, VscClose } from 'react-icons/vsc';
import DatePicker from 'react-datepicker';
import { useFiltersContext } from './FiltersContext';

const Filters = ({ setFilteredEvents }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { filters, setFilters } = useFiltersContext();
  const [apiResponse, setApiResponse] = useState([]);
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [organizations, setOrganizations] = useState([]);


useEffect(() => {
  let url = 'http://localhost:8080/events';

  // if (filters.selectedDate) {
  //   const startDate = filters.selectedDate;
  //   url += `startDate=${startDate}&`;
  // }

  // if (filters.chosenTags && filters.chosenTags.length > 0) {
  //   const category = filters.chosenTags[0];
  //   const categoryId = typeof category === 'object' ? category.id : categories.find(cat => cat.name === category)?.id;
  //   if (categoryId) {
  //     url += `category=${categoryId}&`;
  //   }
  // }

  // if (filters.requiresVerification !== null) {
  //   const verification = typeof filters.requiresVerification === 'object' ? filters.requiresVerification.id : filters.requiresVerification;
  //   url += `verification=${verification}&`;
  // }

  // if (filters.selectedAge !== '') {
  //   const ageRestriction = typeof filters.selectedAge === 'object' ? filters.selectedAge.id : filters.selectedAge;
  //   url += `ageRestriction=${ageRestriction}&`;
  // }

  fetch(url)
    .then(response => response.json())
    .then(data => {
      setApiResponse(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, [filters, categories]);

useEffect(() => {
  fetch('http://localhost:8080/categories')
    .then(response => response.json())
    .then(data => setCategories(data));

  fetch('http://localhost:8080/districts')
    .then(response => response.json())
    .then(data => setDistricts(data));

  fetch('http://localhost:8080/organisations')
    .then(response => response.json())
    .then(data => setOrganizations(data));
}, []);
  

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

useEffect(() => {
  const filteredEvents = apiResponse.filter((event) => {
    // const isMatchingTag = filters.chosenTags.some((tag) =>
    //   [event.street, event.districtId, event.organisationId].includes(tag)
    // );
    const isMatchingTag = filters.chosenTags.some((tag) => tag === event.organisationId);
    
    const isMatchingDate =
      filters.selectedDate === null || new Date(event.shifts[0].date.join('-')) >= filters.selectedDate;

    const isMatchingVerification =
      !filters.requiresVerification || event.peselVerificationRequired === false;

    const isMatchingBooking =
      !filters.hideFullyBookedEvents || event.shifts[0].signedUp < event.shifts[0].capacity;

    const isMatchingAge =
      filters.selectedAge === '' ||
      parseInt(event.shifts[0].requiredMinAge) >= parseInt(filters.selectedAge);

    return (
      (filters.chosenTags.length === 0 || isMatchingTag) &&
      isMatchingDate &&
      isMatchingVerification &&
      isMatchingBooking &&
      isMatchingAge
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

  const handleAgeChange = (event) => {
    const { value } = event.target;
    setFilters({ ...filters, selectedAge: value });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleToggle();
    }
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
          { label: t('location'), options: districts.map((district) => district.name) },
          { label: t('category'), options: categories.map((category) => category.name) },
          { label: t('organisations'), options: organizations.map((organization) => organization.name) },
        ].map((filter, index) => (
              <select
                key={index}
                id="selectInput"
                onChange={handleTagChange}
                value=""
                disabled={!isOpen}
              >
                <option value="" disabled selected>
                  {filter.label}
                </option>
                {filter.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ))}

            <select
              id="selectInput"
              onChange={handleAgeChange}
              value={filters.selectedAge}
              disabled={!isOpen}
            >
              <option value="" disabled>
                {t('ageRestrictions')}
              </option>
              {[...new Set(apiResponse.map((event) => event.ageRestrictions))].map((age, index) => (
                <option key={index} value={age}>
                  {age}
                </option>
              ))}
            </select>
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