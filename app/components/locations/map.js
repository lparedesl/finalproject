import _ from "lodash";
import React, {Component} from "react";
import Helmet from "react-helmet";
import {withGoogleMap, GoogleMap, Marker} from "react-google-maps";

const GettingStartedGoogleMap = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={15}
        defaultCenter={{ lat: 25.0112183, lng: 121.52067570000001 }}
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

export default class Map extends Component {
    constructor() {
        super();

        this.state = {
            markers: [{
                position: {
                    lat: 25.0112183,
                    lng: 121.52067570000001,
                },
                key: `Taiwan`,
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

    /*
     * This is called when you click on the map.
     * Go and try click now.
     */
    handleMapClick(event) {
        const nextMarkers = [
            ...this.state.markers,
            {
                position: event.latLng,
                defaultAnimation: 2,
                key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
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
        /*
         * All you modify is data, and the view is driven by data.
         * This is so called data-driven-development. (And yes, it's now in
         * web front end and even with google maps API.)
         */
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
                        <i className=" icon-layers font-blue"></i>
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
                                markers={this.state.markers}
                                onMarkerRightClick={this.handleMarkerRightClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
