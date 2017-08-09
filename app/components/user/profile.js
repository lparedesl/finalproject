import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserInfo} from '../../actions';

class Profile extends Component {
    componentDidMount() {
        this.props.getUserInfo();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>You are signed in as {this.props.userInfo.email}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="portlet light bordered">
                        <div className="portlet-body">
                            <h4 className="block">Useful Links</h4>
                            <div className="row">
                                <div className="col-sm-6 col-md-3">
                                    <a href="locations" className="thumbnail">
                                        <img src="/layouts/layout/img/locations.jpg" alt="100%x180" /> 
                                    </a>
                                </div>
                                <div className="col-sm-6 col-md-3">
                                    <a href="favorites" className="thumbnail">
                                        <img src="/layouts/layout/img/favorites.jpg" alt="100%x180" /> </a>
                                </div>
                                <div className="col-sm-6 col-md-3">
                                    <a href="teams" className="thumbnail">
                                        <img src="/layouts/layout/img/teams.jpg"  /> </a>
                                </div>
                                <div className="col-sm-6 col-md-3">
                                    <a href="reservations" className="thumbnail">
                                        <img src="/layouts/layout/img/reservations.jpg"  /> </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {userInfo: state.authData}
}

export default connect(mapStateToProps, {getUserInfo})(withRouter(Profile));
