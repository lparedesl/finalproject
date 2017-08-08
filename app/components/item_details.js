import _ from 'lodash';
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import moment from 'moment';
import {connect} from 'react-redux';
import LocationHeader from './locations/header';
import TeamHeader from './teams/header';
import Calendar from './locations/calendar';
import Reservation from './locations/reservation';
import Map from './locations/map';
import Info from './locations/info';
import Banner from './teams/banner';
import TeamImage from './teams/team_image';
import {selectField} from '../actions';

class ItemDetails extends Component {
    constructor() {
        super();

        this.getFirstField = this.getFirstField.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderAddButton = this.renderAddButton.bind(this);
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
        const {item, titleSingular, userInfo} = this.props;

        switch(titleSingular) {
            case "location":
                const favorite = _.filter(item.users, user => user.id === userInfo.id);

                return (
                    <LocationHeader
                        title={item.name}
                        info={{
                            locationId: item.id,
                            address: item.address,
                            city: item.city,
                            state: item.state,
                            zipCode: item.zip_code
                        }}
                        favorite={favorite.length > 0}
                    />
                );

            case "team":
                return (
                    <TeamHeader
                        name={item.name}
                        location={this.props.header}
                    />
                );
        }
    }

    renderAddButton() {
        const {titleSingular} = this.props;

        switch(titleSingular) {
            case "team":
                return (
                    <button className="btn btn-circle blue btn-block btn-lg m-icon-big">Create New Team
                        <i className="m-icon-big-swapright m-icon-white"></i>
                    </button>
                );
        }
    }

    renderRightCol() {
        const {item, titleSingular} = this.props;

        switch(titleSingular) {
            case "location":
                return (
                    <div>
                        <div className="row">
                            <Map
                                location={this.props.location}
                            />
                        </div>
                        <div className="row">
                            <Info
                                location={this.props.location}
                            />
                        </div>
                    </div>
                );

            case "team":
                return (
                    <div>
                        <div className="row">
                            <TeamImage
                                image={item.image}
                                name={item.name}
                                location={this.props.location}
                            />
                        </div>
                        <div className="row">
                            <button className="btn btn-circle blue btn-block btn-lg m-icon-big">Add Members
                                <i className="m-icon-big-swapright m-icon-white"></i>
                            </button>
                        </div>
                    </div>
                );
        }
    }

    render() {
        const {item, message} = this.props;

        if (!item) {
            return (
                <div className="portlet light portlet-fit bordered">
                    <div className="portlet-body">
                        <h3>{message}</h3>
                        {this.renderAddButton()}
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
                                    render={() =>
                                        <Reservation
                                            userId={this.props.userId}
                                            field={this.getFirstField()}
                                        />
                                    }
                                />
                                <Route
                                    exact path="/dashboard/locations"
                                    render={() =>
                                        <Calendar
                                            locationItem={item}
                                            field={this.getFirstField()}
                                            selectField={(field) => this.props.selectField(field)}
                                        />
                                    }
                                />
                                <Route
                                    path="/dashboard/teams"
                                    component={Banner}
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
        field: state.activeField,
        userInfo: state.authData
    }
}

export default connect(mapStateToProps, {selectField})(ItemDetails);
