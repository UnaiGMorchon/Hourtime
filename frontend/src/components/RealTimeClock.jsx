import React, { useState, useEffect } from "react";
import "../css/Reloj.scss";

const RealTimeClock = () => {
  // Reloj en tiempo real en la barra de navegación
  const [currentTime, setCurrentTime] = useState(new Date()); //  Obtiene la hora actual

  useEffect(() => {
    //  Actualiza la hora cada segundo
    const intervalId = setInterval(() => {
      setCurrentTime(new Date()); //  Actualiza la hora
    }, 1000);

    return () => {
      clearInterval(intervalId); //   Limpia el intervalo de tiempo
    };
  }, []);

  const formattedTime = currentTime.toLocaleTimeString(); //  Formatea la hora  a formato local (ej: 12:00:00)

  return (
    <div>
      <h5>Actual</h5>
      <div>
        <h4>{formattedTime}</h4>
      </div>
    </div>
  );
};

export default RealTimeClock;
