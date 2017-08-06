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

    renderSelectField(field) {
        const {options} = field;

        if (!options) {
            return <div>Loading...</div>;
        }

        const {meta: {touched, error}} = field;
        const className = `col-xs-6 ${touched && error ? 'has-error' : ''}`;

        return (
            <div className={className}>
                <select className="form-control" name={field.bodyName} required>
                    <option value="" disabled selected={true}>{field.title}</option>
                    {options.map(data => <option key={data.value} value={data.value}>{data.name}</option>)}
                </select>
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    renderDateField(field) {
        const {meta: {touched, error}} = field;
        const className = `col-xs-6 ${touched && error ? 'has-error' : ''}`;

        return (
            <div className={className}>
                <input className="form-control form-control-inline input-medium date-picker" size="16" type={field.type} name={field.bodyName} placeholder={field.placeholder} value="" />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    renderErrors() {
        const {hasErrors, messages} = this.props.authData;
        if (hasErrors) {
            return (
                <div className="alert alert-danger">
                    <button className="close" data-close="alert"></button>
                    {messages.map(message => <span> {message} </span>)}
                </div>
            )
        }
    }

    render() {
        return (
            <div className="col-md-6 login-container bs-reset mt-login-5-bsfix">
                <div className="login-content signup-content">
                    <h1>Sign up</h1>
                    <form action="/signup" className="login-form" method="POST">
                        {this.renderErrors()}
                        <div className="row">
                            <Field
                                placeholder="First Name"
                                bodyName="first_name"
                                type="text"
                                component={this.renderTextField}
                            />
                            <Field
                                placeholder="Last Name"
                                bodyName="last_name"
                                type="text"
                                component={this.renderTextField}
                            />
                        </div>
                        <div className="row">
                            <Field
                                placeholder="Date of Birth"
                                bodyName="dob"
                                type="text"
                                component={this.renderDateField}
                            />
                            <Field
                                title="Gender"
                                bodyName="gender"
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
                                type="tel"
                                component={this.renderTextField}
                            />
                        </div>
                        <div className="row">
                            <Field
                                placeholder="Email"
                                bodyName="email"
                                type="text"
                                component={this.renderTextField}
                            />
                            <Field
                                placeholder="Password"
                                bodyName="password"
                                type="password"
                                component={this.renderTextField}
                            />
                        </div>
                        <div className="row">
                            <Field
                                title="Admin?"
                                bodyName="is_admin"
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
                                type="password"
                                component={this.renderTextField}
                            />
                        </div>
                        <div className="form-actions">
                            <input type="hidden" name="_csrf" value={this.props.authData.csrfToken} />
                            <Link className="btn green btn-outline" to="/signin">Back</Link>
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

    // if (!values.topic) errors.topic = 'Enter a topic';
    // if (!values.start_year) errors.start_year = 'Enter a start year';
    // if (!values.end_year) errors.end_year = 'Enter an end year';
    // if (values.end_year < values.start_year) errors.end_year = 'Enter a valid end year';

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
