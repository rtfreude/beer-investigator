import React, { Component } from 'react';
class BreweryBeerCard extends Component {
  render() {
    return (
      <div className="brewer-beer-card-main">
        {this.props.breweryBeerArray.map((beer, index) => (
          <div key={index} className="brewer-beer-card-ind">
            <p>{beer.name}</p>
            <img className="beer-label" src={beer.labels.medium} alt="..." />
            <p>{beer.style.shortName}</p>
          </div>
        ))}
      </div>
    )
  }
}

export default BreweryBeerCard;
