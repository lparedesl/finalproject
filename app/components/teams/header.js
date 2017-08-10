import React, { Component } from "react";
import {connect} from 'react-redux';

class Header extends Component {
    render() {
        const {team} = this.props;
        return (
            <div className="m-heading-1 border-green m-bordered">
                <h1>{team.name}</h1>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {team: state.activeTeam,}
}

export default connect(mapStateToProps)(Header);
