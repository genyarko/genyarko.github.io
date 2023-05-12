import React, { useState } from "react";
import "./RegisterPage.css";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";

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
function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, password, fullName } = formData;

    // Create new user in Firebase Authentication service
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid;

        // Store additional user information in Firebase Realtime Database
        firebase
          .database()
          .ref("UserProfile/" + userId)
          .set({
            username,
            email,
            fullName,
          })
          .then(() => {
            // Registration successful
            console.log("Registration successful");
            window.location.replace("/"); // Redirect to login page
          })
          .catch((error) => {
            console.error("Error writing user data: ", error);
          });
      })
      .catch((error) => {
        console.error("Error creating user: ", error);
      });
  };

  return (
    <div className="register-page">
      <h1 className="logo">Register</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleFormChange}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleFormChange}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleFormChange}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleFormChange}
        />

        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleFormChange}
        />

        <button type="submit">Register</button>
        <Link to="/">
          <button type="button">Sign in</button>
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;
