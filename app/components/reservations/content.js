import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from '../header';
import Sidebar from '../sidebar';
import Footer from '../footer';
import Table from './table';
import {getUserReservations} from '../../actions';
import {getUserInfo} from '../../actions';

class Content extends Component {
    componentDidMount() {
        document.body.classList.remove("home");
        document.body.classList.add("page-header-fixed", "page-sidebar-closed-hide-logo", "page-content-white", "page-md", "page-container-bg-solid", "page-sidebar-closed");
        this.props[`get${this.props.title}`]();
        this.props.getUserInfo();
    }

    render() {
        if (!this.props.userInfo) {
            return this.props.history.push('/');
        }

        return (
            <div className="page-wrapper">
                <Header/>
                <div className="clearfix"> </div>
                <div className="page-container">
                    {console.log("FROM PAGE_CONTENT_TEST:", this.props.location)}
                    <Sidebar
                        location={`/dashboard/${this.props.title.toLowerCase()}`}
                    />
                    <div className="page-content-wrapper">
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
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {userInfo: state.authData}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getReservations: getUserReservations,
        getUserInfo: getUserInfo
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Content));
