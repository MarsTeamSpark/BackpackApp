/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
//getting started with render parks
const WrapMe = function(props) {
  const [selectedPark, setSelectedPark] = useState(null);
  // eslint-disable-next-line react/destructuring-assignment
  const parksData = props.parks;
  return (
    <GoogleMap
      // eslint-disable-next-line react/destructuring-assignment
      zoom={props.zoom}
      // eslint-disable-next-line react/destructuring-assignment
      center={props.center}

    >
      {parksData.map((park) => (
        <Marker
          key={park.id}
          position={{
            lat: park.coordinates.latitude,
            lng: park.coordinates.longitude
          }}
          onClick={() => {
            setSelectedPark(park);
          }}
          icon={{
            //url: '/assets/img/couch.svg',
            url: '/assets/img/tree.png',
            // eslint-disable-next-line no-undef
            scaledSize: new google.maps.Size(25, 25)
          }}
        />
      ))}
      {selectedPark && (
        <InfoWindow
          position={{
            lat: selectedPark.coordinates.latitude,
            lng: selectedPark.coordinates.longitude
          }}
          onCloseClick={() => {
            setSelectedPark(null);
          }}
        >
          <div>
            <h2>{selectedPark.title}</h2>
            <p>{selectedPark.description}</p>
          </div>
        </InfoWindow>
      )}
      {props.route.map((point, index) => (
        <Marker
          key={index}
          position={{
            lat: point[1],
            lng: point[0]
          }}
          onClick={() => {
            props.reCenter(point[1], point[0], 10);
          }}
        />
      ))}
    </GoogleMap>
  );
};

const Map = withScriptjs(withGoogleMap(WrapMe));

export default Map;
