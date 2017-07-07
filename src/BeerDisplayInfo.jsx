import React, { Component } from 'react';
import $                    from 'jquery';
import { ProgressBar } from 'react-bootstrap';

class BeerDisplayInfo extends Component {

  render() {
    const maxAbv = 12;
    return (
      <div className="beer-info">
        <div className="beer-card-header">
          <p className="beer-name"><strong>{this.props.displayName}</strong></p>
          <p className="beer-type"><i>({this.props.beerStyle})</i></p>
          <img className="beer-label" src={this.props.beerImg} alt="..." />
        </div>

        <div className="beer-stats">
          <div className='beer-stats-inner'>
            <div className='beer-single-stat'>
              <p className="beer-stat-header">ABV:</p>
              <p><ProgressBar max={maxAbv} now={this.props.beerAbv} label={`${this.props.beerAbv}%`} /></p>
            </div>
            <div className='beer-single-stat'>
              <p className="beer-stat-header">IBU:</p>
              <p className="beer-stat-data">{this.props.ibu}</p>
            </div>
          </div>
          <div className="beer-stats-inner">
            <div className='beer-single-stat'>
              <p className="beer-stat-header">Gravity:</p>
              <p className="beer-stat-data">{this.props.gravity}</p>
            </div>
            <div className='beer-single-stat'>
              <p className="beer-stat-header">SRM: </p>
              <p className="beer-stat-data">{this.props.srmMax}</p>
            </div>
          </div>
        </div>
          <div>
            <p className=''><strong>Description</strong></p>
            <p className='beer-desc'>{this.props.beerDesc}</p>
          </div>
      </div>
    );
  }
}

export default BeerDisplayInfo;