import React, { Component } from "react";

// Importing our listItem component
// import ListItem from "./list_item";

// Importing an array of test data to use
// import testdata from "./testdata";

class LocationList extends Component {
  // getInitialState() {
  //   return {
  //     testdata : [
  //       {
  //         id: "cww10l1e8hokult6jq0k9",
  //         name: "Park 1",
  //         address: "123 Main St"
  //       },
  //       {
  //         id: "68tcvygn9wrjoz6qd7vi",
  //         name: "Park 2",
  //         address: "245 Main St"
  //       },
  //       {
  //         id: "qa0pz28jmtz94vj4kuik9",
  //         name: "Park 3",
  //         address: "789 Main St"
  //       },
  //       {
  //         id: "tm5oxvlev8tol5zh0k9",
  //         name: "Park 4",
  //         address: "147 Main St"
  //       },
  //       {
  //         id: "8bfxjtrbcbx0opjbgldi",
  //         name: "Park 5",
  //         address: "369 Main St"
  //       }
  //     ]
  //   }
  // }
  // renderList() {
  //   return (
  //     {props.testdata.map((data, i) =>
  //       <li className="mt-list-item">
  //         <div className="list-icon-container">
  //           <a href="javascript:;">
  //             <i className="fa fa-angle-right"></i>
  //           </a>
  //         </div>
  //         <div className="list-item-content">
  //           <h3 className="uppercase">
  //             <a href="javascript:;">{props.testdata.name}</a>
  //           </h3>
  //           <p>
  //             {props.testdata.address}
  //           </p>
  //         </div>
  //       </li>
  //      )}
  //     );
  // }
  render() {
    // Run {this.renderList()} inside the div to return the result of the method
    return (
        <div className="portlet light portlet-fit bordered">
            <div className="portlet-title">
                <div className="caption">
                    <i className=" icon-layers font-green"></i>
                    <span className="caption-subject font-green bold uppercase">Locations</span>
                </div>
            </div>
            <div className="portlet-body">
                <div className="mt-element-list">
                    <div className="mt-list-container list-news">
                        <ul>
                          {/* {this.renderList()} */}
                          <li>something will go here</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

// Exporting this component as the default (only) export
export default LocationList;
