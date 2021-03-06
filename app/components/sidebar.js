import _ from 'lodash';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Sidebar extends Component {
    constructor() {
        super();

        this.renderNavItems = this.renderNavItems.bind(this);
    }

    renderNavItems(){
        const tabs = [
            {
                name: "Locations",
                pathname: "/dashboard/locations",
                icon: "icon-map"
            },
            {
                name: "Teams",
                pathname: "/dashboard/teams",
                icon: "icon-trophy"
            },
            {
                name: "Favorite Locations",
                pathname: "/dashboard/favorite-locations",
                icon: "icon-star"
            },
            {
                name: "Reservations",
                pathname: "/dashboard/reservations",
                icon: "icon-calendar"
            },
            {
                name: "Profile",
                pathname: "/dashboard/profile",
                icon: "icon-settings"
            }
        ];

        const {location} = this.props;

        return _.map(tabs, tab => {
            const classNameLi = `nav-item ${location.indexOf(tab.pathname) !== -1 ? 'active open' : ''}`;
            const classNameSpan = `arrow ${location.indexOf(tab.pathname) !== -1 ? 'open' : ''}`;
            const selected = location.indexOf(tab.pathname) !== -1 ? 'selected' : null;

            return (
                <li className={classNameLi} key={tab.name}>
                    <Link to={tab.pathname} className="nav-link nav-toggle">
                        <i className={tab.icon}></i>
                        <span className="title">{tab.name}</span>
                        <span className={selected}></span>
                        <span className={classNameSpan}></span>
                    </Link>
                </li>
            )
        })
    }

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
                        {this.renderNavItems()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sidebar;
