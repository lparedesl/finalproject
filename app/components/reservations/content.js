import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
// import {getReservations} from '../../actions';
import {getUserInfo} from '../../actions';

class Content extends Component {
    constructor() {
        super();

        this.isSignedIn = this.isSignedIn.bind(this);
    }

    componentDidMount() {
        // this.props[`get${this.props.title}`]();
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
                                        <table className="table table-striped table-bordered table-hover table-checkable order-column" id="sample_2">
                                            <thead>
                                                <tr>
                                                    <th className="table-checkbox">
                                                        <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                                            <input type="checkbox" className="group-checkable" data-set="#sample_2 .checkboxes" />
                                                            <span></span>
                                                        </label>
                                                    </th>
                                                    <th> Location </th>
                                                    <th> Field Number </th>
                                                    <th> Sport </th>
                                                    {/*<th> Date </th>*/}
                                                    {/*<th> Time </th>*/}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="odd gradeX">
                                                    <td>
                                                        <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                                            <input type="checkbox" className="checkboxes" value="1" />
                                                            <span></span>
                                                        </label>
                                                    </td>
                                                    <td> shuxer </td>
                                                    <td>
                                                        <a href="mailto:shuxer@gmail.com"> shuxer@gmail.com </a>
                                                    </td>
                                                    <td>
                                                        <span className="label label-sm label-success"> Approved </span>
                                                    </td>
                                                </tr>
                                                <tr className="odd gradeX">
                                                    <td>
                                                        <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                                            <input type="checkbox" className="checkboxes" value="1" />
                                                            <span></span>
                                                        </label>
                                                    </td>
                                                    <td> shuxer </td>
                                                    <td>
                                                        <a href="mailto:shuxer@gmail.com"> shuxer@gmail.com </a>
                                                    </td>
                                                    <td>
                                                        <span className="label label-sm label-success"> Approved </span>
                                                    </td>
                                                </tr>
                                                <tr className="odd gradeX">
                                                    <td>
                                                        <label className="mt-checkbox mt-checkbox-single mt-checkbox-outline">
                                                            <input type="checkbox" className="checkboxes" value="1" />
                                                            <span></span>
                                                        </label>
                                                    </td>
                                                    <td> shuxer </td>
                                                    <td>
                                                        <a href="mailto:shuxer@gmail.com"> shuxer@gmail.com </a>
                                                    </td>
                                                    <td>
                                                        <span className="label label-sm label-success"> Approved </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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
        // reservation: state.activeReservation,
        userInfo: state.authData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // getReservations: getReservations,
        getUserInfo: getUserInfo
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);
