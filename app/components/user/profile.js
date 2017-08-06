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
                        <a href="/">Home</a>
                        <a href="/logout">Sign out</a>
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
