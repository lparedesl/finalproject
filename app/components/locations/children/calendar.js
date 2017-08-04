import React, { Component } from "react";

class Calendar extends Component {
  render() {
    return (
      <div class="m-heading-1 border-green m-bordered">
        <div class="form-group">
          <div class="row">
            <label class="control-label col-md-6">Field Select</label>
            <div class="col-md-6">
              <select class="bs-select form-control">
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
      <div class="portlet light portlet-fit bordered calendar">
        <div class="portlet-title">
          <div class="caption">
            <i class=" icon-layers font-green"></i>
            <span class="caption-subject font-green sbold uppercase">Calendar</span>
          </div>
        </div>
        <div class="portlet-body">
          <div class="row">
            <div class="col-md-3 col-sm-12">
              <!-- BEGIN DRAGGABLE EVENTS PORTLET-->
              <h3 class="event-form-title margin-bottom-20">Draggable Events</h3>
              <div id="external-events">
                <form class="inline-form">
                  <input type="text" value="" class="form-control" placeholder="Event Title..." id="event_title" />
                  <br/>
                  <a href="javascript:;" id="event_add" class="btn green"> Add Event </a>
                </form>
                <hr/>
                <div id="event_box" class="margin-bottom-10"></div>
                <label class="mt-checkbox mt-checkbox-single mt-checkbox-outline" for="drop-remove"> remove after drop
                  <input type="checkbox" class="group-checkable" id="drop-remove" />
                  <span></span>
                </label>
                <hr class="visible-xs" /> </div>
                <!-- END DRAGGABLE EVENTS PORTLET-->
              </div>
              <div class="col-md-9 col-sm-12">
                <div id="calendar" class="has-toolbar"> </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

// Exporting this component as the default (only) export
export default Calendar;
