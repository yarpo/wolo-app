import React, { createContext, useContext, useState } from 'react';

const FiltersContext = createContext();

export const useFiltersContext = () => {
  return useContext(FiltersContext);
};

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    selectedDate: new Date(),
    chosenTags: [],
    requiresVerification: false,
    hideFullyBookedEvents: false,
    selectedAge: '',
  });

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};
