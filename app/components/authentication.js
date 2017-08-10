import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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
                    <Router>
                        <div>
                            <Switch>
                                <Route path="/user/signin" component={SignIn}/>
                                <Route path="/user/signup" component={SignUp}/>
                                <Route path="/user/forgot-password" component={ForgotPassword}/>
                            </Switch>
                        </div>
                    </Router>
                </div>
            </div>
        )
    }
}

export default Authentication;