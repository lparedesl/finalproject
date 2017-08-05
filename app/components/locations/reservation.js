import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

class Reservation extends Component {
    // componentDidMount() {
    //     this.props.getAuthData();
    // }

    renderTextField(field) {
        const {meta: {touched, error}} = field;
        const className = `col-xs-6 ${touched && error ? 'has-error' : ''}`;

        return (
            <div className={className}>
                <input className="form-control form-control-solid placeholder-no-fix form-group" type={field.type} autoComplete="off" placeholder={field.placeholder} name={field.bodyName} required />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
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
                                    <form action="/api/reserve-field" className="login-form" method="POST">
                                        {/*{this.renderErrors()}*/}
                                        <div className="row">
                                            <Field
                                                placeholder="Email"
                                                bodyName="email"
                                                name="email"
                                                type="text"
                                                component={this.renderTextField}
                                            />
                                            <Field
                                                placeholder="Password"
                                                bodyName="password"
                                                name="password"
                                                type="password"
                                                component={this.renderTextField}
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="rem-password">
                                                    <label className="rememberme mt-checkbox mt-checkbox-outline">
                                                        <input type="checkbox" name="remember" value="1" /> Remember me
                                                        <span></span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-sm-8 text-right">
                                                <div className="forgot-password">
                                                    <Link className="forget-password" id="forget-password" to="/forgot-password">Forgot Password ?</Link>
                                                </div>
                                                {/*<input type="hidden" name="_csrf" value={this.props.authData.csrfToken} />*/}
                                                <button className="btn green" type="submit">Sign In</button>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="create-account">
                                                    <p>
                                                        <Link className="btn blue btn-outline" to="/locations">Back</Link>
                                                    </p>
                                                </div>
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

function validate(values) {
    const errors = {};

    if (!values.email) errors.email = 'Enter an email';
    if (!values.password) errors.password = 'Enter a password';
    // if (!values.end_year) errors.end_year = 'Enter an end year';
    // if (values.end_year < values.start_year) errors.end_year = 'Enter a valid end year';

    return errors;
}

function mapStateToProps(state) {
    return {authData: state.authData}
}

export default reduxForm({
    validate,
    form: 'ReservationForm'
})(
    connect(null, null)(Reservation)
);