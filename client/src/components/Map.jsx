import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';
//getting started with render parks
import * as parksData from '../../src/nationalparksdata.json';
const WrapMe = function() {
  return (
    <GoogleMap
      defaultZoom={4}
      defaultCenter={{ lat: 37.0902, lng: -95.7129 }}
    >
      {parksData.map((park) => (
        <Marker key={park.id} position={{
          lat: park.coordinates.latitude,
          lng: park.coordinates.longitude
        }} />
      ))}
    </GoogleMap>
  );
};

const Map = withScriptjs(withGoogleMap(WrapMe));

export default Map;
