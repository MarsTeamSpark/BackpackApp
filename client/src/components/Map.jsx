/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
//getting started with render parks
import * as parksData from '../../src/nationalparksdata.json';
const WrapMe = function(props) {
  const [selectedPark, setSelectedPark] = useState(null);
  // eslint-disable-next-line react/destructuring-assignment
  //console.log(props.test);
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
    </GoogleMap>
  );
};

const Map = withScriptjs(withGoogleMap(WrapMe));

export default Map;
