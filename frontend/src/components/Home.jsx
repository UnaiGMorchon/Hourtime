import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase";
import { useNavigate } from "react-router-dom";
import "../css/home.scss";
import "../css/Login.scss";
import Buscador from "./Buscador";
//import RealTimeClock from "./RealTimeClock";

const Home = ({ user, searchHistory }) => {
  // Agrega la prop searches para recibir las búsquedas guardadas
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const getUsername = (email) => {
    const username = email.split("@")[0];
    return username;
  };

  useEffect(() => {
    const burger = document.querySelector(".burger-container");
    const header = document.querySelector(".header");

    const handleClick = () => {
      header.classList.toggle("menu-opened");
    };

    burger.addEventListener("click", handleClick);

    return () => {
      burger.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className='home'>
      <>
        <nav>
          {/*  <p className='loginhome'>
            Welcome Home
            {user ? getUsername(user.email) : "Invitado"}
          </p>
          <div className='loginboton'>
            {user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <button onClick={() => navigate("/login")}>Login</button>
            )}
          </div> */}
          <Buscador />
          <div>
            <p className='nombre'>Nimbus</p>
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
                    <a>{user ? getUsername(user.email) : "Invitado"}</a>
                  </li>
                  <li className='menu-item'>
                    <div className='loginboton'>
                      <a>
                        {user ? (
                          <button onClick={handleLogout}>Logout</button>
                        ) : (
                          <button onClick={() => navigate("/login")}>
                            Login
                          </button>
                        )}
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </>
      {/* <h1>Home</h1>
      <p>This is Home page</p> */}
      <div>
        {/* <div icon='sunny' >
          <span className='sun'></span>
        </div> */}
        {/* <div icon='cloudy'>
          <span className='cloud'></span>
          <span className='cloud'></span>
        </div>
        <RealTimeClock /> */}
        {/* <div icon='snowy' >
          <span className='snowman'></span>
        </div>

        <div icon='stormy' >
          <span className='cloud'></span>
        </div>
 */}
        {/* <div icon='supermoon' >
          <span className='moon'></span>
          <span className='meteor'></span>
        </div> */}
      </div>

      {/* <h2>Saved Searches:</h2>
      <ul>
        {searches.map((search, index) => (
          <li key={index}>{search.location}</li>
        ))}
      </ul> */}
      {/* <h2>Saved Searches:</h2>
      <ul>
        {searchHistory.map((search, index) => (
          <li key={index}>{search.location}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default Home;
