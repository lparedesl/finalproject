import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import Header from './header';
import Sidebar from './sidebar';
import Footer from './footer';
import ItemsList from './items_list';
import ItemDetails from './item_details';
import {getLocations} from './../actions/index';
import {getFavoriteLocations} from './../actions/index';
import {getTeams} from './../actions/index';
import {getUserInfo} from './../actions/index';
import {resetActiveItems} from './../actions/index';

class Content extends Component {
    constructor() {
        super();

        this.isSignedIn = this.isSignedIn.bind(this);
    }

    componentDidMount() {
        document.body.classList.add("page-header-fixed", "page-sidebar-closed-hide-logo", "page-content-white", "page-md", "page-container-bg-solid", "page-sidebar-closed");
        this.props.getLocations();
        this.props.getFavoriteLocations();
        this.props.getTeams();
        this.props.getUserInfo();
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.title !== nextProps.title) {
            this.props.resetActiveItems();
        }
        return true;
    }

    isSignedIn() {
        if (this.props.userInfo) {
            return this.props.userInfo.id
        }

        return 99999
    }

    render() {
        return (
            <div className="page-wrapper">
                <Header/>
                <div className="clearfix"> </div>
                <div className="page-container">
                    <Sidebar
                        location={`/dashboard/${this.props.title.toLowerCase()}`}
                    />
                    <div className="page-content-wrapper">
                        <div className="page-content">
                            <h1 className="page-title">
                                {this.props.title}
                            </h1>
                            <div className="row">
                                <div className="col-md-3">
                                    <ItemsList
                                        title={this.props.title}
                                        fnName={this.props.fnName}
                                    />
                                </div>
                                <div className="col-md-9">
                                    <ItemDetails
                                        userId={this.isSignedIn()}
                                        item={this.props.cmd}
                                        message={this.props.message}
                                    />
                                </div>
                            </div>
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
        userInfo: state.authData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getLocations: getLocations,
        getFavoriteLocations: getFavoriteLocations,
        getTeams: getTeams,
        getUserInfo: getUserInfo,
        resetActiveItems: resetActiveItems
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
