import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LocationList from './children/location_list.js';
import Header from './children/header';
import Calendar from './children/calendar';
import Map from './children/map';
import Info from './children/info';

class Location extends Component {

    render() {
        return (
          <div class="row">
              <div class="col-lg-3">

                {/* list component */}
                <LocationList />

              </div>
              <div class="col-lg-6">
                    <Header />

                    <Calendar />

              </div>
              <div class="col-lg-3">
                <div class="row">

                  {/* Map component */}
                  <Map />

                </div>
                <div class="row">

                  {/* info Component */}
                  <Info />

                </div>
              </div>
          </div>
        )
    }
}

// Exporting this component as the default (only) export
export default Location;
