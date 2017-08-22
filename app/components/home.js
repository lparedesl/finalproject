import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserInfo} from './../actions';

class Home extends Component {
    constructor() {
        super();

        this.renderOptions = this.renderOptions.bind(this);
    }

    componentWillMount() {
        this.props.getUserInfo((data, cb) => {
            if (!data) {
                cb(false);
            } else {
                cb(true);
            }
        });
    }

    componentDidMount() {
        document.body.classList.add("home");
    }

    renderOptions() {
        if (!this.props.userInfo || !this.props.userInfo.id) {
            return (
                <span className="border">
                    <Link to="/user/signin">Sign in</Link>
                </span>
            )
        }

        return (
            <span className="border">
                <Link to="/dashboard/locations">Locations</Link> | <Link to="/dashboard/teams">Teams</Link> | <Link to="/dashboard/reservations">Reservations</Link>
            </span>
        )
    }

    render() {
        return (
            <div>
                <div className="pimg1">
                    <div className="ptext">
                        <span className="border">County Parks Field Reservations</span>
                    </div>
                </div>

                <section className="section section-dark ">
                    <h2>We're making things easier</h2>
                    <p>
                        In the past, to reserve a field, you would have to fax in a request form, wait for approval from someone. If it was after office hours, you would have to wait until the next business day. Not anymore!
                    </p>
                </section>

                <div className="pimg2">
                    <div className="ptext">
                        <span className="border trans">Reservations In Seconds!</span>
                    </div>
                </div>

                <section className="section section-dark">
                    <h2>Wait no more!</h2>
                    <p>
                        Our new system is all web based. You'll be able to see if the field you want is already reserved and/or when it is available. Cancelling and changing reservations are also simple. Like a certain field better than others? Save it in your favorites.
                    </p>
                </section>

                <div className="pimg3">
                    <div className="ptext">
                        <span className="border trans">Beta</span>
                    </div>
                </div>

                <section className="section section-dark">
                    <h2>More to come</h2>
                    <p>
                        We're rolling out a few parks at a time so don't worry if your favorite park isn't available yet, it will be very soon. In the meantime, get out the the parks and have a great time!
                    </p>
                </section>

                <div className="pimg1">
                    <div className="ptext">
                        {this.renderOptions()}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {userInfo: state.authData}
}

export default connect(mapStateToProps, {getUserInfo})(Home);