import React from "react";

const ListItem = (props) => {
  // Rendering an li tag with props.children between the tags (grocery text)
  return (
    // <li className="list-group-item">
    //   {props.children}
    // </li>
    <li className="mt-list-item">
        <div className="list-icon-container">
            <a href="javascript:;">
                <i className="fa fa-angle-right"></i>
            </a>
        </div>
        <div className="list-item-content">
            <h3 className="uppercase">
                <a href="javascript:;">{props.children.name}</a>
            </h3>
            <p>
              {props.children.address}
            </p>
        </div>
    </li>
  );
};

// Exporting this component as the default (only) export
export default ListItem;
