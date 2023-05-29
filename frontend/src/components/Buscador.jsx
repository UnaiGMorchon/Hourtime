import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RealTimeClock from "./RealTimeClock";
import "../css/Buscador.scss";
import { auth } from "./Firebase";

const HorasMundo = () => {
  // Agrega una prop onSaveSearch para guardar las búsquedas
  const navigate = useNavigate(); // Hook para la navegación  programática
  const [hours, setHours] = useState([]); // Variable para almacenar los datos de la API  de horas del mundo
  const [location, setLocation] = useState(""); //  Variable para almacenar la ubicación
  const [searchQuery, setSearchQuery] = useState("Madrid"); //  Variable para almacenar la búsqueda
  const [timeZone, setTimeZone] = useState(""); // Variable para almacenar la zona horaria
  const [currentTime, setCurrentTime] = useState(""); //  Variable para almacenar la hora actual
  const [dayOfWeekName, setDayOfWeekName] = useState(""); //  Variable para almacenar el día de la semana
  const [predictions, setPredictions] = useState([]); //  Variable para almacenar las predicciones  de la API
  const [formattedTime, setFormattedTime] = useState(""); // Variable para almacenar la hora formateada
  const [weatherCondition, setWeatherCondition] = useState(""); // Nueva variable para la condición meteorológica
  const [searchHistory, setSearchHistory] = useState([]); // Historial de búsquedas
  const [defaultLocation, setDefaultLocation] = useState("madrid"); // Ubicación por defecto

  useEffect(() => {
    // Actualizar la hora cada segundo
    if (timeZone === "") return;
    const searchHours = async () => {
      try {
        const response = await fetch(
          // Llamar a la API de horas del mundo
          `http://worldtimeapi.org/api/timezone/${timeZone}`
        );
        if (response.ok) {
          // Comprobar si la respuesta es correcta
          const data = await response.json(); //  Convertir la respuesta en un objeto JSON
          setHours(data); // Actualizar el estado con los datos de la API
          setLocation(data.timezone); // Actualizar el estado con la ubicación

          console.log("data:", data);

          const dayName = getDayOfWeekName(data.day_of_week); // Obtener el día de la semana  a partir del número del día de la semana
          setDayOfWeekName(dayName); // Actualizar el estado con el día de la semana
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    searchHours(); // Llamar a la función de búsqueda de horas del mundo
    // Actualizar la fecha y hora cada 10 minutos
    const intervalId = setInterval(() => {
      // Actualizar la fecha y hora cada 10 minutos
      const updatedTime = new Date(); //  Crear un nuevo objeto Date

      // Sumar un segundo al objeto Date
      setFormattedTime(
        //  Crear un  nuevo objeto Date en  el estado
        updatedTime.toLocaleTimeString("en-US", {
          //  Formatear la hora
          timeZone: timeZone, //  Zona horaria  del usuario
          hour12: false, // No  usar formato 12h  (AM/PM)
        })
      );
    }, 1000);

    return () => {
      //     Limpiar el intervalo  cuando el componente se desmonte
      clearInterval(intervalId); //   Limpiar el intervalo  cuando el componente se desmonte
    };
  }, [timeZone]); // timeZone  es una dependencia  del useEffect

  useEffect(() => {
    //  Actualizar la hora cada segundo
    if (currentTime === "") return;
    console.log("currentTime:", currentTime); //  Actualizar la hora cada segundo
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");

    const timeString = `${hours}:${minutes}:${seconds}`; //  Actualizar la hora cada segundo
    setFormattedTime(timeString);
  }, [currentTime]); // current Time  es una dependencia  del useEffect

  function getDayOfWeekName(dayOfWeek) {
    // Función para obtener el día de la semana  a partir del número del día de la semana
    const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]; //  Array con los días de la semana abreviados

    return daysOfWeek[dayOfWeek]; //  Devolver el día de la semana
  }

  const api_key = "2SUUALUWUSYC86JWSJG272GDC"; //  Clave de la API

  const searchLocation = async (query) => {
    // Función para buscar la ubicación en la API
    try {
      const response = await fetch(
        //  Llamar a la API de Visual Crossing  para obtener la ubicación y las predicciones  meteorológicas  de los próximos 15 días
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?unitGroup=metric&key=${api_key}`
      );
      if (response.ok) {
        //   Comprobar si la respuesta es correcta
        const data = await response.json(); //  Convertir la respuesta en un objeto JSON
        setPredictions(data.days); //   Actualizar el estado con los datos de la API
        setLocation(data.address);
        setTimeZone(data.timezone); //    Actualizar el estado con los datos de la API
        setWeatherCondition(data.currentConditions.conditions); //  Actualizar el estado con los datos de la API
        saveSearch({
          //  Guardar la búsqueda en el historial
          location: searchQuery, //  Ubicación
          predictions: data.days, //  Predicciones
          date: data.datetime, //  Fecha
        });

        console.log("weatherCondition:", data.currentConditions.conditions);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    //    Actualizar la ubicación por defecto   cuando se monte el componente por primera vez
    searchLocation(defaultLocation); //  Llamar a la función de búsqueda de ubicación
  }, []); //  defaultLocation  es una dependencia  del useEffect

  const searchTemperature = () => {
    //  Función para buscar la temperatura  en la API
    if (searchQuery.trim() === "") {
      //  Comprobar si el campo de búsqueda está vacío
      alert("Debes ingresar un valor en el campo de búsqueda");
      return;
    }
    searchLocation(searchQuery); //   Llamar a la función de búsqueda de ubicación
  };

  // -------------- salvar historial busquedas --------------------------------

  const saveSearch = (search) => {
    // Función para guardar la búsqueda en el historial
    // Recibe un objeto con la búsqueda
    setSearchHistory((prevSearchHistory) => {
      // Actualizar el estado de la búsqueda
      if (prevSearchHistory.length === 0) {
        prevSearchHistory = localStorage.getItem("searchHistory") || "[]"; //  Obtener el historial de búsquedas del almacenamiento local
        prevSearchHistory = JSON.parse(prevSearchHistory); // Convertir el historial de búsquedas en un objeto JSON si existe o en un array vacío si no existe  el historial de búsquedas en el almacenamiento local
      }
      const existingSearch = prevSearchHistory.find((item) => {
        // Comprobar si la búsqueda ya existe en el historial de búsquedas  para no duplicarla  en el historial de búsquedas  si ya existe  la búsqueda en el historial de búsquedas
        return (
          item.location.toLowerCase() === search.location.toLowerCase() && //   Comprobar si la ubicación de la búsqueda  es igual a la ubicación de la búsqueda  en el historial de búsquedas
          item.date === search.date //  Comprobar si la fecha de la búsqueda  es igual a la fecha de la búsqueda  en el historial de búsquedas
        );
      });
      if (existingSearch) {
        //  Comprobar si la búsqueda ya existe en el historial de búsquedas
        return prevSearchHistory;
      }
      const updatedSearchHistory = [...prevSearchHistory, search]; // Agregar la búsqueda al historial  de búsquedas
      console.log("updatedSearchHistory:", updatedSearchHistory); //  Agregar este console.log  para ver el historial de búsquedas
      localStorage.setItem(
        // es la  API de almacenamiento local de JavaScript
        "searchHistory",
        JSON.stringify(updatedSearchHistory) // Clave para guardar  el historial de búsqueda
      );
      return updatedSearchHistory; //   Actualizar el estado de la búsqueda
    });
  };

  // ----------------------------------------------

  const getBackgroundImage = () => {
    // Función para obtener la imagen de fondo según el clima  actual  de la ubicación actual  de la búsqueda  o de la ubicación por defecto si no se ha realizado ninguna búsqueda  o si no se ha encontrado la ubicación de la búsqueda
    const condition = weatherCondition.toLowerCase(); // Convertir a minúsculas
    console.log("condition:", condition); // Agregar este console.log

    switch (condition) {
      case "fog":
        return "./img/Fog.png";
      case "ice":
        return "./img/Ice.png";
      case "rain":
        return "./img/Rain.png";
      case "snow":
        return "./img/Snow.png";
      case "thunderstorm":
        return "./img/Thunderstorm.png";
      case "squalls":
        return "./img/Squalls.png";
      case "hail":
        return "./img/Hail.png";
      case "overcast":
        return "./img/Overcast.png";
      case "partially cloudy":
        return "./img/Partially_cloudy.png";
      case "clear":
        return "./img/Clear.png";
      default:
        return "./img/fondo.png";
    }
  };
  const backgroundImage = //  Variable para obtener la imagen de fondo
    weatherCondition !== "" //  Comprobar si el clima actual  de la ubicación actual  de la búsqueda  es diferente de vacío
      ? `url(${getBackgroundImage()})` //   Obtener la imagen de fondo según el clima  actual  de la ubicación actual  de la búsqueda
      : "url(./img/fondo.png)"; //   Obtener la imagen de fondo de la ubicación por defecto si no se ha realizado ninguna búsqueda  o si no se ha encontrado la ubicación de la búsqueda

  return (
    <div
      className={`containerbuscador`}
      style={{
        backgroundImage: backgroundImage, //  Agregar la imagen de fondo  a la clase containerbuscador  según el clima  actual  de la ubicación actual  de la búsqueda  o de la ubicación por defecto si no se ha realizado ninguna búsqueda  o si no se ha encontrado la ubicación de la búsqueda
      }}
    >
      <div>
        <input
          className='inputbuscador'
          type='text'
          value={searchQuery} // Obtener el valor del campo de búsqueda para realizar la búsqueda
          onChange={(e) => setSearchQuery(e.target.value)} //   Actualizar el estado del campo de búsqueda  para realizar la búsqueda
          placeholder='Buscar ciudad o lugar'
        />
        <button
          className='inputbuscadorboton'
          onClick={() => searchTemperature()} // Llamar a la función para buscar la temperatura  en la API  al hacer clic en el botón de búsqueda
        >
          Buscar
        </button>
      </div>

      {predictions.slice(0, 1).map(
        (
          prediction,
          index //  Mostrar las predicciones de la búsqueda en la API
        ) => (
          <div key={index}>
            <div
              className={`iconostiempo ${
                //  Agregar la clase iconostiempo  según el clima  actual  de la ubicación actual  de la búsqueda  o de la ubicación por defecto si no se ha realizado ninguna búsqueda  o si no se ha encontrado la ubicación de la búsqueda
                weatherCondition === "Clear"
                  ? "sunny"
                  : "" || prediction.conditions.includes("clear", "Clear")
              }`}
            >
              {prediction.conditions === "Clear" ||
              prediction.conditions === "clear" ? (
                <div icon='sunny'>
                  <span className='sun'></span>
                </div>
              ) : prediction.conditions === "Overcast" ||
                prediction.conditions === "cloudy" ||
                prediction.conditions.includes(
                  "cloudy",
                  "partically",
                  "Overcast"
                ) ? (
                <div icon='cloudy'>
                  <span className='cloud'></span>
                  <span className='cloud'></span>
                </div>
              ) : prediction.conditions === "Snow" ? (
                <div icon='snowy'>
                  <span className='snowman'></span>
                </div>
              ) : prediction.conditions === "Thunderstorm" ||
                prediction.conditions === "Rain" ||
                prediction.conditions.includes("Rain") ? (
                <div icon='stormy'>
                  <span className='cloud'></span>
                </div>
              ) : (
                <div icon='default'>
                  <div icon='supermoon'>
                    <span className='moon'></span>
                    <span className='meteor'></span>
                  </div>
                </div>
              )}
            </div>

            <div className='date-container'>
              <span className='location'>{location.split("/")[1]}</span>{" "}
              {/* // Mostrar la ubicación actual  de la búsqueda  o la ubicación por defecto si no se ha realizado ninguna búsqueda  o si no se ha encontrado la ubicación de la búsqueda */}
              <h2 className='date-dayname'>
                {getDayOfWeekName(new Date(prediction.datetime).getDay())}{" "}
                {/* // Obtener el nombre del día de la semana según la fecha de la predicción */}
              </h2>
              <span className='date-day'>{prediction.datetime}</span>{" "}
              {/* // Mostrar
              la fecha de la predicción */}
            </div>
            <div className='weather-container'>
              <h1 className='weather-temp'>{prediction.tempmax}ºC</h1>
            </div>
            <div className='dos_horas'>
              <div className='weather-desc1'>
                <RealTimeClock /> {/* //  Mostrar la hora actual  */}
              </div>
              <div className='weather-desc2'>
                <h5>{location.split("/")[1]}</h5>
                <h4>{formattedTime}</h4>
              </div>
            </div>
            <div className='today-info-container'>
              <div className='today-info'>
                <div className='wind'>
                  <span className='title'>Sensacion térmica</span>
                  <span className='value'> {prediction.feelslike}ºC</span>
                  <div className='clear'></div>
                </div>
                <div className='precipitation'>
                  <span className='title'>Precipitaciones</span>
                  <span className='value'> {prediction.precipprob} %</span>
                  <div className='clear'></div>
                </div>
                <div className='humidity'>
                  <span className='title'>Humedad</span>
                  <span className='value'> {prediction.humidity} %</span>
                  <div className='clear'></div>
                </div>
              </div>
            </div>
          </div>
        )
      )}

      <div className='prediction'>
        <div className='card'>
          <div className='week-container'>
            <ul className='week-list'>
              {predictions.slice(1, 6).map(
                (
                  prediction,
                  index // Mostrar las predicciones de la búsqueda en la API
                ) => (
                  <li key={index} className='active'>
                    <span className='day-name'>
                      {getDayOfWeekName(new Date(prediction.datetime).getDay())}
                    </span>{" "}
                    {/* // Obtener el nombre del día de la semana según la fecha de la predicción */}
                    <span className='day-temp'>{prediction.tempmax}°C</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorasMundo;
