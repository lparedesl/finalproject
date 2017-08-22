import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {getAuthData} from '../../actions';

class SignUpForm extends Component {
    componentDidMount() {
        this.props.getAuthData();
    }

    renderTextField(field) {
        const {meta: {touched, error}} = field;
        const className = `form-control form-control-solid placeholder-no-fix form-group ${touched && error ? 'has-error' : ''}`;

        return (
            <div className="col-xs-6">
                <input className={className} type={field.type} autoComplete="off" placeholder={field.placeholder} name={field.bodyName} required {...field.input}/>
                <span className="help-block">{touched ? error : ''}</span>
            </div>
        );
    }

    renderTelField(field) {
        const {meta: {touched, error}} = field;
        const className = `form-control form-control-solid placeholder-no-fix form-group ${touched && error ? 'has-error' : ''}`;

        return (
            <div className="col-xs-6">
                <input className={className} id="mask_phone" type="text" autoComplete="off" name={field.bodyName} placeholder={field.placeholder} required {...field.input}/>
                <span className="help-block">{touched ? error : ''}</span>
            </div>
        );
    }

    renderSelectField(field) {
        const {options} = field;

        if (!options) {
            return <div>Loading...</div>;
        }

        const {meta: {touched, error}} = field;
        const className = `form-control ${touched && error ? 'has-error' : ''}`;

        return (
            <div className="col-xs-6">
                <select className={className} name={field.bodyName} required {...field.input}>
                    <option value="" disabled selected={true}>{field.title}</option>
                    {options.map(data => <option key={data.value} value={data.value}>{data.name}</option>)}
                </select>
                <span className="help-block">{touched ? error : ''}</span>
            </div>
        );
    }

    renderDateField(field) {
        const {meta: {touched, error}} = field;
        const className = `form-control form-control-inline input-medium date-picker ${touched && error ? 'has-error' : ''}`;

        return (
            <div className="col-xs-6">
                <input className={className} id="signup-dob" size="16" type={field.type} name={field.bodyName} placeholder={field.placeholder} {...field.input}/>
                <span className="help-block">{touched ? error : ''}</span>
            </div>
        );
    }

    renderErrors() {
        const {hasErrors, messages} = this.props.authData;
        if (hasErrors) {
            return (
                <div className="alert alert-danger">
                    <button className="close" data-close="alert"></button>
                    {messages.map(message => <span key={message}> {message} </span>)}
                </div>
            )
        }
    }

    render() {
        return (
            <div className="col-md-6 login-container bs-reset mt-login-5-bsfix">
                <div className="login-content signup-content">
                    <h1>Sign up</h1>
                    <form className="login-form" action="/authentication/signup" method="POST">
                        {this.renderErrors()}
                        <div className="row">
                            <Field
                                placeholder="First Name"
                                bodyName="first_name"
                                name="first_name"
                                type="text"
                                component={this.renderTextField}
                            />
                            <Field
                                placeholder="Last Name"
                                bodyName="last_name"
                                name="last_name"
                                type="text"
                                component={this.renderTextField}
                            />
                        </div>
                        <div className="row">
                            <Field
                                placeholder="Date of Birth"
                                bodyName="dob"
                                name="date_of_birth"
                                type="text"
                                component={this.renderDateField}
                            />
                            <Field
                                title="Gender"
                                bodyName="gender"
                                name="gender"
                                options={[
                                    {
                                        name: "Male",
                                        value: "M"
                                    },
                                    {
                                        name: "Female",
                                        value: "F"
                                    }
                                ]}
                                component={this.renderSelectField}
                            />
                        </div>
                        <div className="row">
                            <Field
                                placeholder="Phone Number"
                                bodyName="phone"
                                name="phone"
                                // type="tel"
                                component={this.renderTelField}
                            />
                        </div>
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
                            <Field
                                title="Admin?"
                                bodyName="is_admin"
                                name="is_admin"
                                options={[
                                    {
                                        name: "Yes",
                                        value: true
                                    },
                                    {
                                        name: "No",
                                        value: false
                                    }
                                ]}
                                component={this.renderSelectField}
                            />
                            <Field
                                placeholder="Confirm Password"
                                bodyName="confirm_password"
                                name="confirm_password"
                                type="password"
                                component={this.renderTextField}
                            />
                        </div>
                        <div className="form-actions">
                            <input type="hidden" name="_csrf" value={this.props.authData.csrfToken} />
                            <Link className="btn green btn-outline" to="/user/signin">Back</Link>
                            <button type="submit" className="btn btn-success uppercase pull-right">Sign Up</button>
                        </div>
                    </form>
                </div>
                <div className="login-footer">
                    <div className="row bs-reset">
                        <div className="col-xs-5 bs-reset">
                            <ul className="login-social">
                                <li>
                                    <a href="javascript:;">
                                        <i className="icon-social-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <i className="icon-social-twitter"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;">
                                        <i className="icon-social-dribbble"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-xs-7 bs-reset">
                            <div className="login-copyright text-right">
                                <p>Copyright &copy; Team Everest 2017</p>
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
    const re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    const hasNumber = /\d/;

    if (!values.first_name) errors.first_name = 'Enter a First Name';
    if (!values.last_name) errors.last_name = 'Enter a Last Name';
    // if (!values.date_of_birth) errors.date_of_birth = 'Enter a Date of Birth';
    if (!values.gender) errors.gender = 'Select a Gender';
    if (!hasNumber.test(values.phone)) errors.phone = 'Enter a phone number';
    if (!values.email) errors.email = 'Enter an email';
    if (!re.test(values.email)) errors.email = 'Enter a valid email';
    if (!values.password) errors.password = 'Enter a password';
    if (values.password && values.password.length < 6) errors.password = 'Enter a password longer than 6 characters';
    if (!values.is_admin) errors.is_admin = 'Select an Admin option';
    if (!values.confirm_password) errors.confirm_password = 'Enter a confirmation password';
    if (values.password !== values.confirm_password) errors.confirm_password = "Passwords don't match";

    return errors;
}

function mapStateToProps(state) {
    return {authData: state.authData}
}

export default reduxForm({
    validate,
    form: 'SignUpForm'
})(
    connect(mapStateToProps, {getAuthData})(SignUpForm)
);
