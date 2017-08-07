import React from "react";

const ListItem = (props) => {
    const {data} = props;

    return (
        <li className="mt-list-item">
            <div className="list-icon-container">
              <a className="list-icon-container">
                <i className="icon-star"></i>
              </a>
              <a onClick={() => props.selectLocation(data)}>
                <i className="fa fa-angle-right"></i>
              </a>
            </div>
            <div className="list-item-content">
              <h3 className="uppercase">
                <p>{data.name}</p>
              </h3>
            </div>
        </li>
    );
};

export default ListItem;
