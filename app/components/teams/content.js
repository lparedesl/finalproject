import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import Header from '../header';
import Sidebar from '../sidebar';
import Footer from '../footer';
import ItemsList from '../items_list';
import ItemDetails from '../item_details';
import {getLocations} from '../../actions/index';
import {getTeams} from '../../actions/index';
import {getUserInfo} from '../../actions/index';

class Content extends Component {
    constructor() {
        super();

        this.isSignedIn = this.isSignedIn.bind(this);
    }

    componentDidMount() {
        document.body.classList.add("page-header-fixed", "page-sidebar-closed-hide-logo", "page-content-white", "page-md", "page-container-bg-solid", "page-sidebar-closed");
        this.props[`get${this.props.title}`]();
        this.props.getUserInfo();
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
                                        items={this.props[this.props.title.toLowerCase()]}
                                        fnName={this.props.fnName}
                                        location={this.props.location}
                                    />
                                </div>
                                <div className="col-md-9">
                                    <ItemDetails
                                        titleSingular={this.props.titleSingular}
                                        userId={this.isSignedIn()}
                                        item={this.props[this.props.cmd]}
                                        message={this.props.message}
                                        location={this.props.location}
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
        locations: state.locations,
        teams: state.teams,
        locationItem: state.activeLocation,
        team: state.activeTeam,
        tab: state.activeTab,
        userInfo: state.authData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getLocations: getLocations,
        getTeams: getTeams,
        getUserInfo: getUserInfo
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
