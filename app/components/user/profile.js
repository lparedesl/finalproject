import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Profile extends Component {
    render() {
        return (
            <div className="page-content">
                <h1 className="page-title">
                    {this.props.title}
                </h1>
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
                                        <Link to="/dashboard/locations" className="thumbnail">
                                            <img src="/layouts/layout/img/locations.jpg" alt="100%x180" />
                                        </Link>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                        <Link to="/dashboard/favorite-locations" className="thumbnail">
                                            <img src="/layouts/layout/img/favorites.jpg" alt="100%x180" /> </Link>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                        <Link to="/dashboard/teams" className="thumbnail">
                                            <img src="/layouts/layout/img/teams.jpg"  /> </Link>
                                    </div>
                                    <div className="col-sm-6 col-md-3">
                                        <Link to="/dashboard/reservations" className="thumbnail">
                                            <img src="/layouts/layout/img/reservations.jpg"  /> </Link>
                                    </div>
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

export default connect(mapStateToProps)(Profile);
