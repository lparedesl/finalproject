import React, { Component } from "react";
import {connect} from 'react-redux';
import $ from 'jquery';
import {bindActionCreators} from 'redux';
import {favoriteLocation} from '../../actions';
import {getLocation} from '../../actions';
import {getLocations} from '../../actions';
import {resetActiveItems} from '../../actions';

class Header extends Component {
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(values) {
        this.props.favoriteThisLocation(values, () => {
            $(".btn-icon-only").toggleClass("btn-outline");
            this.props.getLocation(values.location_id);
            this.props.getLocations();
            if (this.props.item === "favoriteLocation") {
                this.props.resetActiveItems();
            }
        });
    }

    render() {
        const {item, userInfo} = this.props;
        const className = this.props[item].favorite ? "btn btn-icon-only yellow" : "btn btn-outline btn-icon-only yellow";
        const favoriteObj = {
            favorite: this.props[item].favorite,
            user_id: userInfo.id,
            location_id: this.props[item].id
        };

        return (
            <div className="m-heading-1 border-green m-bordered">
                <a className={className} onClick={() => this.handleClick(favoriteObj)}>
                    <i className="icon-star"></i>
                </a>
                <h1>{this.props[item].name}</h1>
                <p> {this.props[item].address} </p>
                <p>
                    {this.props[item].city}, {this.props[item].state} {this.props[item].zip_code}
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        locationItem: state.activeLocation,
        favoriteLocation: state.activeFavoriteLocation,
        userInfo: state.authData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        favoriteThisLocation: favoriteLocation,
        getLocation: getLocation,
        getLocations: getLocations,
        resetActiveItems: resetActiveItems
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
