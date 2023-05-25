import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase";
import { useNavigate } from "react-router-dom";
import "../css/home.css";
import Buscador from "./Buscador";
import RealTimeClock from "./RealTimeClock";

const Home = ({ user, searches }) => {
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

  return (
    <div className='home'>
      <>
        <nav>
          <p>Welcome Home {user ? getUsername(user.email) : "Guest"}</p>
          <div>
            {user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <button onClick={() => navigate("/login")}>Login</button>
            )}
          </div>
        </nav>
      </>
      {/* <h1>Home</h1>
      <p>This is Home page</p> */}
      <div>
        {/* <div icon='sunny' >
          <span class='sun'></span>
        </div> */}
        <div icon='cloudy'>
          <span class='cloud'></span>
          <span class='cloud'></span>
        </div>

        {/* <div icon='snowy' >
          <span class='snowman'></span>
        </div>

        <div icon='stormy' >
          <span class='cloud'></span>
        </div>
 */}
        {/* <div icon='supermoon' >
          <span class='moon'></span>
          <span class='meteor'></span>
        </div> */}
      </div>
      <Buscador />
      <RealTimeClock />

      <h2>Saved Searches:</h2>
      <ul>
        {searches.map((search, index) => (
          <li key={index}>{search.location}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
