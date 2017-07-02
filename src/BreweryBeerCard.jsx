import React, { Component } from 'react';

class BreweryBeerCard extends Component {
  render() {
    console.log('beer card props', this.props.breweryBeerArray)
    return (
      <div className="brewer-beer-card-main">
        <p className="brewery-beer-heading">Brewery Beer Offerings</p>
        {this.props.breweryBeerArray.map((beer, index) => (
          <div key={index} className="brewer-beer-card-ind">
            <p className="brewer-beer-name">{beer.name}</p>
            {/*<img className="beer-label" src={beer.labels.medium} alt="beer.jpg" />*/}
            <p className="brewer-beer-style"><em>{beer.style.shortName}</em></p>
          </div>
        ))}
      </div>
    )
  }
}

export default BreweryBeerCard;
