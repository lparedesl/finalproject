import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LocationDetails from './location_details';
import LocationList from './location_list';
import {getLocations} from '../../actions';
import {getUserInfo} from '../../actions';

class Main extends Component {
    componentDidMount() {
        this.props.getLocations();
        this.props.getUserInfo();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3">
                    <LocationList
                        items={this.props.locations}
                    />
                </div>
                <div className="col-md-9">
                    <LocationDetails
                        userId={this.props.userInfo.id}
                        location={this.props.location}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
