import React, { Component } from 'react';
import $ from 'jquery';
import { AutoComplete }     from 'material-ui';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';

//import BeerDisplayInfo      from './BeerDisplayInfo.jsx'
import BreweryBeerCard from './BreweryBeerCard.jsx';
import ModalBeer from './ModalBeer.jsx'

// var injectTapEventPlugin = require("react-tap-event-plugin");
// injectTapEventPlugin();

class BreweryCard extends Component {
  constructor(props) {
    super(props);
     this.state = {
      breweryName: "Blue Owl Brewing",
      breweDisplayName: "Blue Owl Brewing",
      website: 'http://blueowlbrewing.com',
      breweryImage: 'https://s3.amazonaws.com/brewerydbapi/brewery/P203ye/upload_bmzvY5-medium.png',
      brand: 'Craft',
      description: "It started with Jeff and Suzy. Jeff had mastered the art of sour-mashing beer and thought the scene was ready for it. Suzy was convinced the town needed a brewery as playful as it was innovative. They put Jessica in charge of making the beer look as good as it tasted, and Davy in charge of developing recipes.The result is Blue Owl. It’s our thing, but we’d like it to feel like your thing, too. Our aim is to make you feel welcome, whether you’re with us at the tap room or enjoying us in a can or pint glass.So join us, won’t you?",
      breweryId: 'P203ye',
      breweryBeerName: '',
      breweryBeerStyle: '',
      breweryBeerLabel: '',
      breweryBeerArray: [],
      dataSource : [],
      inputValue : 'Blue Owl Brewing',
      showModal: false,
      beerName: 'Naughty 90',
      displayName: 'Naughty 90',
      beerDesc: '',
      beerTaste: '',
      beerImg: "http://via.placeholder.com/200x200",
      beerStyle: '',
      beerAbv: 0,
      srmMax: 0,
      gravity: 0,
      dataSource: [],
      inputValue: 'Naughty 90'
    }
    this.handleBeerClick = this.handleBeerClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.breweryCall = this.breweryCall.bind(this)
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
    this.setState({showModal: false})
  }

  open() {
    this.setState({showModal: true})
  }

  componentDidMount() {
    this.breweryCall(this.state.breweryName);
    this.beersCall();
  }

  handleInputChange(event) {
    let input = event.target.value;
    //console.log('handleinput: ', input)
    this.setState({breweryName: input})
  }

  onUpdateInput(inputValue) {
    const self = this;
    this.setState({
      inputValue: inputValue
    }, function() {
      self.performSearch();
    });
  }

  performSearch() {
    const self = this;

    if(this.state.inputValue !== '') {

      return $.get('/searchbrewery', {inputValue: self.state.inputValue})
        .then((data) => {
          console.log('performSearch', data)
          let retrievedSearchTerms = data.sort();
          console.log('sort data', retrievedSearchTerms)
        self.setState({
          dataSource: retrievedSearchTerms
        });

      });
    }
  }

  handleBeerClick(beer) {
    //const self = this;
    console.log('clicked', beer.name)
    //this.state.inputValue = beer.name
    return $.get('/beername', {beerRequest: beer.name})
    .then((data) => {
      console.log('beerCall', data)
      let srm;
      let fg;
      let description;
      let taste;
      let shortName;
      let abv;
      let image;

      if(data.data[0].style !== undefined) {
        srm = (+data.data[0].style.srmMax+(+data.data[0].style.srmMin))/2;
        taste = data.data[0].style.description;
        shortName = data.data[0].style.shortName;
      } else {
        srm = 'No SRM'
        taste = 'No Description'
        shortName = 'No Name'
      }

      if(data.data[0].style !== undefined) {
        fg = parseFloat((+data.data[0].style.fgMax+(+data.data[0].style.fgMin))/2).toFixed(4);
      } else {
        fg = 'No fg'
      }

      if(data.data[0].description !== undefined) {
        description = data.data[0].description;
      } else {
        description = 'No description available...'
      }

      if(data.data[0].labels !== undefined) {
        image = data.data[0].labels.medium;
      } else {
        image = 'beer.jpg'
      }

        this.setState({
          showModal: !this.state.showModal,
          beerName: data.data[0].name,
          displayName: data.data[0].name,
          beerDesc: description,
          beerTaste: taste,
          beerImg: image,
          beerStyle: shortName,
          beerAbv: data.data[0].abv,
          srmMax: srm,
          gravity: fg,
          ibu: data.data[0].ibu
        })

  })
  }

  handleClick () {
    //console.log('handleclicked')
    //this.componentDidMount();
    this.breweryCall(this.state.inputValue);
  }

  breweryCall(userInput) {
    //make call to server
    const self = this;
    console.log('breweryCall INputvalue',this.state.inputValue)
    return $.get('/breweries',{breweryRequest: this.state.inputValue})
      .then((data) => {
      console.log('breweryCall:', data)

      if(!data.data[0].images) {
      this.setState({
        breweryName: '',
        brewDisplayName: data.data[0].name,
        website: data.data[0].website,
        breweryImage: "beer.jpg",
        brand: data.data[0].brandClassification,
        description: data.data[0].description,
        breweryId:data.data[0].id
      })
      self.beersCall()
    }else{
      this.setState({
        breweryName: '',
        brewDisplayName: data.data[0].name,
        website: data.data[0].website,
        breweryImage: data.data[0].images.medium,
        brand: data.data[0].brandClassification,
        description: data.data[0].description,
        breweryId:data.data[0].id
      })
      self.beersCall()
    }
    })

  }

  beersCall() {
    //make call to server
    console.log('BEERSSSS CAAAALLLL', this.state.breweryId)
    return $.get('/brewerybeers',{breweryId: this.state.breweryId})
      .then((data) => {
       console.log('brewery Beer Call:', data)
      this.setState({
        breweryBeerArray: data.data
      })
    })
  }



  render() {
    return (
      <div className="brewery-card">
        <div className="input-group">
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <AutoComplete
              hintText          = "Input brewery name..."
              dataSource        = {this.state.dataSource}
              filter            = {AutoComplete.noFilter}
              onTouchTap        = {this.handleClick}
              onUpdateInput     = {this.onUpdateInput}
              onNewRequest      = {this.handleClick}
              floatingLabelText = "Input brewery name and hit enter..."
            />
          </MuiThemeProvider>

        </div>

      <div className="beer-info">
        <div className="beer-card-header">
          <p className="beer-name"><strong>{this.state.brewDisplayName}</strong></p>
          <p className="beer-type"><i>{this.state.website}</i></p>
          <img className="brewery-label" src={this.state.breweryImage} alt="..." />
        </div>

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
          className="brewer-beer-container"
          handleBeerClick={this.handleBeerClick}
          breweryBeerArray={this.state.breweryBeerArray}
        />
        {
          this.state.showModal
            ? <ModalBeer
              showModal={this.state.showModal}
              close={this.close}
              open={this.open}
              beerName     = {this.state.beerName}
              displayName  = {this.state.displayName}
              beerDesc     = {this.state.beerDesc}
              beerTaste    = {this.state.beerTaste}
              beerImg      = {this.state.beerImg}
              beerStyle    = {this.state.beerStyle}
              beerAbv      = {this.state.beerAbv}
              srmMax       = {this.state.srmMax}
              gravity      = {this.state.gravity}
              ibu          = {this.state.ibu}
            />
            : null
        }
      </div>
    </div>
    );
  }
}

export default BreweryCard;
