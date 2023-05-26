import React, { useState, useEffect } from "react";
import "../css/Reloj.scss";

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
    <div className='containerrelojtitulo'>
      <h1>Actual</h1>
      <div className='containerreloj'>
        <h2>{formattedTime}</h2>
      </div>
    </div>
  );
};

export default RealTimeClock;
