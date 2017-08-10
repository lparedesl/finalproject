import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import Header from './header';
import Sidebar from './sidebar';
import Footer from './footer';
import ItemsList from './items_list';
import ItemDetails from './item_details';
import {getLocations} from './../actions';
import {getTeams} from './../actions';
import {getUserInfo} from './../actions';
import {resetActiveItems} from './../actions';

class Content extends Component {
    componentDidMount() {
        document.body.classList.remove("home");
        document.body.classList.add("page-header-fixed", "page-sidebar-closed-hide-logo", "page-content-white", "page-md", "page-container-bg-solid", "page-sidebar-closed");
        this.props.getLocations();
        this.props.getTeams();
        this.props.getUserInfo();
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.title !== nextProps.title) {
            this.props.resetActiveItems();
        }
        return true;
    }

    render() {
        if (!this.props.userInfo) {
            return this.props.history.push('/');
        }

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
    return {userInfo: state.authData}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getLocations: getLocations,
        getTeams: getTeams,
        getUserInfo: getUserInfo,
        resetActiveItems: resetActiveItems
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Content));
