import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentLocationHours, setCurrentLocationHours] = useState([]);

  return (
    <AppContext.Provider
      value={{ currentLocationHours, setCurrentLocationHours }}
    >
      {children}
    </AppContext.Provider>
  );
};
