import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const HorasMundo = () => {
  const { locationCode } = useParams();
  const navigate = useNavigate();
  const [horas, setHoras] = useState([]);
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeZone, setTimeZone] = useState("Europe/Amsterdam");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://timeapi.io/api/Time/current/zone?timeZone=${timeZone}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setHoras(data.hours);
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [timeZone]);

  return (
    <div className='container'>
      <h1>Horas del mundo</h1>
      <h2>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Buscar ciudad o lugar'
        />
        {/*  <button onClick={() => searchLocation()}>Buscar</button> */}
      </h2>
      <h2>{location}</h2>
    </div>
  );
};

export default HorasMundo;
