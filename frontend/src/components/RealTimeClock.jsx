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
    <div>
      <h5>Actual</h5>
      <div>
        <h4>{formattedTime}</h4>
      </div>
    </div>
  );
};

export default RealTimeClock;
