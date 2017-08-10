import React, { Component } from "react";
import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {favoriteLocation} from '../../actions';
import {getLocation} from '../../actions';

class Header extends Component {
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(values) {
        this.props.favoriteLocation(values, () => {
            this.props.getLocation(values.location_id);
        });
    }

    render() {
        const {locationItem, userInfo} = this.props;
        const favorites = _.filter(locationItem.users, user => user.id === userInfo.id);
        const className = favorites.length > 0 ? "btn btn-icon-only yellow" : "btn btn-outline btn-icon-only yellow";
        const favoriteObj = {
            favorite: favorites.length > 0,
            user_id: userInfo.id,
            location_id: locationItem.id
        };

        return (
            <div className="m-heading-1 border-green m-bordered">
                <a className={className} onClick={() => this.handleClick(favoriteObj)}>
                    <i className="icon-star"></i>
                </a>
                <h1>{locationItem.name}</h1>
                <p> {locationItem.address} </p>
                <p>
                    {locationItem.city}, {locationItem.state} {locationItem.zip_code}
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        locationItem: state.activeLocation,
        userInfo: state.authData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        favoriteLocation: favoriteLocation,
        getLocation: getLocation,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
