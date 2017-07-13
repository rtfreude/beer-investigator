import React, { Component } from 'react';
import './App.css';

import BeerCard from './BeerCard.jsx'
import BreweryCard from './BreweryCard.jsx'
import Container from './Container'
import LandingPage from './startbootstrap-stylish-portfolio-gh-pages/LandingPage.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <LandingPage />
      </div>
    );
  }
}

export default App;