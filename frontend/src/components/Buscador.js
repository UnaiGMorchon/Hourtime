import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HorasMundo = () => {
  const navigate = useNavigate();
  const [hours, setHours] = useState([]);
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [dayOfWeekName, setDayOfWeekName] = useState("");
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const searchHours = async () => {
      try {
        const response = await fetch(
          `http://worldtimeapi.org/api/timezone/Europe/${timeZone}`
        );
        if (response.ok) {
          const data = await response.json();
          setHours(data);
          setLocation(data.timezone);
          setCurrentTime(data.datetime);
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
  }, [timeZone]);

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
        <button onClick={() => setTimeZone(searchQuery)}>Buscar</button>
        <button onClick={() => searchTemperature()}>Buscar Predicción</button>
      </h2>
      <h2>{location}</h2>

      <table>
        <thead>
          <tr>
            <th>Fecha y Hora</th>
            <th>Zona horaria</th>
            <th>Día de la semana</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{hours.datetime}</td>
            <td>{hours.timezone}</td>
            <td>{dayOfWeekName}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Día</th>
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
