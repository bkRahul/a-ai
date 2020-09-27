import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapContainer = ({ lat, lon, google }) => {
  const mapStyles = {
    width: '100%',
    height: '100%',
  };

  return (
    <div className="map">
      {this.props.lat && this.props.lon && (
        <Map
          google={this.props.google}
          zoom={10}
          style={mapStyles}
          center={{ lat: this.props.lat, lng: this.props.lon }}
          initialCenter={{ lat: this.props.lat, lng: this.props.lon }}
        >
          <Marker position={{ lat: this.props.lat, lng: this.props.lon }} />
        </Map>
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBJAX_DQYM7ovn7-K6k74A7j8hXKtMOLjc',
})(MapContainer);
