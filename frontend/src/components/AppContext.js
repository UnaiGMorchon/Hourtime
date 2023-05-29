import React, { createContext, useState } from "react";

export const AppContext = createContext(); // el contexto es como un objeto global que se puede acceder desde cualquier componente

export const AppProvider = ({ children }) => {
  //  el provider es el que provee el contexto a los componentes hijos que lo necesiten
  const [currentLocationHours, setCurrentLocationHours] = useState([]); // el estado del contexto se define en el provider  y se pasa como value  a los componentes hijos que lo necesiten  en este caso currentLocationHours y setCurrentLocationHours

  return (
    <AppContext.Provider
      value={{ currentLocationHours, setCurrentLocationHours }} // el value es el estado del contexto que se pasa a los componentes hijos que lo necesiten
    >
      {children}
    </AppContext.Provider> // children es el componente que se pasa como hijo al provider
  );
};
