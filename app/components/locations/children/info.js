import React, { Component } from "react";

class Info extends Component {
  render() {
    return (
      <div className="portlet light portlet-fit bordered">
          <div className="portlet-title">
              <div className="caption">
                  <i className=" icon-layers font-blue"></i>
                  <span className="caption-subject font-blue bold uppercase">Park Information</span>
              </div>
          </div>
          <div className="portlet-body">
            <div className="list-item-content">
                <h3 className="uppercase">
                    <a href="javascript:;">Location 1</a>
                </h3>
                <p>
                  Open 11am - 7pm
                </p>
            </div>
          </div>
      </div>
    );
  }
}

// Exporting this component as the default (only) export
export default Info;
