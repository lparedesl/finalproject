import React, { Component } from "react";

class Header extends Component {
  render() {
      const {title, address, city, state, zipCode} = this.props;
    return (
      <div className="m-heading-1 border-green m-bordered">
        <h1>{title}</h1>
        <p> {address} </p>
        <p>
            {city}, {state} {zipCode}
        </p>
      </div>
    );
  }
}

export default Header;
