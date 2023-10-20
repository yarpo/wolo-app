import React, { createContext, useContext, useState } from 'react';

const FiltersContext = createContext();

export const useFilterContext = () => {
  return useContext(FiltersContext);
};

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    selectedDate: null,
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
