import _ from 'lodash';
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LocationHeader from './locations/header';
import TeamHeader from './teams/header';
import Calendar from './locations/calendar';
import Reservation from './locations/reservation';
import Map from './locations/map';
import Info from './locations/info';
import Banner from './teams/team_list';
import TeamImage from './teams/team_image';
import {selectField} from '../actions';
import {getFieldReservations} from '../actions';

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
        let fields = _.filter(this.props[item].sports[0].fields, data => { return data.location_id === this.props[item].id; });
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
        info.open_time = this.props[item].open_time;
        info.close_time = this.props[item].close_time;

        this.props.getFieldReservations(fields[0].id);


        return info;
    }

    renderHeader() {
        const {item, userInfo} = this.props;

        switch(item) {
            case "locationItem":
            case "favoriteLocation":
                const favorite = _.filter(this.props[item].users, user => user.id === userInfo.id);

                return (
                    <LocationHeader
                        title={this.props[item].name}
                        info={{
                            locationId: this.props[item].id,
                            address: this.props[item].address,
                            city: this.props[item].city,
                            state: this.props[item].state,
                            zipCode: this.props[item].zip_code
                        }}
                        favorite={favorite.length > 0}
                    />
                );

            case "team":
                return (
                    <TeamHeader
                        name={this.props[item].name}
                        location={this.props.header}
                    />
                );
        }
    }

    renderAddButton() {
        const {item} = this.props;

        switch(item) {
            case "team":
                return (
                    <button className="btn blue btn-block btn-lg m-icon-big">Create New Team
                        <i className="m-icon-big-swapright m-icon-white"></i>
                    </button>
                );
        }
    }

    renderRightCol() {
        const {item} = this.props;

        switch(item) {
            case "locationItem":
            case "favoriteLocation":
                return (
                    <div>
                        <div className="row">
                            <Map
                                location={this.props.location}
                                item={item}
                            />
                        </div>
                        <div className="row">
                            <Info
                                location={this.props.location}
                                item={item}
                            />
                        </div>
                    </div>
                );

            case "team":
                return (
                    <div>
                        <div className="row">
                            <TeamImage
                                image={this.props[item].image}
                                name={this.props[item].name}
                                location={this.props.location}
                            />
                        </div>
                        <div className="row">
                            <button className="btn blue btn-block btn-lg m-icon-big">Add Members
                                <i className="m-icon-big-swapright m-icon-white"></i>
                            </button>
                        </div>
                    </div>
                );
        }
    }

    render() {
        const {item, message} = this.props;

        if (!this.props[item]) {
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
                                            locationItem={this.props[item]}
                                            field={this.getFirstField()}
                                            selectField={(field) => this.props.selectField(field)}
                                        />
                                    }
                                />
                                <Route
                                    path="/dashboard/favorite-locations/reserve-field"
                                    render={() =>
                                        <Reservation
                                            userId={this.props.userId}
                                            field={this.getFirstField()}
                                        />
                                    }
                                />
                                <Route
                                    exact path="/dashboard/favorite-locations"
                                    render={() =>
                                        <Calendar
                                            locationItem={this.props[item]}
                                            field={this.getFirstField()}
                                            selectField={(field) => this.props.selectField(field)}
                                        />
                                    }
                                />
                                <Route
                                    path="/dashboard/teams"
                                    render={() =>
                                        <Banner
                                            users={this.props[item].users}
                                        />
                                    }
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
        locationItem: state.activeLocation,
        favoriteLocation: state.activeFavoriteLocation,
        team: state.activeTeam,
        field: state.activeField,
        userInfo: state.authData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectField: selectField,
        getFieldReservations: getFieldReservations
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
