import React, { Component } from "react";

class Header extends Component {
    render() {
        const {title, info} = this.props;
        return (
            <div className="m-heading-1 border-green m-bordered">
                <a href="javascript:;" className="btn btn-outline btn-icon-only yellow text-right">
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

export default Header;
