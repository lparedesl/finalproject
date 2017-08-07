import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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
                            <a href="/" className="nav-link nav-toggle">
                                <i className="icon-home"></i>
                                <span className="title">Home</span>
                            </a>
                        </li>
                        <li className="heading">
                            <h3 className="uppercase">Navigation</h3>
                        </li>
                        <li className="nav-item  ">
                            <a href="/locations" className="nav-link nav-toggle">
                                <i className="icon-map"></i>
                                <span className="title">Locations</span>
                                <span className="arrow"></span>
                            </a>
                        </li>
                        <li className="nav-item  ">
                            <a href="/teams" className="nav-link nav-toggle">
                                <i className="icon-organization"></i>
                                <span className="title">Teams</span>
                                <span className="arrow"></span>
                            </a>
                        </li>
                        <li className="nav-item  ">
                            <a href="/favorites" className="nav-link nav-toggle">
                                <i className="icon-star"></i>
                                <span className="title">Favorites</span>
                                <span className="arrow"></span>
                            </a>
                        </li>
                        <li className="nav-item  active">
                            <a href="/account" className="nav-link nav-toggle">
                                <i className="icon-settings"></i>
                                <span className="title">My Account</span>
                                <span className="selected"></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sidebar;
