import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RealTimeClock from "./RealTimeClock";
import "../css/Buscador.css";

const HorasMundo = ({ onSaveSearch }) => {
  // Agrega una prop onSaveSearch para guardar las búsquedas
  const navigate = useNavigate();
  const [hours, setHours] = useState([]);
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [dayOfWeekName, setDayOfWeekName] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [formattedTime, setFormattedTime] = useState(""); // Variable para almacenar la hora formateada
  const [weatherCondition, setWeatherCondition] = useState(""); // Nueva variable para la condición meteorológica

  useEffect(() => {
    if (timeZone === "") return;
    const searchHours = async () => {
      try {
        const response = await fetch(
          `http://worldtimeapi.org/api/timezone/${timeZone}`
        );
        if (response.ok) {
          const data = await response.json();
          setHours(data);
          setLocation(data.timezone);
          onSaveSearch({ location: data.address, predictions: data.days }); // Guarda la búsqueda realizada

          console.log("data:", data);

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
      const updatedTime = new Date();

      // Sumar un segundo al objeto Date
      setFormattedTime(
        updatedTime.toLocaleTimeString("en-US", {
          timeZone: timeZone,
          hour12: false,
        })
      );
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timeZone]);

  useEffect(() => {
    if (currentTime === "") return;
    console.log("currentTime:", currentTime);
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");

    const timeString = `${hours}:${minutes}:${seconds}`;
    setFormattedTime(timeString);
  }, [currentTime]);

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
        setWeatherCondition(data.conditions); // Guarda la condición meteorológica actual
      });
  };

  const getBackgroundImage = () => {
    switch (weatherCondition) {
      case "Overcast":
        return "/img/Overcast.png";
      case "Clear":
        return "/img/Clear.png";
      case "Partially cloudy":
        return "/img/Partially cloudy.png";
      case "Rain":
        return "/img/Rain.png";
      case "Snow":
        return "/img/Snow.png";
      case "Thunderstorms":
        return "/img/Thunderstorm.png";
      case "Fog":
        return "/img/Fog.png";
      case "Ice":
        return "/img/Ice.png";
      default:
        return "/img/fondo.png";
    }
  };

  return (
    <div
      className='containerbuscador'
      style={{ backgroundImage: getBackgroundImage() }}
    >
      {/* <h1>Horas del mundo | Predicción </h1>*/}

      <h2>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Buscar ciudad o lugar'
        />

        <button onClick={() => searchTemperature()}>Buscar Predicción</button>
      </h2>

      <h2>{location.split("/")[1]}</h2>
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
            <p>{weatherCondition}</p>
            {/*  <th>Descripción</th> */}
            <th>Amanecer</th>
            <th>Atardecer</th>
          </tr>
        </thead>
        <tbody>
          {predictions.slice(0, 1).map((prediction, index) => (
            <tr key={index}>
              <td>{prediction.datetime}</td>
              <td>{formattedTime}</td>
              <td>{dayOfWeekName}</td>
              <td>{prediction.tempmax}ºC</td>
              <td>{prediction.feelslike}ºC</td>
              <td>{prediction.precipprob}%</td>
              <td>{prediction.humidity}%</td>
              <td>{prediction.conditions}</td>
              {/* <td>{prediction.description}</td> */}
              <td>{prediction.sunrise}</td>
              <td>{prediction.sunset}</td>
            </tr>
          ))}
        </tbody>
        <p>Próximos días</p>
        <tbody>
          {predictions.slice(1).map((prediction, index) => (
            <tr key={index}>
              <td>{prediction.datetime}</td>
              <td>{dayOfWeekName}</td>
              <td>{prediction.tempmax}ºC</td>
              <td>{prediction.feelslike}ºC</td>
              <td>{prediction.precipprob}%</td>
              <td>{prediction.humidity}%</td>
              <td>{prediction.conditions}</td>
              {/* <td>{prediction.description}</td> */}
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

// quiero guardar las busquedas hechas ene el buscador <button onClick={() => searchTemperature()}>Buscar Predicción</button> de tiempo y de horas searchHours para posteriormente mostrarlas en el home
