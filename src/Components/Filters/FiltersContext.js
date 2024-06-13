import React, { createContext, useContext, useState } from 'react';

const FiltersContext = createContext();

export const useFiltersContext = () => {
  return useContext(FiltersContext);
};

export const FiltersProvider = ({ children }) => {
  const today = new Date();
  const [filters, setFilters] = useState({
    selectedDate: today,
    chosenTags: [],
    requiresVerification: false,
    peselVerificationRequired: false,
    hideFullyBookedEvents: false,
  });

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};