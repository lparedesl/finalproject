import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './header';
import Calendar from './calendar';
import Reservation from './reservation';
// import Map from './map';
import Info from './info';
import {selectField} from '../../actions';

class LocationDetails extends Component {
    constructor() {
        super();

        this.getFirstField = this.getFirstField.bind(this);
    }

    getFirstField() {
        if (this.props.field) {
            return this.props.field;
        }

        const {location} = this.props;
        let fields = _.filter(location.sports[0].fields, data => { return data.location_id === location.id; });
        return fields[0].id;
    }

    render() {
        const {location, titleSingular} = this.props;

        if (!location) {
            return (
                <div className="portlet light portlet-fit bordered">
                    <div className="portlet-body">
                        <h3>Please select a {titleSingular}</h3>
                    </div>
                </div>
            )
        }

        return (
            <div className="row">
                <div className="col-md-8">
                    <Header
                        title={location.name}
                        address={location.address}
                        city={location.city}
                        state={location.state}
                        zipCode={location.zip_code}
                    />
                    <Router>
                        <div>
                            <Switch>
                                <Route
                                    path="/dashboard/locations/reserve-field"
                                    render={() => <Reservation
                                        userId={this.props.userId}
                                        field={this.getFirstField()}
                                    />}
                                />
                                <Route
                                    path="/dashboard/locations"
                                    render={() => <Calendar
                                        location={location}
                                        field={this.getFirstField()}
                                        selectField={(field) => this.props.selectField(field)}
                                    />}
                                />
                            </Switch>
                        </div>
                    </Router>
                </div>
                <div className="col-md-4">
                    <div className="row">
                        {/*<Map/>*/}
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
    return {field: state.activeField}
}

export default connect(mapStateToProps, {selectField})(LocationDetails);
