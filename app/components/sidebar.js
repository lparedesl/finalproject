import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Sidebar extends Component {
    render() {
        return (
            <div className="page-sidebar-wrapper">
                <div className="page-sidebar navbar-collapse collapse">
                    <ul className="page-sidebar-menu page-sidebar-menu-closed page-header-fixed " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" style={{paddingTop: 20}}>
                        <li className="sidebar-toggler-wrapper hide">
                            <div className="sidebar-toggler">
                                <span></span>
                            </div>
                        </li>
                        <li className="nav-item start ">
                            <Link to="/" className="nav-link nav-toggle">
                                <i className="icon-home"></i>
                                <span className="title">Home</span>
                            </Link>
                        </li>
                        <li className="heading">
                            <h3 className="uppercase">Navigation</h3>
                        </li>
                        <li className="nav-item  ">
                            <Link to="/dashboard/locations" className="nav-link nav-toggle">
                                <i className="icon-map"></i>
                                <span className="title">Locations</span>
                                <span className="arrow"></span>
                            </Link>
                        </li>
                        <li className="nav-item  ">
                            <Link to="/dashboard/teams" className="nav-link nav-toggle">
                                <i className="icon-organization"></i>
                                <span className="title">Teams</span>
                                <span className="arrow"></span>
                            </Link>
                        </li>
                        <li className="nav-item  ">
                            <Link to="/dashboard/favorites" className="nav-link nav-toggle">
                                <i className="icon-star"></i>
                                <span className="title">Favorites</span>
                                <span className="arrow"></span>
                            </Link>
                        </li>
                        <li className="nav-item  active">
                            <Link to="/dashboard/profile" className="nav-link nav-toggle">
                                <i className="icon-settings"></i>
                                <span className="title">My Account</span>
                                <span className="selected"></span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(Sidebar);
