import React, {Component} from 'react';
import {connect} from 'react-redux';
import Table from './table';

class Content extends Component {
    render() {
        return (
            <div className="page-content">
                <h1 className="page-title">
                    {this.props.title}
                </h1>
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet light portlet-fit portlet-datatable bordered">
                            <div className="portlet-title">
                                <div className="caption">
                                    <i className=" icon-calendar font-green"></i>
                                    <span className="caption-subject font-green sbold uppercase">Reservations for {this.props.userInfo.first_name} {this.props.userInfo.last_name}</span>
                                </div>
                            </div>
                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-md-12 table-wrapper">
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
    return {userInfo: state.authData}
}

export default connect(mapStateToProps)(Content);
