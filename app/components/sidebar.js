import _ from 'lodash';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {selectTab} from '../actions';

class Sidebar extends Component {
    constructor() {
        super();

        this.renderNavItems = this.renderNavItems.bind(this);
    }

    renderNavItems(){
        const tabs = [
            {
                name: "Locations",
                icon: "icon-map"
            },
            {
                name: "Teams",
                icon: "icon-organization"
            },
            {
                name: "Favorites",
                icon: "icon-star"
            },
            {
                name: "Profile",
                icon: "icon-settings"
            }
        ];

        return _.map(tabs, tab => {
            return (
                <li className="nav-item  " key={tab.name}>
                    <a href={`/dashboard/${tab.name}`} className="nav-link nav-toggle" onClick={() => this.props.selectTab(tab.name)}>
                        <i className={tab.icon}></i>
                        <span className="title">{tab.name}</span>
                        <span className="arrow"></span>
                    </a>
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
                            <Link to="/" className="nav-link nav-toggle" onClick={() => this.props.selectTab("Home")}>
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

export default connect(null, {selectTab})(Sidebar);
