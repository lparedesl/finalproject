import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import Table from './table';
import {getUserReservations} from '../../actions';
import {getUserInfo} from '../../actions';

class Content extends Component {
    constructor() {
        super();

        this.isSignedIn = this.isSignedIn.bind(this);
    }

    componentDidMount() {
        this.props[`get${this.props.title}`]();
        this.props.getUserInfo();
    }

    isSignedIn() {
        if (this.props.userInfo) {
            return this.props.userInfo.id
        }

        return 99999
    }

    render() {
        return (
            <div>
                <h1 className="page-title">
                    {this.props.title}
                </h1>
                <div className="row">
                    {console.log(this.props.reservations)}
                    <div className="col-md-12">
                        <div className="portlet light portlet-fit portlet-datatable bordered">
                            <div className="portlet-title">
                                <div className="caption">
                                    <i className=" icon-layers font-green"></i>
                                    <span className="caption-subject font-green sbold uppercase">Sample Datatable</span>
                                </div>
                                <div className="actions">
                                    <a className="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                                        <i className="icon-cloud-upload"></i>
                                    </a>
                                    <a className="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                                        <i className="icon-wrench"></i>
                                    </a>
                                    <a className="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                                        <i className="icon-trash"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <Table/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        // reservations: state.userReservations,
        userInfo: state.authData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getReservations: getUserReservations,
        getUserInfo: getUserInfo
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
