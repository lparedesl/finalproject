import React, { Component } from "react";

class Map extends Component {
  render() {
    return (
      <div className="portlet light portlet-fit bordered">
          <div className="portlet-title">
              <div className="caption">
                  <i className=" icon-layers font-blue"></i>
                  <span className="caption-subject font-blue bold uppercase">Markers</span>
              </div>
              <div className="actions">
                  <a className="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                      <i className="icon-cloud-upload"></i>
                  </a>
                  <a className="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                      <i className="icon-wrench"></i>
                  </a>
                  <a className="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                      <i className="icon-trash"></i>
                  </a>
              </div>
          </div>
          <div className="portlet-body">
              <div id="gmap_marker" className="gmaps"> </div>
          </div>
      </div>
    );
  }
}

// Exporting this component as the default (only) export
export default Map;
