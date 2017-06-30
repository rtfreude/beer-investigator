import React, { Component } from 'react';
import $ from 'jquery';

import BreweryBeerCard from './BreweryBeerCard.jsx'

class BreweryCard extends Component {
  constructor(props) {
    super(props);
     this.state = {
      breweryName: "Blue Owl Brewing",
      displayName: "Blue Owl Brewing",
      website: 'http://blueowlbrewing.com',
      breweryImage: 'https://s3.amazonaws.com/brewerydbapi/brewery/P203ye/upload_bmzvY5-medium.png',
      brand: 'Craft',
      description: "It started with Jeff and Suzy. Jeff had mastered the art of sour-mashing beer and thought the scene was ready for it. Suzy was convinced the town needed a brewery as playful as it was innovative. They put Jessica in charge of making the beer look as good as it tasted, and Davy in charge of developing recipes.The result is Blue Owl. It’s our thing, but we’d like it to feel like your thing, too. Our aim is to make you feel welcome, whether you’re with us at the tap room or enjoying us in a can or pint glass.So join us, won’t you?",
      breweryId: 'P203ye',
      breweryBeerName: '',
      breweryBeerStyle: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.breweryCall(this.state.breweryName);
  }

  handleInputChange(event) {
    let input = event.target.value;
    console.log('handleinput: ', input)
    this.setState({breweryName: input})
  }

  handleClick () {
    console.log('handleclicked')
    this.componentDidMount();
  }

  breweryCall(userInput) {
    //make call to server
    const self = this;
    return $.get('/breweries',{breweryRequest: userInput})
      .then((data) => {
      console.log('breweryCall:', data)

      this.setState({
        breweryName: '',
        displayName: data.data[0].name,
        website: data.data[0].website,
        breweryImage: data.data[0].images.medium,
        brand: data.data[0].brandClassification,
        description: data.data[0].description,
        breweryId:data.data[0].id
      })
      self.beersCall()
    })

  }

  beersCall() {
    //make call to server

    return $.get('/brewerybeers',{breweryId: this.state.breweryId})
      .then((data) => {
       console.log('brewery Beer Call:', data)

      this.setState({
        breweryBeerName: data.data[0].name,
        breweryBeerStyle: data.style
      })
    })
  }


  render() {
    return (
      <div className="beer-card">
        <div className="input-group">
          <input
            type="text"
            value={this.state.breweryName}
            onChange={this.handleInputChange}
            className="form-control"
            placeholder="Search for brewery..." />
          <span className="input-group-btn">
          <button
            className="btn btn-default"
            onClick={this.handleClick}
            type="button">
            Find Brewery!
            </button>
          </span>
        </div>
      <div className="beer-info">
        <div className="beer-card-header">
          <p className="beer-name"><strong>{this.state.displayName}</strong></p>
          <p className="beer-type"><i>{this.state.website}</i></p>
          <img className="beer-label" src={this.state.breweryImage} alt="..." />
        </div>
        <br />
        <div className="brewery-stats">

            <div className='brewery-single-stat'>
              <p className="beer-stat-header"><strong>Brand Classification:</strong></p>
              <p className="beer-stat-data">{this.state.brand}</p>
            </div>
            <div className='brewery-single-stat'>
              <p className=""><strong>Description:</strong></p>
              <p className="beer-desc">{this.state.description}</p>
            </div>

        </div>
        <BreweryBeerCard
          beerName={this.state.displayName}
          breweryBeerName={this.state.breweryBeerName}
          breweryBeerStyle={this.state.breweryBeerStyle}
        />
      </div>
    </div>
    );
  }
}

export default BreweryCard;


