import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from '../header';
import Sidebar from '../sidebar';
import Footer from '../footer';
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
                                                    <Table
                                                        reservations={this.props.reservations}
                                                    />
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

    // render() {
    //     return (
    //         <div>
    //             <h1 className="page-title">
    //                 {this.props.title}
    //             </h1>
    //             <div className="row">
    //                 <div className="col-md-12">
    //                     <div className="portlet light portlet-fit portlet-datatable bordered">
    //                         <div className="portlet-title">
    //                             <div className="caption">
    //                                 <i className=" icon-calendar font-green"></i>
    //                                 <span className="caption-subject font-green sbold uppercase">Reservations for {this.props.userInfo.first_name} {this.props.userInfo.last_name}</span>
    //                             </div>
    //                         </div>
    //                         <div className="portlet-body">
    //                             <div className="row">
    //                                 <div className="col-md-12 table-wrapper">
    //                                     <Table
    //                                         reservations={this.props.reservations}
    //                                     />
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
}

function mapStateToProps(state) {
    return {
        reservations: state.userReservations,
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
