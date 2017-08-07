import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Footer extends Component {
    render() {
        return (
            <div className="page-footer">
                <div className="page-footer-inner"> &copy; &copy; Team Everest | 2017
                </div>
                <div className="scroll-to-top">
                    <i className="icon-arrow-up"></i>
                </div>
            </div>
        )
    }
}

export default Footer;
