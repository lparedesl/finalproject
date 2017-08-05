import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './header';
import Calendar from './calendar';
import Reservation from './reservation';
import Map from './map';
import Info from './info';

class LocationDetails extends Component {
    constructor() {
        super();

        this.state = {
            selectedField: 1
        };
    }

    render() {
        const {location} = this.props;

        if (!location) {
            return (
                <div className="portlet light portlet-fit bordered">
                    <div className="portlet-body">
                        <h3>Please select a location</h3>
                    </div>
                </div>
            )
        }

        return (
            <div className="row">
                <div className="col-md-8">
                    <Header/>
                    <Router>
                        <div>
                            <Switch>
                                <Route exact path="/locations/reserve-field" component={Reservation} />
                                <Route
                                    path="/"
                                    render={() => <Calendar
                                        location={location}
                                        field={this.state.selectedField}
                                        onFieldSelect={selectedField => this.setState({selectedField})}
                                    />}
                                />
                            </Switch>
                        </div>
                    </Router>
                </div>
                <div className="col-md-4">
                    <div className="row">
                        <Map/>
                    </div>
                    <div className="row">
                        <Info/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {location: state.activeLocation}
}

export default connect(mapStateToProps)(LocationDetails);