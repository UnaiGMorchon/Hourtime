import logo from "./logo.svg";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

import HorasMundo from "./components/HorasMundo";
import Prediction from "./components/Prediction";
import { AppProvider } from "./components/AppContext";

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
