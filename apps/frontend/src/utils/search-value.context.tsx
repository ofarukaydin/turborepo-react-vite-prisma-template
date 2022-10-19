/* eslint-disable import/order */
import React, { createContext, useState } from "react";

interface SearchContext {
  filter: string;
  setFilter: (val: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SearchContext = createContext<SearchContext>(
  null as any as SearchContext
);

// Provider in your app

export const SearchContextWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filterValue, setFilterValue] = useState("");

  return (
    <SearchContext.Provider
      value={{
        setFilter: setFilterValue,
        filter: filterValue,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Consume in your app
import { useContext } from "react";

export const useSearchContext = () => {
  return useContext(SearchContext);
};
