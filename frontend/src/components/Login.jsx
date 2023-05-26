import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../components/Firebase";
import "../css/Login.scss";

import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        alert("Invalid email or password");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const onGoogleLogin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        navigate("/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <div className='formulario'>
        <form>
          <div className='formularioemail'>
            <label htmlFor='email-address'>Email address</label>
            <input
              id='email-address'
              name='email'
              type='email'
              required
              placeholder='Email address'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='formulariopassword'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              name='password'
              type='password'
              required
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='formulariobotones'>
            <button onClick={onLogin}>Login</button>
            <button onClick={onGoogleLogin}>Login with google</button>
          </div>
        </form>

        <p className='text-sm text-white text-center'>
          No account yet? <NavLink to='/signup'>Sign up</NavLink>
        </p>
      </div>
    </>
  );
};

export default Login;
