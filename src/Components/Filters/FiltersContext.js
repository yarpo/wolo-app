
import React, { createContext, useContext, useState } from 'react';

const FiltersContext = createContext();

export const useFiltersContext = () => {
  return useContext(FiltersContext);
};

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    selectedDate: null,
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
