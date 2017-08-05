import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import fullcalendar from 'fullcalendar';
import {connect} from 'react-redux';
import {getFieldReservations} from '../../actions';

class Calendar extends Component {
    constructor() {
        super();

        this.onFieldSelect = this.onFieldSelect.bind(this);
        this.renderOptGroups = this.renderOptGroups.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
    }

    componentDidMount() {
        this.props.getFieldReservations(this.props.field);
    }

    renderOptGroups() {
        const {location} = this.props;

        return _.map(location.sports, sport => {
            return (
                <optgroup label={sport.name} key={sport.name}>
                    {this.renderOptions(sport, location.id)}
                </optgroup>
            )
        })
    }

    renderOptions(sport, id) {
        let fields = _.filter(sport.fields, data => { return data.location_id === id; });

        return _.map(fields, field => {
            let selected = parseInt(this.props.field) === field.field_number;
            return <option value={field.field_number} key={field.id} selected={selected}>Field {field.field_number}</option>
        })
    }

    renderCalendar() {
        const {fieldReservations} = this.props;

        if (!fieldReservations) {
            return <div>Loading...</div>;
        }

        $("#field-schedule").fullCalendar('destroy');
        $("#field-schedule").fullCalendar({
            height: 500,
            header: {},
            defaultView: 'agendaWeek',
            slotMinutes: 15,
            editable: true,
            businessHours: {
                dow: [ 1, 2, 3, 4, 5 ],
                start: fieldReservations.openTime,
                end: fieldReservations.closeTime,
            },
            events: fieldReservations.reservations
        });
    }

    onFieldSelect(option) {
        this.props.selectField(option);
        this.props.getFieldReservations(option);
        this.renderCalendar();
    }

    render() {
        return (
            <div className="row">
              <div className="col-md-12">
                <Link className="btn blue btn-outline reserve-btn" to="/locations/reserve-field">Reserve Field</Link>
                <div className="m-heading-1 border-green m-bordered">
                  <div className="form-group">
                    <div className="row">
                      <label className="control-label col-md-6">Select Field</label>
                      <div className="col-md-6">
                        <select className="bs-select form-control" onChange={event => this.onFieldSelect(event.target.value)}>
                          <option value=""></option>
                            {this.renderOptGroups()}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="portlet light portlet-fit bordered calendar">
                  <div className="portlet-title">
                    <div className="caption">
                      <i className=" icon-layers font-green"></i>
                      <span className="caption-subject font-green bold uppercase">Field Schedule</span>
                    </div>
                  </div>
                  <div className="portlet-body">
                    <div className="row">
                      <div className="col-sm-12">
                        <div id="field-schedule" className="has-toolbar"> </div>
                          {this.renderCalendar()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {fieldReservations: state.fieldReservations}
}

export default connect(mapStateToProps, {getFieldReservations})(Calendar);