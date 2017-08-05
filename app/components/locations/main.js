import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LocationList from './location_list.js';
import Header from './header.js';
import Calendar from './calendar.js';
import Map from './map.js';
import Info from './info.js';

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
