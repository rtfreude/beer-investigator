import React, { Component } from 'react';


class Marker extends Component {


  render() {
    return (
    <div>
      name={'Your position'}
      position={{lat: 37.762391, lng: -122.439192}}
      icon={{
        url: "/path/to/custom_icon.png",
        anchor: new google.maps.Point(32,32),
        scaledSize: new google.maps.Size(64,64)
      }}
    </div>
      )
    }
  }

export default Marker