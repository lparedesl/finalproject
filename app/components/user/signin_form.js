import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {getAuthData} from '../../actions';

class SignInForm extends Component {
    componentWillMount() {
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

    renderErrors() {
        if (this.props.authData) {
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
    }

    render() {
        return (
            <div className="col-md-6 login-container bs-reset mt-login-5-bsfix">
                <div className="login-content">
                    <h1>Sign in</h1>
                    <form className="login-form" action="/authentication/signin" method="POST">
                        {this.renderErrors()}
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
                                    <Link className="forget-password" id="forget-password" to="/user/forgot-password">Forgot Password ?</Link>
                                </div>
                                <input type="hidden" name="_csrf" value={this.props.authData ? this.props.authData.csrfToken : ''} />
                                <button className="btn green" type="submit">Sign In</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="create-account">
                                    <p>
                                        <Link className="btn blue btn-outline" to="/user/signup">Create an account</Link>
                                    </p>
                                </div>
                            </div>
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

    if (!values.email) errors.email = 'Enter an email';
    if (!values.password) errors.password = 'Enter a password';

    return errors;
}

function mapStateToProps(state) {
    return {authData: state.authData}
}

export default reduxForm({
    validate,
    form: 'SignInForm'
})(
    connect(mapStateToProps, {getAuthData})(SignInForm)
);
