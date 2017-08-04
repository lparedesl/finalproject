import React, { Component } from "react";

class Map extends Component {
  render() {
    return (
      <div classsName="portlet light portlet-fit bordered">
          <div classsName="portlet-title">
              <div classsName="caption">
                  <i classsName=" icon-layers font-blue"></i>
                  <span classsName="caption-subject font-blue bold uppercase">Markers</span>
              </div>
              <div classsName="actions">
                  <a classsName="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                      <i classsName="icon-cloud-upload"></i>
                  </a>
                  <a classsName="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                      <i classsName="icon-wrench"></i>
                  </a>
                  <a classsName="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                      <i classsName="icon-trash"></i>
                  </a>
              </div>
          </div>
          <div classsName="portlet-body">
              <div id="gmap_marker" classsName="gmaps"> </div>
          </div>
      </div>
    );
  }
}

// Exporting this component as the default (only) export
export default Map;
