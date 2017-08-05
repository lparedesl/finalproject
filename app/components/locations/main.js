import React, {Component} from 'react';
import {connect} from 'react-redux';
import LocationDetails from './location_details';
import LocationList from './location_list';
import {getLocations} from '../../actions';

class Main extends Component {
    componentDidMount() {
        this.props.getLocations();
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
        location: state.activeLocation
    }
}

export default connect(mapStateToProps, {getLocations})(Main);
