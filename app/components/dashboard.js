import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from './header';
import Sidebar from './sidebar';
import ProfileContent from './user/profile';
import Content from './page_content';
import ReservationsContent from './reservations/content';
import Footer from './footer';
import {getLocations} from './../actions';
import {getTeams} from './../actions';
import {getUserReservations} from './../actions';
import {getUserInfo} from './../actions';

class Dashboard extends Component {
    componentWillMount() {
        this.props.getLocations();
        this.props.getTeams();
        this.props.getUserReservations();
        this.props.getUserInfo((data, cb) => {
            if (!data) {
                this.props.history.push('/');
                cb(false);
            } else {
                cb(true);
            }
        });
    }

    componentDidMount() {
        document.body.classList.remove("home");
        document.body.classList.add("page-header-fixed", "page-sidebar-closed-hide-logo", "page-content-white", "page-md", "page-container-bg-solid", "page-sidebar-closed");
    }

    render() {
        return (
            <div className="page-wrapper">
                <Header/>
                <div className="clearfix"> </div>
                <div className="page-container">
                    <Sidebar
                        location={this.props.location.pathname}
                    />
                    <div className="page-content-wrapper">
                        <Route path="/dashboard/profile" render={() =>
                            <ProfileContent
                                title="Profile"
                            />
                        }/>
                        <Route path="/dashboard/locations" render={() =>
                            <Content
                                title="Locations"
                                fnName="selectLocation"
                                message="Please select a location"
                                cmd="locationItem"
                            />
                        }/>
                        <Route path="/dashboard/teams" render={() =>
                            <Content
                                title="Teams"
                                fnName="selectTeam"
                                message="Please select a team or create a new one below"
                                cmd="team"
                            />
                        }/>
                        <Route path="/dashboard/favorite-locations" render={() =>
                            <Content
                                title="Favorite Locations"
                                fnName="selectFavoriteLocation"
                                message="Please select a location"
                                cmd="favoriteLocation"
                            />
                        }/>
                        <Route path="/dashboard/reservations" render={() =>
                            <ReservationsContent
                                title="Reservations"
                                fnName="selectReservation"
                                message="Please select a reservation"
                                cmd="reservation"
                            />
                        }/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getLocations: getLocations,
        getTeams: getTeams,
        getUserReservations: getUserReservations,
        getUserInfo: getUserInfo
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(withRouter(Dashboard));
