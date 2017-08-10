import _ from 'lodash';
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LocationHeader from './locations/header';
import TeamStartHeader from './teams/start_header';
import TeamHeader from './teams/header';
import Calendar from './locations/calendar';
import Reservation from './locations/reservation';
import Map from './locations/map';
import Info from './locations/info';
import TeamList from './teams/team_list';
import TeamMemberForm from './teams/add_member_form';
import TeamImage from './teams/team_image';
import {selectField} from '../actions';
import {getFieldReservations} from '../actions';

class ItemDetails extends Component {
    constructor() {
        super();

        this.getField = this.getField.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderStartHeader = this.renderStartHeader.bind(this);
        this.renderRightCol = this.renderRightCol.bind(this);
    }

    getField() {
        // if (this.props.field) {
        //     console.log("FROM ITEM_DETAILS:", this.props.field);
        //     this.props.getFieldReservations(this.props.field.id);
        //     return this.props.field;
        // }

        const {item} = this.props;
        let info = {};
        info.reservations = [];

        _.map(this.props[item].first_field.reservations, function(reservation) {
            let obj = {
                title: reservation.user.first_name + " " + reservation.user.last_name,
                start: moment(reservation.reservation_date).format(),
                end: moment(reservation.reservation_date).add(1, 'hours').format(),
                backgroundColor: 'green',
                allDay: false,
            };
            info.reservations.push(obj);
        });

        info.first_field_id = this.props[item].first_field.id;
        info.openTime = this.props[item].open_time;
        info.closeTime = this.props[item].close_time;

        this.props.selectField(this.props[item].first_field.id);
        this.props.getFieldReservations(this.props[item].first_field.id);

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

    renderStartHeader() {
        const {item, message} = this.props;

        switch(item) {
            case "team":
                return (
                    <TeamStartHeader message={message}/>
                );

                default:
                    return <h3>{message}</h3>
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
                    <div className="row">
                        <TeamImage
                            image={this.props[item].image}
                            name={this.props[item].name}
                            location={this.props.location}
                        />
                    </div>
                );
        }
    }

    render() {
        const {item} = this.props;

        if (!this.props[item]) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet light portlet-fit bordered">
                            <div className="portlet-body">
                                {this.renderStartHeader()}
                            </div>
                        </div>
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
                                <Route path="/dashboard/locations/reserve-field" component={Reservation}/>
                                <Route
                                    exact path="/dashboard/locations"
                                    render={() =>
                                        <Calendar
                                            locationItem={this.props[item]}
                                            firstField={this.getField()}
                                        />
                                    }
                                />
                                <Route path="/dashboard/favorite-locations/reserve-field" component={Reservation}/>
                                <Route
                                    exact path="/dashboard/favorite-locations"
                                    render={() =>
                                        <Calendar
                                            locationItem={this.props[item]}
                                            firstField={this.getField()}
                                        />
                                    }
                                />
                                <Route path="/dashboard/teams/add-team-member" component={TeamMemberForm}/>
                                <Route path="/dashboard/teams" component={TeamList}/>
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
        // field: state.activeField,
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
