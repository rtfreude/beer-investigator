const express = require('express');
const morgan = require('morgan');
const path = require('path');
const request = require('request')

const app = express();
const API_KEY = require('./secrets')
const fetch = require('./fetch-fill')

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

//used to search beers by name and return certain data
app.get('/beername', (req, res) => {
  let userReq = req.query.beerRequest;

  var url = 'http://api.brewerydb.com/v2/beers?key=' + API_KEY + '&name='+ userReq;

  request(url, function(err, resp, body) {
    let parsedBody = JSON.parse(body);
    res.send(parsedBody);
  })

});

app.get('/search', (req, res) => {
  console.log(req.query.beerRequest)
  let userReq = req.query.inputValue; //hardcoded search criteria, I would Exptect 'Naughty 90' to be one of the results
  let allBeers = [];  //array to be returned to the user
console.log(API_KEY)
  const getAllBeers = function(page) {
    let pageNum = page || 1;
    let beers = [];

    let url = 'http://api.brewerydb.com/v2/search?key=' + API_KEY + '&q=' + userReq + '&type=beer&p=' + pageNum;

    fetch(url)
      .then(res => res.json())
      .then(body => {
        if (!body.data) {
          return beers;
        }
        for(let j = 0; j < body.data.length; j++) {
          beers.push(body.data[j].name);
        }
      return beers;
    }).then(beers => {
      if (!beers.length) {
        var flattened = [].concat.apply([], allBeers); //used to flatten the returned arrays
        var sort = flattened.sort(function(a,b) {return a-b})
        res.send(sort);
        return;

      } else if (pageNum >= 5) {
        var flattened = [].concat.apply([], allBeers);
        var sort = flattened.sort(function(a,b) {return a-b})
        res.send(sort);
        return;

      } else {
        allBeers.push(beers);
        getAllBeers(pageNum + 1);
      }
    });
  };
  getAllBeers(1); //start query on page 1
});

app.get('/breweries', (req, res) => {
  let userReq = req.query.breweryRequest;

  let url = 'http://api.brewerydb.com/v2/breweries?key=' + API_KEY + '&name=' + userReq;
  request(url, function(err, resp, body) {
    let parsedBody = JSON.parse(body);
    console.log('serverbrew:', parsedBody)
    res.send(parsedBody);
  })
});

app.get('/brewerybeers', (req, res) => {
  let userReq = req.query.breweryId;

  let url = 'http://api.brewerydb.com/v2/brewery/'+ userReq +'/beers?key=' + API_KEY
  request(url, function(err, resp, body) {
    let parsedBody = JSON.parse(body);
    console.log('brewery beers:', parsedBody)
    res.send(parsedBody);
  })

});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
