import React, { Component } from "react";

class Map extends Component {
    renderMap() {
        const map = new GMaps({
            el: '#map',
            zoom: 15,
            lat: 35.22720,
            lng: -80.84309
        });

        map.addMarker({
            lat: 35.18992,
            lng: -80.84478,
            title: 'Freedom Park',
        });
    }

    render() {
        return (
            <div className="portlet light portlet-fit bordered">
                <div className="portlet-title">
                    <div className="caption">
                        <i className=" icon-layers font-blue"></i>
                        <span className="caption-subject font-blue bold uppercase">Markers</span>
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
                    <div id="map"></div>
                    {this.renderMap()}
                </div>
            </div>
        );
    }
}

// Exporting this component as the default (only) export
export default Map;
