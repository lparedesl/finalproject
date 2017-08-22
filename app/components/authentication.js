import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import SignIn from './user/signin_form';
import SignUp from './user/signup_form';
import ForgotPassword from './user/forgot_pass';

class Authentication extends Component {
    componentDidMount() {
        document.body.classList.add("login");
    }

    render() {
        return (
            <div className="user-login-5">
                <div className="row bs-reset">
                    <div className="col-md-6 bs-reset mt-login-5-bsfix">
                        <div className="login-bg" style={{backgroundImage: 'url(/pages/img/bg03.jpg)'}}>
                            {/*<img class="login-logo" src="/pages/img/login/logo.png" />*/}
                        </div>
                    </div>
                    <Route path="/user/signin" component={SignIn}/>
                    <Route path="/user/signup" component={SignUp}/>
                    <Route path="/user/forgot-password" component={ForgotPassword}/>
                </div>
            </div>
        )
    }
}

export default Authentication;