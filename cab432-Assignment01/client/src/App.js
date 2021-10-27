import './css/App.css';
import Nav from './nav/navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import Home from './Pages/Home'
import Rankings from './Pages/Rankings';
import AnimeInfo from './Pages/AnimeInfo';
import React from 'react';

function App() {
  return (
    <div className="app-div">
      <Router>
        <Nav /> 
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rankings" exact component={Rankings} />
            <Route path="/anime/:mangaID" exact component={AnimeInfo} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
