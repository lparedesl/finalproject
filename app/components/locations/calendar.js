import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';
import fullcalendar from 'fullcalendar';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectField} from '../../actions';
import {getFieldReservations} from '../../actions';

class Calendar extends Component {
    constructor() {
        super();

        this.onFieldSelect = this.onFieldSelect.bind(this);
        this.renderOptGroups = this.renderOptGroups.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
    }

    renderOptGroups() {
        const {item} = this.props;

        return _.map(this.props[item].sports, sport => {
            return (
                <optgroup label={sport.name} key={sport.name}>
                    {this.renderOptions(sport, this.props[item].id)}
                </optgroup>
            )
        })
    }

    renderOptions(sport, id) {
        let fields = _.filter(sport.fields, data => { return data.location_id === id; });

        return _.map(fields, field => {
            return <option value={field.id} key={field.id}>Field {field.field_number}</option>
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
                    <Link className="btn blue btn-outline reserve-btn" to={`${this.props.location}/reserve-field`}>Reserve Field</Link>
                    <div className="portlet light portlet-fit bordered calendar">
                        <div className="portlet-title">
                            <div className="caption">
                                <div className="form-group form-md-line-input has-info">
                                    <select className="form-control" id="form_control_1" value={this.props.field.id} onChange={event => this.onFieldSelect(event.target.value)}>
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
    return {
        locationItem: state.activeLocation,
        favoriteLocation: state.activeFavoriteLocation,
        fieldReservations: state.fieldReservations,
        field: state.activeField,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        selectField: selectField,
        getFieldReservations: getFieldReservations
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
