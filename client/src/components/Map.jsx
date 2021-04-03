import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

const WrapMe = function() {
  return (
    <GoogleMap
      defaultZoom={4}
      defaultCenter={{ lat: 37.0902, lng: -95.7129 }}
    />
  );
};

const Map = withScriptjs(withGoogleMap(WrapMe));

export default Map;
