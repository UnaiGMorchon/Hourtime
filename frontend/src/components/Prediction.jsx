/* import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table"; */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Prediction = () => {
  const { locationCode } = useParams();
  const navigate = useNavigate();
  const [predictions, setPredictions] = useState([]);
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const api_key = "2SUUALUWUSYC86JWSJG272GDC";

  useEffect(() => {
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationCode}?unitGroup=metric&key=${api_key}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPredictions(data.days);
      });
  }, [locationCode]);

  const searchTemperature = () => {
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline?unitGroup=metric&key=${api_key}&location=${searchQuery}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPredictions(data.days);
        setLocation(data.address);
      });
  };

  return (
    <div className='container'>
      <h1>Predicción</h1>
      <h2>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Buscar ciudad o lugar'
        />
        <button onClick={() => searchTemperature()}>Buscar</button>
      </h2>
      <h2>{location}</h2>

      <table>
        <thead>
          <tr>
            <th>Día</th>
            <th>Temperatura</th>
            <th>Condiciones</th>
            <th>Probabilidad de lluvia</th>
            <th>Amanecer</th>
            <th>Atardecer</th>
            {/* <th>Hora</th> */}
          </tr>
        </thead>
        <tbody>
          {predictions.map((prediction, index) => (
            <tr key={index}>
              <td>{prediction.datetime}</td>
              <td>{prediction.tempmax}ºC</td>
              <td>{prediction.conditions}</td>
              <td>{prediction.precipprob}%</td>
              <td>{prediction.sunrise}</td>
              <td>{prediction.sunset}</td>
              {/* {prediction.hours.map((hour, subIndex) => (
                    <React.Fragment key={subIndex}>
                      <td>{hour.datetime}</td>
                      <td>{hour.temp}ºC</td>
                      <td>{hour.conditions}</td>
                      <td>{hour.precipprob}%</td>
                    </React.Fragment>
                  ))} */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Prediction;
