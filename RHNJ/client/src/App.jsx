import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // pulled Switch out of import************
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
    <nav>
      <ul>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/signup'>Signup</Link>
        </li>
        <li>
          <Link to='/about-characters'>About Characters</Link>
        </li>
        <li>
          <Link to='/admin-home'>Admin Home</Link>
        </li>
        <li>
          <Link to='/dm-home'>DM Home</Link>
        </li>
        <li>
          <Link to='/player-home'>Player Home</Link>
        </li>
      </ul>
    </nav>
<Router>
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
    </Router>
    </div>
  );
};

export default App;
