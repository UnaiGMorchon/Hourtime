import React, { useState, useEffect } from "react";
import "../css/Reloj.css";

const RealTimeClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div className='containerreloj'>
      <h1>Hora actual</h1>
      <h2>{formattedTime}</h2>
    </div>
  );
};

export default RealTimeClock;
