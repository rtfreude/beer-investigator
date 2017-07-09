import React, { Component } from 'react';
import './App.css';

import BeerCard from './BeerCard.jsx'
import BreweryCard from './BreweryCard.jsx'
import Container from './Container'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container />
        <BeerCard />
        <BreweryCard />
      </div>
    );
  }
}

export default App;
