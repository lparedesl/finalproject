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
        // console.log("FROM CALENDAR:", this.props.locationItem);
        this.props.getFieldReservations(this.props.field.first_field_id);
    }

    renderOptGroups() {
        const {locationItem} = this.props;

        return _.map(locationItem.sports, sport => {
            return (
                <optgroup label={sport.name} key={sport.name}>
                    {this.renderOptions(sport, locationItem.id)}
                </optgroup>
            )
        })
    }

    renderOptions(sport, id) {
        let fields = _.filter(sport.fields, data => { return data.location_id === id; });

        return _.map(fields, field => {
            let selected = parseInt(this.props.field.first_field_id) === field.id;
            return <option value={field.id} key={field.id} selected={selected}>Field {field.field_number}</option>
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
                start: fieldReservations.open_time,
                end: fieldReservations.close_time,
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
                <Link className="btn blue btn-outline reserve-btn" to="/dashboard/locations/reserve-field">Reserve Field</Link>
                <div className="portlet light portlet-fit bordered calendar">
                  <div className="portlet-title">
                    <div className="caption">
                        <div className="form-group form-md-line-input has-info">
                            <select className="form-control" id="form_control_1" onChange={event => this.onFieldSelect(event.target.value)}>
                                <option value=""></option>
                                {this.renderOptGroups()}
                            </select>
                            <label htmlFor="form_control_1">SelectField</label>
                        </div>
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
