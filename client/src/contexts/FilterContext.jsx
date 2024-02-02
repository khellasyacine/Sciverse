import { createContext, useState } from "react";
import { filterInitialization } from "../constants";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState(filterInitialization);

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterProvider };
