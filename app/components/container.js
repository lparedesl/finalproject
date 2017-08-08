import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Dashboard from './dashboard';

class Container extends Component {
    render() {
        const {location} = this.props;
        // console.log(location);
        return (
            <Dashboard
                location={location}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        tab: state.activeTab
    }
}

export default connect(mapStateToProps)(Container);