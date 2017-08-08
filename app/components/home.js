import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Home extends Component {
    componentDidMount() {
        document.body.classList.add("login");
    }

    render() {
        return (
            <div className="container">
                <h1>Homepage</h1>
                <Link to="/user/signin">Sign in </Link>
                <Link to="/dashboard/teams">Teams </Link>
                <Link to="/dashboard/locations">Locations</Link>
            </div>
        )
    }
}

export default Home;