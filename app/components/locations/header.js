import React, { Component } from "react";
import $ from 'jquery';
import {connect} from 'react-redux';
import {favoriteLocation} from '../../actions';

class Header extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     active: props.favorite
        // };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(values) {
        // console.log("STATE BEFORE:", this.state.active);
        // console.log("PROPS BEFORE:", this.props.favorite);
        // values.favorite = this.state.active;

        this.props.favoriteLocation(values, ({data}) => {
            if (!data.newState) {
                // this.setState({active: false});
                $(".btn-icon-only").addClass("btn-outline");
            } else {
                // this.setState({active: true});
                $(".btn-icon-only").removeClass("btn-outline");
            }

            // console.log("STATE AFTER:", this.state.active);
            // console.log("PROPS AFTER:", this.props.favorite);
        });
    }

    render() {
        const {title, info, favorite, userInfo} = this.props;
        const className = favorite ? "btn btn-icon-only yellow" : "btn btn-outline btn-icon-only yellow";
        const favoriteObj = {
            favorite: favorite,
            user_id: userInfo.id,
            location_id: info.locationId
        };

        return (
            <div className="m-heading-1 border-green m-bordered">
                <a className={className} onClick={() => this.handleClick(favoriteObj)}>
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

export default connect(mapStateToProps, {favoriteLocation})(Header);
