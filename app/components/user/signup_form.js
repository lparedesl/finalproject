import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import {getAuthData} from '../../actions';
import {signup} from '../../actions';

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
        const className = `col-xs-6 ${touched && error ? 'has-error' : ''}`;

        return (
            <div className={className}>
                <input className="form-control form-control-solid placeholder-no-fix form-group" id="mask_phone" type="text" autoComplete="off" name={field.bodyName} placeholder={field.placeholder} required {...field.input}/>
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
                <select className="form-control" name={field.bodyName} required {...field.input}>
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
                <input className="form-control form-control-inline input-medium date-picker" id="signup-dob" size="16" type={field.type} name={field.bodyName} placeholder={field.placeholder} value="" {...field.input}/>
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
                    {messages.map(message => <span key={message}> {message} </span>)}
                </div>
            )
        }
    }

    onSubmit(values) {
        values.dob = moment(new Date(document.getElementById("signup-dob").value)).format();
        this.props.signup(values);
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="col-md-6 login-container bs-reset mt-login-5-bsfix">
                <div className="login-content signup-content">
                    <h1>Sign up</h1>
                    <form className="login-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    {/*<form className="login-form" action="/signup" method="POST">*/}
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

    // if (!values.topic) errors.topic = 'Enter a topic';
    // if (!values.start_year) errors.start_year = 'Enter a start year';
    // if (!values.end_year) errors.end_year = 'Enter an end year';
    // if (values.end_year < values.start_year) errors.end_year = 'Enter a valid end year';

    return errors;
}

function mapStateToProps(state) {
    return {authData: state.authData}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAuthData: getAuthData,
        signup: signup
    }, dispatch)
}

export default reduxForm({
    validate,
    form: 'SignUpForm'
})(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpForm))
);
