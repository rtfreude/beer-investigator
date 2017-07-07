import React, { Component } from 'react';
import $                    from 'jquery';
import { ProgressBar } from 'react-bootstrap';

class BeerDisplayInfo extends Component {

  render() {
    const maxAbv = 12;
    const maxIbu = 100;
    const maxGravity = 1.2;
    const minGravity = .08;
    const srmMax = 40;
    return (
      <div className="beer-info">
        <div className="beer-card-header">
          <p className="beer-name"><strong>{this.props.displayName}</strong></p>
          <p className="beer-type"><i>({this.props.beerStyle})</i></p>
          <img className="beer-label" src={this.props.beerImg} alt="..." />
        </div>

        <div className="beer-stats">
          <div className='beer-stats-inner'>
            <div className='beer-single-stat-left'>
              <p className="beer-stat-header"><strong>ABV</strong></p>
              <ProgressBar max={maxAbv} now={this.props.beerAbv} label={`${this.props.beerAbv}%`} />
              <div className="prog-labels">
                <p className="left-prog-label">Low</p>
                <p className="right-prog-label">High</p>
              </div>
            </div>
            <div className='beer-single-stat-right'>
              <p className="beer-stat-header"><strong>IBU</strong></p>

              <ProgressBar
                max={maxIbu} n
                now={this.props.ibu
                      ? this.props.ibu
                      : 100}
                label={`${this.props.ibu
                            ? this.props.ibu
                            : 'N/A'}%`} />
              <div className="prog-labels">
                <p className="left-prog-label">Smooth</p>
                <p className="right-prog-label">Bitter</p>
              </div>
            </div>
          </div>
          <div className="beer-stats-inner">
            <div className='beer-single-stat-left'>
              <p className="beer-stat-header"><strong>Gravity</strong></p>
              <ProgressBar min= {minGravity} max={maxGravity} now={this.props.gravity} label={`${this.props.gravity}%`} />
              <div className="prog-labels">
                <p className="left-prog-label">Low</p>
                <p className="right-prog-label">High</p>
              </div>
            </div>
            <div className='beer-single-stat-right'>
              <p className="beer-stat-header"><strong>SRM</strong></p>
              <ProgressBar max={srmMax} now={this.props.srmMax} label={`${this.props.srmMax}%`} />
              <div className="prog-labels">
                <p className="left-prog-label">Light</p>
                <p className="right-prog-label">Dark</p>
              </div>
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