import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className="m-heading-1 border-green m-bordered">
        <h1>Park Name</h1>
        <p> 123 Main St </p>
        <p>
          Charlotte, NC 28202
        </p>
      </div>
    );
  }
}

// Exporting this component as the default (only) export
export default Header;
