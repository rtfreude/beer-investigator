import React from 'react';
import ReactDOM from 'react-dom';



class Map extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      userInput: '',
      map: '',
      infowindow: ''
    }
    this.callback = this.callback.bind(this)
    this.createMarker= this.createMarker.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.initAutocomplete();
    }
  }

  componentDidMount() {
    this.initAutocomplete();
  }


initAutocomplete() {
  const self = this;

        const node = ReactDOM.findDOMNode(this.refs.map)
        this.state.map = new self.props.google.maps.Map(node, {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 16,
          mapTypeId: 'roadmap'
        });
        // Create the search box and link it to the UI element.
        var input = ReactDOM.findDOMNode(self.refs.inputBox);
        var searchBox = new self.props.google.maps.places.SearchBox(input);
        this.state.map.controls[self.props.google.maps.ControlPosition.TOP_RIGHT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        this.state.map.addListener('bounds_changed', function() {
          searchBox.setBounds(self.state.map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new self.props.google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }





            self.state.infowindow = new self.props.google.maps.InfoWindow();

            var service = new self.props.google.maps.places.PlacesService(self.state.map);

              service.textSearch({
                query: 'breweries',
                location: place.geometry.location,
                radius: 500

              }, self.callback);


            // Create a marker for each place..NOTE: this is for the city marker only
            markers.push(new self.props.google.maps.Marker({
              map: self.state.map,
              icon: place.icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          self.state.map.fitBounds(bounds);

      })
      }


  callback(results, status) {
    //console.log('results', results, status)
    const self = this;
    if (status === self.props.google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        self.createMarker(results[i]);
      }
    }
  }

  createMarker(place) {
    const self = this;
    //console.log('place', place)

    var image = {
      url: 'http://www.icon100.com/up/2403/32/beer.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new self.props.google.maps.Size(32, 32),
      // The origin for this image is (0, 0).
      origin: new self.props.google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new self.props.google.maps.Point(0, 32)
    };

    var placeLoc = place.geometry.location;
    var marker = new self.props.google.maps.Marker({
      icon: image,
      map: self.state.map,
      position: place.geometry.location
    });
    //console.log('placeLod', placeLoc)
    //console.log('marker', marker)
    self.props.google.maps.event.addListener(marker, 'click', function() {
      self.state.infowindow.setContent(place.name);
      self.state.infowindow.setPosition(place.geometry.location)
      self.state.infowindow.open(self.state.map, marker.map);
    });
  }


  render() {

    return (
      <div>
        <input id="pac-input" ref='inputBox' className="controls" type="text" placeholder="Search Box" />
        <div className="map" ref='map'>

          Loading map...

        </div>
      </div>
    )
  }
}

export default Map;








