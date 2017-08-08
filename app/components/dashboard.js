import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './header';
import Sidebar from './sidebar';
import Footer from './footer';
import Profile from './user/profile';
import Content from './page_content';

class Dashboard extends Component {
    componentDidMount() {
        document.body.classList.add("page-header-fixed", "page-sidebar-closed-hide-logo", "page-content-white", "page-md", "page-container-bg-solid", "page-sidebar-closed");
    }

    render() {
        return (
            <div className="page-wrapper">
                <Header/>
                <div className="clearfix"> </div>
                <div className="page-container">
                    <Sidebar
                        location={this.props.location}
                    />
                    <div className="page-content-wrapper">
                        <div className="page-content">
                            <Router>
                                <div>
                                    <Switch>
                                        <Route path="/dashboard/profile" component={Profile}/>
                                        <Route path="/dashboard/locations" render={() =>
                                            <Content
                                                content={this.props.tab}
                                                title="Locations"
                                                titleSingular="location"
                                                fnName="selectLocation"
                                                message="Please select a location"
                                                cmd="locationItem"
                                            />
                                        }/>
                                        <Route path="/dashboard/teams" render={() =>
                                            <Content
                                                content={this.props.tab}
                                                title="Teams"
                                                titleSingular="team"
                                                fnName="selectTeam"
                                                message="Please select a team or create a new one below"
                                                cmd="team"
                                            />
                                        }/>
                                        <Route path="/dashboard/reservations" render={() =>
                                            <Content
                                                content={this.props.tab}
                                                title="Reservations"
                                                titleSingular="reservation"
                                                fnName="selectReservation"
                                                message="Please select a reservation"
                                                cmd="reservation"
                                            />
                                        }/>
                                    </Switch>
                                </div>
                            </Router>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        tab: state.activeTab
    }
}

export default connect(mapStateToProps)(Dashboard);