import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase";
import { useNavigate } from "react-router-dom";
import "../css/home.scss";
import "../css/Login.scss";
import Buscador from "./Buscador";
//import RealTimeClock from "./RealTimeClock";

const Home = ({ user }) => {
  // Agrega la prop user para recibir el usuario logueado
  const [searchHistory, setSearchHistory] = useState(getSearchHistory()); // Agrega la prop searchHistory para recibir el historial de búsquedas
  // Agrega la prop searches para recibir las búsquedas guardadas
  const navigate = useNavigate(); // Agrega la prop navigate para navegar entre páginas

  const handleLogout = () => {
    // Agrega la función handleLogout para desloguear al usuario
    signOut(auth) // Desloguea al usuario de Firebase
      .then(() => {
        // Si se desloguea correctamente

        navigate("/"); // Navega a la página de inicio
        console.log("Signed out successfully"); // Muestra un mensaje en la consola
      })
      .catch((error) => {
        //  Si ocurre un error  al desloguear al usuario
        // An error happened.
      });
  };

  const getUsername = (email) => {
    // Agrega la función getUsername para obtener el nombre de usuario
    const username = email.split("@")[0]; // Obtiene el nombre de usuario a partir del email
    return username; // Devuelve el nombre de usuario obtenido
  };

  useEffect(() => {
    // Agrega el hook useEffect para ejecutar código al renderizar el componente
    const burger = document.querySelector(".burger-container"); // Obtiene el elemento con la clase .burger-container
    const header = document.querySelector(".header"); //  Obtiene el elemento con la clase .header

    const handleClick = () => {
      // Agrega la función handleClick para manejar el evento click en el botón de menú
      header.classList.toggle("menu-opened"); // Agrega o remueve la clase .menu-opened al elemento con la clase .header
    };

    burger.addEventListener("click", handleClick); // Agrega el evento click al botón de menú

    return () => {
      // Agrega el return para remover el evento click al botón de menú
      burger.removeEventListener("click", handleClick); //  Remueve el evento click al botón de menú
    };
  }, []);

  function getSearchHistory() {
    // Agrega la función getSearchHistory para obtener el historial de búsquedas
    const searchHistory = //  Obtiene el historial de búsquedas del localStorage
      JSON.parse(localStorage.getItem("searchHistory")) || []; //   Si no hay historial de búsquedas, devuelve un array vacío
    return searchHistory;
  }

  return (
    <div className='home'>
      <>
        <nav>
          <Buscador />
          <div>
            <p className='nombre'></p>
            <div className='window'>
              <div className='header'>
                <div className='burger-container'>
                  <div id='burger'>
                    <div className='nombre'>Nimbus</div>
                    <div className='bar topBar'></div>
                    <div className='bar btmBar'></div>
                  </div>
                </div>
                <div className='icon icon-apple'></div>
                <ul className='menu'>
                  <li className='menu-item'>
                    <a>{user ? getUsername(user.email) : "Invitado"}</a>{" "}
                    {/* // Muestra el nombre de usuario si está logueado, sino muestra "Invitado" */}
                  </li>
                  <li className='menu-item'>
                    <div className='loginboton'>
                      <a>
                        {user ? (
                          <button onClick={handleLogout}>Logout</button> // Si está logueado, muestra el botón de logout
                        ) : (
                          <button onClick={() => navigate("/login")}>
                            {" "}
                            {/* // Si no está logueado, muestra el botón de login */}
                            Login
                          </button>
                        )}
                      </a>
                    </div>
                    <p>Saved Searches:</p>
                    <ul>
                      {searchHistory.map(
                        (
                          search,
                          index //  Muestra el historial de búsquedas
                        ) => (
                          <li key={index}>{search.location}</li> // Muestra la ubicación de la búsqueda en el historial
                        )
                      )}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </>
    </div>
  );
};

export default Home;
