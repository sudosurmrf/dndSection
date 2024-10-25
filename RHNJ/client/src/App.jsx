// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login.jsx';
import Signup from './components/signUp.jsx';
import AboutCharacters from './pages/AboutCharacters';
import AdminHome from './pages/adminHome';
import DMHome from './pages/dmHome';
import PlayerHome from './pages/playerHome';
import Navigations from './components/navigations';

const App = () => {
  return (
    <Router>
      <Navigations />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about-characters' element={<AboutCharacters />} />
        <Route path='/admin-home' element={<AdminHome />} />
        <Route path='/dm-home' element={<DMHome />} />
        <Route path='/player-home' element={<PlayerHome />} />
      </Routes>
    </Router>
  );
};

export default App;
