import './App.css';
import Ghanahomes from './components/Ghanahomes';

import GhanaHomeslogo from './GHANAHOMES (1).png';
import RegisterPage from './components/RegisterPage';
import React, { useState } from 'react';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Link } from 'react-router-dom';



firebase.initializeApp({
  // Add your Firebase config object here
  apiKey: "AIzaSyAHm1um8CA6qQ10xFMjA598qzk09iTLw_0",
  authDomain: "ghanahomes-a9d52.firebaseapp.com",
  databaseURL: "https://ghanahomes-a9d52-default-rtdb.firebaseio.com",
  projectId: "ghanahomes-a9d52",
  storageBucket: "ghanahomes-a9d52.appspot.com",
  messagingSenderId: "434930111143",
  appId: "1:434930111143:web:09cd359372a01369a68182",
  measurementId: "G-78KX8PDVYP"
});

function App() {
  const [hide, setHide] = useState(true);
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateForm = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // Redirect to Ghanahomes.js
        window.location.href = '/Ghanahomes';
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        setError(errorMessage);
      });
  };

  const handleMail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <div className="wrapper">
            <div className="content">
              <div className="logo">
                <img src={GhanaHomeslogo} alt="Ghana Homes Logo" />
              </div>
              <div className="c1">
                <span>Get your dream home on GhanaHomes</span>
              </div>
              <div className="form">
                {error && <div className="error">{error}</div>}
                <form onSubmit={validateForm}>
                  <div className="eInput">
                    <FontAwesomeIcon
                      className="icon"
                      icon={faUser}
                      style={{ color: '#003566' }}
                    />
                    <input
                      type="text"
                      id="input1"
                      placeholder="Enter Email Address"
                      onChange={handleMail}
                    />
                  </div>
                  <div className="eInput">
                    <FontAwesomeIcon
                      className="icon"
                      icon={faLock}
                      style={{ color: '#003566' }}
                    />
                    <input
                      type="password"
                      id="input2"
                      placeholder="Enter password"
                      onChange={handlePassword}
                    />
                  </div>
                  <div className="submit">
                    <button type="submit">Submit</button>
                    <Link to="/register">Register</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        } />
        <Route path="/Ghanahomes" element={<Ghanahomes />} />
        <Route path="/register" element={<RegisterPage />} />
</Routes>
</div>
);
}

export default App;
