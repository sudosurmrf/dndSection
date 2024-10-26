import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // pulled Switch out of import************
import Login from "./components/Login";
import Signup from "./components/SignUp";
import AboutCharacters from "./pages/AboutCharacters";
import AdminHome from "./pages/administratorHome";
import DMHome from "./pages/dmHome";
import PlayerHome from "./pages/playerHome";
import Navigations from "./components/Navigations";
import Home from "./components/Home";

function App() {   
  return (
    <div>
    <Routes>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about-characters' element={<AboutCharacters/>} />
        <Route path='/admin-home' element={<AdminHome/>} />
        <Route path='/dm-home' element={<DMHome/>} />
        <Route path='/player-home' element={<PlayerHome/>} />
        <Route path='/navigations' element={<Navigations/>} />
        <Route path='/' element={<Home/>} />
      </Routes>
    </div>   
  );
};

export default App;
