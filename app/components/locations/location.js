import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LocationList from './children/location_list.js';
import Header from './children/header.js';
import Calendar from './children/calendar.js';
import Map from './children/map.js';
import Info from './children/info.js';

class Location extends Component {
    render() {
        return (
          <div className="row">
              <div className="col-lg-3">

                <LocationList />

              </div>
              <div className="col-lg-6">
                <Header />

                <Calendar />

              </div>
              <div className="col-lg-3">
                <div className="row">

                  <Map />

                </div>
                <div className="row">

                  <Info />

                </div>
              </div>
          </div>
        )
    }
}

// Exporting this component as the default (only) export
export default Location;
