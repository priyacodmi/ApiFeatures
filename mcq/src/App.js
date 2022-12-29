import React, { useState, useEffect } from "react";
import Registration from "./Components/Registration/Registration";
import "./App.css";
import SignIn from "./Components/Pages/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/home/home"
import Question from "./Components/questions";
import Header from "./Components/header";
import AdminPage from "./Components/adminPage/index";
import ClientPage from "./Components/clientPage/index";
import AllUsers from "Components/adminPage/Helper/GetAllUsers";
import { AllClients } from "Components/adminPage/Helper/GetAllClients";
import HomePage from "Components/homePage";
import UserTrail from "./Components/trail/userTrail";
import ClientTrail from "./Components/trail/clientTrail";
import UserPage from "./Components/userPage/userPage";



function App() {
  return (
    <Router>
      <div>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/userTrail" element={<UserTrail />} />
            <Route path="/clientTrail" element={<ClientTrail />} />
            <Route path="/question" element={<Question />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/client" element={<ClientPage />} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
