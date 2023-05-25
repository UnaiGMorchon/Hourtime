import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RealTimeClock from "../components/RealTimeClock";

const HorasMundo = () => {
  const navigate = useNavigate();
  const [hours, setHours] = useState([]);
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [dayOfWeekName, setDayOfWeekName] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [formattedTime, setFormattedTime] = useState(""); // Variable para almacenar la hora formateada

  useEffect(() => {
    const searchHours = async () => {
      try {
        const response = await fetch(
          `http://worldtimeapi.org/api/timezone/${timeZone}`
        );
        if (response.ok) {
          const data = await response.json();
          setHours(data);
          setLocation(data.timezone);

          // Obtener la fecha y hora de la API
          const datetime = data.datetime;

          const [date, time] = datetime.split("T");

          // Crear un objeto Date con la fecha y hora
          const initialTime = new Date(`${date} ${time}`);

          const hours = initialTime.getHours().toString().padStart(2, "0");
          const minutes = initialTime.getMinutes().toString().padStart(2, "0");
          const seconds = initialTime.getSeconds().toString().padStart(2, "0");

          const timeString = `${hours}:${minutes}:${seconds}`;
          setFormattedTime(timeString); // Asignar la hora formateada a la variable

          // Sumar un segundo al objeto Date
          initialTime.setSeconds(initialTime.getSeconds() + 1);
          setCurrentTime(initialTime);

          const dayName = getDayOfWeekName(data.day_of_week);
          setDayOfWeekName(dayName);
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    searchHours();
    // Actualizar la fecha y hora cada 10 minutos
    const intervalId = setInterval(() => {
      const updatedTime = new Date(currentTime);
      updatedTime.setMinutes(updatedTime.getMinutes() + 10);
      setCurrentTime(updatedTime);
    }, 600000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timeZone, currentTime]);

  function getDayOfWeekName(dayOfWeek) {
    const daysOfWeek = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];

    return daysOfWeek[dayOfWeek];
  }

  const api_key = "2SUUALUWUSYC86JWSJG272GDC";

  const searchTemperature = () => {
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchQuery}?unitGroup=metric&key=${api_key}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPredictions(data.days);
        setLocation(data.address);
        setTimeZone(data.timezone);
      });
  };

  return (
    <div className='container'>
      <h1>Horas del mundo | Predicción</h1>
      <h2>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Buscar ciudad o lugar'
        />

        <button onClick={() => searchTemperature()}>Buscar Predicción</button>
      </h2>

      <h2>{location}</h2>
      <RealTimeClock></RealTimeClock>
      <table>
        <thead>
          <tr>
            <th>Día</th>
            <th>Hora</th>
            <th>Día de la semana</th>
            <th>Temperatura</th>
            <th>Sensación térmica</th>
            <th>Probabilidad de lluvia</th>
            <th>Humedad</th>
            <th>Condiciones</th>
            <th>Descripción</th>
            <th>Amanecer</th>
            <th>Atardecer</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((prediction, index) => (
            <tr key={index}>
              <td>{prediction.datetime}</td>
              <td>{formattedTime}</td>
              <td>{dayOfWeekName}</td>
              <td>{prediction.tempmax}ºC</td>
              <td>{prediction.feelslike}ºC</td>
              <td>{prediction.precipprob}%</td>
              <td>{prediction.humidity}%</td>
              <td>{prediction.conditions}</td>
              <td>{prediction.description}</td>
              <td>{prediction.sunrise}</td>
              <td>{prediction.sunset}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HorasMundo;
