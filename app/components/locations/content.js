import React, {Component} from 'react';
// import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LocationDetails from './location_details';
import LocationList from './location_list';
import {getLocations} from '../../actions';
import {getUserInfo} from '../../actions';

class LocationsContent extends Component {
    constructor() {
        super();

        this.isSignedIn = this.isSignedIn.bind(this);
    }

    componentDidMount() {
        this.props.getLocations();
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
                    <div className="col-md-3">
                        <LocationList
                            title={this.props.title}
                            items={this.props.locations}
                        />
                    </div>
                    <div className="col-md-9">
                        <LocationDetails
                            titleSingular={this.props.titleSingular}
                            userId={this.isSignedIn()}
                            location={this.props.location}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        locations: state.locations,
        location: state.activeLocation,
        userInfo: state.authData
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getLocations: getLocations,
        getUserInfo: getUserInfo
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationsContent);
