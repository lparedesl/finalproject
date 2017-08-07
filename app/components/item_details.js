import _ from 'lodash';
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import moment from 'moment';
import {connect} from 'react-redux';
import LocationHeader from './locations/location_header';
import Calendar from './locations/calendar';
import Reservation from './locations/reservation';
import Map from './locations/map';
import Info from './locations/info';
import {selectField} from '../actions/index';

class ItemDetails extends Component {
    constructor() {
        super();

        this.getFirstField = this.getFirstField.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderRightCol = this.renderRightCol.bind(this);
    }

    getFirstField() {
        if (this.props.field) {
            return this.props.field;
        }

        const {item} = this.props;
        let fields = _.filter(item.sports[0].fields, data => { return data.location_id === item.id; });
        let info = {};
        info.reservations = [];
        _.map(fields[0].reservations, function(reservation) {
            let obj = {
                title: reservation.user.first_name + " " + reservation.user.last_name,
                start: moment(reservation.reservation_date).format(),
                end: moment(reservation.reservation_date).add(1, 'hours').format(),
                backgroundColor: 'green',
                allDay: false,
            };
            info.reservations.push(obj);
        });
        info.first_field_id = fields[0].id;
        info.open_time = item.open_time;
        info.close_time = item.close_time;
        return info;
    }

    renderHeader() {
        const {item, titleSingular} = this.props;

        switch(titleSingular) {
            case "location":
                return (
                    <LocationHeader
                        title={item.name}
                        info={{
                            address: item.address,
                            city: item.city,
                            state: item.state,
                            zipCode: item.zip_code
                        }}
                    />
                )
        }
    }

    renderRightCol() {
        const {titleSingular} = this.props;

        switch(titleSingular) {
            case "location":
                return (
                    <div>
                        <div className="row">
                            <Map/>
                        </div>
                        <div className="row">
                            <Info/>
                        </div>
                    </div>
                )
        }
    }

    render() {
        const {item, titleSingular} = this.props;

        if (!item) {
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
                    {this.renderHeader()}
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
                                    render={() =><Calendar
                                        location={item}
                                        field={this.getFirstField()}
                                        selectField={(field) => this.props.selectField(field)}
                                    />}
                                />
                            </Switch>
                        </div>
                    </Router>
                </div>
                <div className="col-md-4">
                    {this.renderRightCol()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        field: state.activeField
    }
}

export default connect(mapStateToProps, {selectField})(ItemDetails);
