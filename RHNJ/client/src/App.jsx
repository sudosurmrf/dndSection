import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // pulled Switch out of import************
import Login from "./components/login";
import Signup from "./components/signUp";
import AboutCharacters from "./pages/AboutCharacters";
import AdminHome from "./pages/administratorHome";
import DMHome from "./pages/dmHome";
import PlayerHome from "./pages/playerHome";
import Navigations from "./components/navigations";


function App() {   
  return (
<Router>
      <Routes>
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/about-characters' component={AboutCharacters} />
        <Route path='/admin-home' component={AdminHome} />
        <Route path='/dm-home' component={DMHome} />
        <Route path='/player-home' component={PlayerHome} />
      </Routes>
    </Router>
  );
};

export default App;
