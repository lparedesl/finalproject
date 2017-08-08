import React, { Component } from "react";
import {connect} from 'react-redux';

class Header extends Component {
    render() {
        const {title, info, favorite, userInfo} = this.props;
        const className = favorite > 0 ? "btn btn-icon-only yellow" : "btn btn-outline btn-icon-only yellow";

        console.log("USER ID:", userInfo.id);
        console.log("LOCATION ID:", info.locationId);

        return (
            <div className="m-heading-1 border-green m-bordered">
                <a href="javascript:;" className={className}>
                    <i className="icon-star"></i>
                </a>
                <h1>{title}</h1>
                <p> {info.address} </p>
                <p>
                    {info.city}, {info.state} {info.zipCode}
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.authData
    }
}

export default connect(mapStateToProps)(Header);
