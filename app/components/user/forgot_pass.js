import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {getAuthData} from '../../actions/index';

class ForgotPassForm extends Component {
    componentDidMount() {
        this.props.getAuthData();
    }

    renderTextField(field) {
        const {meta: {touched, error}} = field;
        const className = `${touched && error ? 'has-error' : ''}`;

        return (
            <div className={className}>
                <input className="form-control placeholder-no-fix form-group" type={field.type} autoComplete="off" placeholder={field.placeholder} name={field.bodyName} />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="col-md-6 login-container bs-reset mt-login-5-bsfix">
                <div className="login-content">
                    <form className="forget-form" action="javascript:;" method="post">
                        <h3 className="font-green">Forgot Password?</h3>
                        <p> Enter your e-mail address below to reset your password. </p>
                        <div className="form-group">
                            <Field
                                placeholder="Email"
                                bodyName="email"
                                name="email"
                                type="text"
                                component={this.renderTextField}
                            />
                        </div>
                        <div className="form-actions">
                            <Link className="btn green btn-outline" to="/user/signin">Back</Link>
                            <button type="submit" className="btn btn-success uppercase pull-right">Submit</button>
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

    return errors;
}

function mapStateToProps(state) {
    return {csrfToken: state.csrfToken}
}

export default reduxForm({
    validate,
    form: 'ForgotPassForm'
})(
    connect(mapStateToProps, {getAuthData})(ForgotPassForm)
);
