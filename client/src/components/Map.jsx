/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
//getting started with render parks
const WrapMe = function(props) {
  const [selectedPark, setSelectedPark] = useState(null);
  const [selectedCouch, setSelectedCouch] = useState(null);
  // eslint-disable-next-line react/destructuring-assignment
  const parksData = props.parks;
  console.log('hello from maps');
  console.log(props.loggedIn, props.userName, props.email, props.id);
  console.log(props.couches);

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
      {props.couches.map((couch) => (
        <Marker
          key={couch._id}
          position={{
            lat: couch.lat,
            lng: couch.long
          }}
          onClick={() => {
            setSelectedCouch(couch);
          }}
          icon={{
            url: '/assets/img/couch.svg',
            //url: '/assets/img/tree.png',
            // eslint-disable-next-line no-undef
            scaledSize: new google.maps.Size(40, 40)
          }}
        />
      ))}
      {props.hostels.map(hostel => (
        <Marker
          key={hostel.place_id}
          position={{
            lat: hostel.geometry.location.lat,
            lng: hostel.geometry.location.lng
          }}
        />
      ))}
      {selectedCouch && (
        <InfoWindow
          position={{
            lat: selectedCouch.lat,
            lng: selectedCouch.long
          }}
          onCloseClick={() => {
            setSelectedCouch(null);
          }}
        >
          <div>
            <h2>{selectedCouch.name}</h2>
            <p>{selectedCouch.address}</p>
            <p>{selectedCouch.phone}</p>
          </div>
        </InfoWindow>
      )}

    </GoogleMap>
  );
};

const Map = withScriptjs(withGoogleMap(WrapMe));

export default Map;
