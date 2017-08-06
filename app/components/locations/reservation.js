import React, {Component} from 'react';
import $ from 'jquery';
import {Link, withRouter} from 'react-router-dom';
import toastr from 'toastr';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {reserveField} from '../../actions';

class Reservation extends Component {
    renderDateField(field) {
        return (
            <div className="row">
                <div className="form-group">
                    <label className="control-label col-md-3">Date</label>
                    <div className="col-md-3">
                        <div className="date-picker" id="reservation-date"> </div>
                        <input type="hidden" name="reservation_date"/>
                    </div>
                </div>
            </div>
        );
    }

    renderTimeField(field) {
        return (
            <div className="row">
                <div className="form-group">
                    <label className="control-label col-md-3">Time</label>
                    <div className="col-md-4">
                        <div className="input-icon">
                            <i className="fa fa-clock-o"></i>
                            <input type="text" className="form-control timepicker timepicker-default" name="reservation_time"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onSubmit() {
        const data = {
            reservation_date: $("input[name='reservation_date']").val(),
            reservation_time: $("input[name='reservation_time']").val(),
            user: this.props.userId,
            field: this.props.field
        };
        this.props.reserveField(data, res => {
            if (res.data) {
                toastr.options = {
                    closeButton    : true,
                    debug          : false,
                    positionClass  : "toast-bottom-right",
                    showDuration   : 1000,
                    hideDuration   : 1000,
                    timeOut        : 5000,
                    extendedTimeOut: 1000,
                    showEasing     : "swing",
                    hideEasing     : "linear",
                    showMethod     : "fadeIn",
                    hideMethod     : "fadeOut"
                };
                toastr['success'](`"Field ${res.data.field_id}" was successfully reserved on ${moment(res.data.reservation_date).format("dddd MMMM D, YYYY")} from ${moment(res.data.reservation_date).format("hh:mm A")} to ${moment(res.data.reservation_date).add(1, "hours").format("hh:mm A")}.`, 'Field Reserved');
                this.props.history.push('/dashboard/locations');
            }
        });
    }

    // renderErrors() {
    //     const {hasErrors, messages} = this.props.authData;
    //     if (hasErrors) {
    //         return (
    //             <div className="alert alert-danger">
    //                 <button className="close" data-close="alert"></button>
    //                 {messages.map(message => <span> {message} </span>)}
    //             </div>
    //         )
    //     }
    // }

    render() {
        const {handleSubmit} = this.props;

        if (this.props.userId === 99999) {
            this.props.history.push('/signin');
        } else {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet light portlet-fit bordered">
                            <div className="portlet-title">
                                <div className="caption">
                                    <i className=" icon-layers font-green"></i>
                                    <span className="caption-subject font-green bold uppercase">Reservation</span>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <form className="reservation-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                            {/*{this.renderErrors()}*/}
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <Field
                                                        component={this.renderDateField}
                                                    />
                                                    <Field
                                                        component={this.renderTimeField}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="create-account">
                                                        <p>
                                                            <Link className="btn blue btn-outline" to="/dashboard/locations">Back</Link>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 text-right">
                                                    <button className="btn green" type="submit">Submit</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

function validate(values) {
    const errors = {};

    // if (!values.email) errors.email = 'Enter an email';
    // if (!values.password) errors.password = 'Enter a password';
    // if (!values.end_year) errors.end_year = 'Enter an end year';
    // if (values.end_year < values.start_year) errors.end_year = 'Enter a valid end year';

    return errors;
}

// function mapStateToProps(state) {
//     return {authData: state.authData}
// }

export default reduxForm({
    validate,
    form: 'ReservationForm'
})(
    connect(null, {reserveField})(withRouter(Reservation))
);
