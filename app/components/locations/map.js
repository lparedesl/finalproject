import React, {Component} from "react";
import {connect} from 'react-redux';
import Helmet from "react-helmet";
import {withGoogleMap, GoogleMap, Marker} from "react-google-maps";

const GettingStartedGoogleMap = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={15}
        center={ props.coordinates }
        onClick={props.onMapClick}
    >
        {props.markers.map((marker, index) => (
            <Marker
                {...marker}
                onRightClick={() => props.onMarkerRightClick(index)}
            />
        ))}
    </GoogleMap>
));

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            markers: [{
                position: {
                    lat: props[props.item].lat,
                    lng: props[props.item].lng,
                },
                key: props.city,
                defaultAnimation: 2,
            }],
        };

        this.handleMapLoad = this.handleMapLoad.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
    }

    handleMapLoad(map) {
        this._mapComponent = map;
        if (map) {
            console.log(map.getZoom());
        }
    }

    handleMapClick(event) {
        const nextMarkers = [
            ...this.state.markers,
            {
                position: event.latLng,
                defaultAnimation: 2,
                key: Date.now(),
            },
        ];
        this.setState({
            markers: nextMarkers,
        });

        if (nextMarkers.length === 3) {
            this.props.toast(
                `Right click on the marker to remove it`,
                `Also check the code!`
            );
        }
    }

    handleMarkerRightClick(targetMarker) {
        const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
        this.setState({
            markers: nextMarkers,
        });
    }

    render() {
        return (
            <div className="portlet light portlet-fit bordered">
                <div className="portlet-title">
                    <div className="caption">
                        <i className=" icon-map font-blue"></i>
                        <span className="caption-subject font-blue bold uppercase">Map</span>
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
                    <div id="gmap_marker" className="gmaps" style={{position: 'relative', overflow: 'hidden'}}>
                        <div style={{height: `100%`}}>
                            <Helmet
                                title="Getting Started"
                            />
                            <GettingStartedGoogleMap
                                containerElement={
                                    <div style={{ height: `100%` }} />
                                }
                                mapElement={
                                    <div style={{ height: `100%` }} />
                                }
                                onMapLoad={this.handleMapLoad}
                                onMapClick={this.handleMapClick}
                                markers={[{
                                    position: {
                                        lat: this.props[this.props.item].lat,
                                        lng: this.props[this.props.item].lng,
                                    },
                                    key: this.props[this.props.item].city,
                                    defaultAnimation: 2,
                                }]}
                                onMarkerRightClick={this.handleMarkerRightClick}
                                coordinates={ {lat: this.props[this.props.item].lat, lng: this.props[this.props.item].lng} }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        locationItem: state.activeLocation,
        favoriteLocation: state.activeFavoriteLocation,
    }
}

export default connect(mapStateToProps)(Map);
