import { createContext, useState } from "react";

export const SearchResultsContext = createContext();

export const SearchResultsContextProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchResultsContext.Provider value={{ searchResults, setSearchResults }}>
      {children}
    </SearchResultsContext.Provider>
  );
};
