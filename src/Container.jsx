import React from 'react';
import Map from './Map.jsx';
import GoogleApiComponent from './GoogleApiComponent'
import $                    from 'jquery';
import { AutoComplete }     from 'material-ui';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';

export class Container extends React.Component {

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

    }
    })
  }

  render() {

    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (

      <div className="map-card">
      {/* <div className="input-group">
         <MuiThemeProvider muiTheme={getMuiTheme()}>
           <AutoComplete
             hintText          = "Input beer..."
               dataSource        = {this.state.dataSource}
               filter            = {AutoComplete.noFilter}
               onTouchTap        = {this.handleClick}
               onUpdateInput     = {this.onUpdateInput}
               onNewRequest      = {this.handleClick}
               floatingLabelText = "Input beer name and hit enter..."
             />
           </MuiThemeProvider>
        </div>
      <div >*/}
          <Map
            google={this.props.google}
            />
      </div>

    )
  }
}

export default GoogleApiComponent({
  //apiKey: __GAPI_KEY__
  apiKey: "AIzaSyDHR1Y8UaP4Nk2eFLAimBRSG5EvSjlMvmg"
})(Container)
