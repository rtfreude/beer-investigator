import React, { Component } from 'react';

class BreweryBeerCard extends Component {

  render() {
    console.log('props:  ',this.props)
    return (
      <div className="beer-card">

      <div className="beer-info">
        <div className="beer-card-header">
          <p className="beer-name"><strong>{this.props.breweryBeerName}</strong></p>
          <p className="beer-type"><i></i></p>
          <img className="beer-label" src='' alt="..." />
        </div>
        <br />
        <div className="beer-stats">
          <div className='beer-stats-inner'>
            <div className='beer-single-stat'>
              <p className="beer-stat-header">Beer Style</p>
              <p className="beer-stat-data">{this.props.breweryBeerStyle}</p>
            </div>
            <div className='beer-single-stat'>
              <p className="beer-stat-header">IBU:</p>
              <p className="beer-stat-data"></p>
            </div>
          </div>
          <div className="beer-stats-inner">
            <div className='beer-single-stat'>
              <p className="beer-stat-header">Gravity:</p>
              <p className="beer-stat-data"></p>
            </div>
            <div className='beer-single-stat'>
              <p className="beer-stat-header">SRM: </p>
              <p className="beer-stat-data"></p>
            </div>
          </div>
        </div>
          <div>
            <p className=''><strong>Description</strong></p>
            <p className='beer-desc'></p>
          </div>
      </div>
    </div>
    );
  }
}

export default BreweryBeerCard;