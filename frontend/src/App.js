import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { auth } from "./components/Firebase";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, function (user) {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed in

        setUser(null);
      }
    });
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
