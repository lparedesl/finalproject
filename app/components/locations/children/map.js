import React, { Component } from "react";

class Map extends Component {
  render() {
    return (
      <div class="portlet light portlet-fit bordered">
          <div class="portlet-title">
              <div class="caption">
                  <i class=" icon-layers font-blue"></i>
                  <span class="caption-subject font-blue bold uppercase">Markers</span>
              </div>
              <div class="actions">
                  <a class="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                      <i class="icon-cloud-upload"></i>
                  </a>
                  <a class="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                      <i class="icon-wrench"></i>
                  </a>
                  <a class="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                      <i class="icon-trash"></i>
                  </a>
              </div>
          </div>
          <div class="portlet-body">
              <div id="gmap_marker" class="gmaps"> </div>
          </div>
      </div>
    );
  }
}

// Exporting this component as the default (only) export
export default Map;
