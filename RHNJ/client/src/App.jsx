// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signUp';
import AboutCharacters from './pages/AboutCharacters';
import AdminHome from './pages/adminHome';
import DMHome from './pages/dmHome';
import PlayerHome from './pages/playerHome';
import Navigations from './components/navigations';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/about-characters' component={AboutCharacters} />
        <Route path='/admin-home' component={AdminHome} />
        <Route path='/dm-home' component={DMHome} />
        <Route path='/player-home' component={PlayerHome} />
      </Switch>
    </Router>
  );
};

export default App;
