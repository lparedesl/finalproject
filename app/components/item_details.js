import React, {Component} from 'react';
import {Route} from 'react-router-dom';
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
import {setFirstField} from '../actions';
import {selectField} from '../actions';
import {getFieldReservations} from '../actions';

class ItemDetails extends Component {
    constructor() {
        super();

        this.renderHeader = this.renderHeader.bind(this);
        this.renderStartHeader = this.renderStartHeader.bind(this);
        this.renderRightCol = this.renderRightCol.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.item !== "team") {
            const {item, setFirstField, getFieldReservations} = nextProps;

            setFirstField(nextProps[item].first_field);
            getFieldReservations(nextProps[item].first_field.id);
        }

        return true;
    }

    renderStartHeader() {
        const {item, message} = this.props;

        switch(item) {
            case "team":
                return <TeamStartHeader message={message}/>;

                default:
                    return <h3>{message}</h3>
        }
    }

    renderHeader() {
        const {item} = this.props;

        switch(item) {
            case "team":
                return <TeamHeader/>;

            default:
                return <LocationHeader item={item} />;
        }
    }

    renderRightCol() {
        const {item} = this.props;

        switch(item) {
            case "team":
                return (
                    <div className="row">
                        <TeamImage/>
                    </div>
                );

            default:
                return (
                    <div>
                        <div className="row">
                            <Map item={item} />
                        </div>
                        <div className="row">
                            <Info item={item} />
                        </div>
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
                    <Route path="/dashboard/locations/reserve-field" render={() =>
                        <Reservation
                            location={this.props.location}
                        />
                    }/>
                    <Route
                        exact path="/dashboard/locations"
                        render={() =>
                            <Calendar
                                location={this.props.location}
                                item={item}
                            />
                        }
                    />
                    <Route path="/dashboard/favorite-locations/reserve-field" render={() =>
                        <Reservation
                            location={this.props.location}
                        />
                    }/>
                    <Route
                        exact path="/dashboard/favorite-locations"
                        render={() =>
                            <Calendar
                                location={this.props.location}
                                item={item}
                            />
                        }
                    />
                    <Route path="/dashboard/teams/add-team-member" component={TeamMemberForm}/>
                    <Route exact path="/dashboard/teams" component={TeamList}/>
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
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setFirstField: setFirstField,
        selectField: selectField,
        getFieldReservations: getFieldReservations
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
