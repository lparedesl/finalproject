import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="m-heading-1 border-green m-bordered">
        <h1>Team name</h1>
        <p> Brief Bio </p>
      </div>
    );
  }
}

// Exporting this component as the default (only) export
export default Header;
