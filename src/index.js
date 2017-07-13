import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import App from './App.jsx';
import Container from './Container.jsx';
import BreweryCard from './BreweryCard.jsx';
import BeerCard from './BeerCard.jsx';

/*ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();*/

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/container" component={Container} />
    <Route path="/beercard" component={BeerCard} />
    <Route path="/brewerycard" component={BreweryCard} />
  </Router>
  ,
  document.getElementById('root')
);
registerServiceWorker();