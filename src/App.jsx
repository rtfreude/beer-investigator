import React, { Component } from 'react';
import './App.css';

import BeerCard from './BeerCard.jsx'
import BreweryCard from './BreweryCard.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BeerCard />
        <BreweryCard />
      </div>
    );
  }
}

export default App;
