import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import MapContainer from './components/MapContainer/MapContainer';
import { Form } from './components/Form/Form';

class App extends Component {
  state = {
    data: '',
    stateNames: '',
    cityNames: '',
    city: false,
    lat: '',
    lon: '',
    error: '',
    message: 'Please Select a State',
  };

  componentDidMount() {
    axios
      .get(`https://a-ai-d7b83.firebaseio.com/states.json`)
      .then(response => {
        var filterStates = response.data.map(function (item) {
          return item.state;
        });
        this.setState({
          data: response.data,
          stateNames: filterStates,
          error: '',
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getCities = e => {
    const STATE_NAME = e.target.value;

    axios
      .get(`https://a-ai-d7b83.firebaseio.com/states.json`)
      .then(response => {
        var filterCities = response.data
          .filter(function (item) {
            return item.state === STATE_NAME;
          })[0]
          .districts.map(item => {
            return item;
          });

        this.setState({
          cityNames: filterCities,
          error: '',
          message: 'Please Select a City',
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: 'No Cities Found',
        });
      });
  };

  getLocation = e => {
    const API_KEY = 'K2J9SmHHAOvyz8OxflzZKy35AoaEbMWg';
    const CITY = e.target.value;

    axios
      .get(
        `https://api.tomtom.com/search/2/geocode/${CITY}.json?key=${API_KEY}`
      )
      .then(response => {
        console.log(response.data.results[0].position.lat);
        this.setState({
          lat: response.data.results[0].position.lat,
          lon: response.data.results[0].position.lon,
          message: '',
          city: true,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="App container-fluid">
        <div className="row no-gutters Alt-Row">
          <div className="col-md-12 col-lg-6 d-flex align-items-center justify-content-center">
            <Form
              getCities={this.getCities}
              getLocation={this.getLocation}
              stateNames={this.state.stateNames}
              cityNames={this.state.cityNames}
            />
          </div>
          <div className="col-md-12 col-lg-6">
            {this.state.city ? (
              <div className="map">
                <MapContainer lat={this.state.lat} lon={this.state.lon} />
              </div>
            ) : (
              <h2 className="Map-Message">{this.state.message}</h2>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
