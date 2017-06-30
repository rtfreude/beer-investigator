import React, { Component } from 'react';
import $                    from 'jquery';
import { AutoComplete }     from 'material-ui';
import getMuiTheme          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider     from 'material-ui/styles/MuiThemeProvider';


var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

class BeerCard extends Component {
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
      dataSource : [],
      inputValue : 'Naughty 90'
    }
    //this.handleInputChange = this.handleInputChange.bind(this);
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

  // handleInputChange(event) {
  //   let input = event.target.value;
  //   this.setState({beerName: input})
  // }

  handleClick () {
    //console.log('input value: ', this.state.inputValue)
    this.beerCall(this.state.inputValue);
  }

  performSearch() {
    const self = this;

    if(this.state.inputValue !== '') {

      return $.get('/search', {inputValue: self.state.inputValue})
        .then((data) => {
          //console.log('performSearch', data)
          let retrievedSearchTerms = data;

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
    });
  }

  render() {
    return (
      <div className="beer-card">

        <div className="input-group">
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <AutoComplete
              hintText          = "Be careful with spelling..."
              dataSource        = {this.state.dataSource}
              filter            = {AutoComplete.noFilter}
              onTouchTap        = {this.handleClick}
              onUpdateInput     = {this.onUpdateInput}
              onNewRequest      = {this.handleClick}
              floatingLabelText = "Enter beer name..."
            />
          </MuiThemeProvider>

        </div>
      <div className="beer-info">
        <div className="beer-card-header">
          <p className="beer-name"><strong>{this.state.displayName}</strong></p>
          <p className="beer-type"><i>({this.state.beerStyle})</i></p>
          <img className="beer-label" src={this.state.beerImg} alt="..." />
        </div>
        <br />
        <div className="beer-stats">
          <div className='beer-stats-inner'>
            <div className='beer-single-stat'>
              <p className="beer-stat-header">ABV:</p>
              <p className="beer-stat-data">{this.state.beerAbv}%</p>
            </div>
            <div className='beer-single-stat'>
              <p className="beer-stat-header">IBU:</p>
              <p className="beer-stat-data">{this.state.ibu}</p>
            </div>
          </div>
          <div className="beer-stats-inner">
            <div className='beer-single-stat'>
              <p className="beer-stat-header">Gravity:</p>
              <p className="beer-stat-data">{this.state.gravity}</p>
            </div>
            <div className='beer-single-stat'>
              <p className="beer-stat-header">SRM: </p>
              <p className="beer-stat-data">{this.state.srmMax}</p>
            </div>
          </div>
        </div>
          <div>
            <p className=''><strong>Description</strong></p>
            <p className='beer-desc'>{this.state.beerDesc}</p>
          </div>
      </div>
    </div>
    );
  }
}

export default BeerCard;
