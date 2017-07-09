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
  }

  onUpdateInput(inputValue) {
    const self = this;
    this.setState({
      inputValue: inputValue
    }, function() {
      self.performSearch();
    });
  }

  componentDidMount() {

    this.beerCall(this.state.inputValue);
  }

  handleClick () {
    //console.log('input value: ', this.state.inputValue)
    this.beerCall(this.state.inputValue);
  }

  performSearch() {
    const self = this;

    if(this.state.inputValue !== '') {

      return $.get('/searchbeer', {inputValue: self.state.inputValue})
        .then((data) => {
          //console.log('performSearch', data)
          let retrievedSearchTerms = data.sort();
          //console.log('sort data', retrievedSearchTerms)
        self.setState({
          dataSource: retrievedSearchTerms
        });

      });
    }
  }

  beerCall() {

    return $.get('/beername', {beerRequest: this.state.inputValue})
    .then((data) => {
      //console.log('beerCall', data)

      let srm = (+data.data[0].style.srmMax+(+data.data[0].style.srmMin))/2;
      let fg = parseFloat((+data.data[0].style.fgMax+(+data.data[0].style.fgMin))/2).toFixed(4);

      if(!data.data[0].labels) {
        this.setState({
          beerName: data.data[0].name,
          displayName: data.data[0].name,
          beerDesc: data.data[0].description,
          beerTaste: data.data[0].style.description,
          beerImg: 'beer.jpg',
          beerStyle: data.data[0].style.shortName,
          beerAbv: data.data[0].abv,
          srmMax: srm,
          gravity: fg,
          ibu: data.data[0].ibu
        })
      } else {
        this.setState({
          beerName: data.data[0].name,
          displayName: data.data[0].name,
          beerDesc: data.data[0].description,
          beerTaste: data.data[0].style.description,
          beerImg: data.data[0].labels.medium,
          beerStyle: data.data[0].style.shortName,
          beerAbv: data.data[0].abv,
          srmMax: srm,
          gravity: fg,
          ibu: data.data[0].ibu
        })
      }
    });
  }





  render() {

    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (

      <div className="map-card">
       <div className="input-group">
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
      <div >
          <Map
            google={this.props.google}
            />
      </div>
    </div>
    )
  }
}

export default GoogleApiComponent({
  //apiKey: __GAPI_KEY__
  apiKey: "AIzaSyDHR1Y8UaP4Nk2eFLAimBRSG5EvSjlMvmg"
})(Container)


// render() {
//     return (
//       <div className="beer-card">
//         <div className="input-group">
//           <MuiThemeProvider muiTheme={getMuiTheme()}>
//             <AutoComplete
//               hintText          = "Input beer..."
//               dataSource        = {this.state.dataSource}
//               filter            = {AutoComplete.noFilter}
//               onTouchTap        = {this.handleClick}
//               onUpdateInput     = {this.onUpdateInput}
//               onNewRequest      = {this.handleClick}
//               floatingLabelText = "Input beer name and hit enter..."
//             />
//           </MuiThemeProvider>
//         </div>
//         <div className="beer-info">
//           <BeerDisplayInfo
//             beerName     = {this.state.beerName}
//             displayName  = {this.state.displayName}
//             beerDesc     = {this.state.beerDesc}
//             beerTaste    = {this.state.beerTaste}
//             beerImg      = {this.state.beerImg}
//             beerStyle    = {this.state.beerStyle}
//             beerAbv      = {this.state.beerAbv}
//             srmMax       = {this.state.srmMax}
//             gravity      = {this.state.gravity}
//             ibu          = {this.state.ibu}
//           />
//         </div>
//       </div>
//     );
//   }
// }