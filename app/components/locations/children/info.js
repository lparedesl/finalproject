import React, { Component } from "react";

class Info extends Component {
  render() {
    return (
      <div class="portlet light portlet-fit bordered">
          <div class="portlet-title">
              <div class="caption">
                  <i class=" icon-layers font-blue"></i>
                  <span class="caption-subject font-blue bold uppercase">Park Information</span>
              </div>
          </div>
          <div class="portlet-body">
            <div class="list-item-content">
                <h3 class="uppercase">
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
