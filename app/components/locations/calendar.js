import React, { Component } from "react";

class Calendar extends Component {
  render() {
    return (
      <div>
        <div className="m-heading-1 border-green m-bordered">
          <div className="form-group">
            <div className="row">
              <label className="control-label col-md-6">Field Select</label>
              <div className="col-md-6">
                <select className="bs-select form-control">
                  <optgroup label="Football">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </optgroup>
                  <optgroup label="Tennis">
                    <option>1</option>
                    <option>2</option>
                  </optgroup>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="portlet light portlet-fit bordered calendar">
          <div className="portlet-title">
            <div className="caption">
              <i className=" icon-layers font-green"></i>
              <span className="caption-subject font-green sbold uppercase">Calendar</span>
            </div>
          </div>
          <div className="portlet-body">
            <div className="row">
              <div className="col-md-9 col-sm-12">
                <div id="calendar" className="has-toolbar"> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Exporting this component as the default (only) export
export default Calendar;
