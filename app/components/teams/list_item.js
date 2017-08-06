import React from "react";

const ListItem = (props) => {
    const {data} = props;

    return (
        <li className="mt-list-item">
            <div className="list-icon-container">
                <a onClick={() => props.selectTeam(data)}>
                    <i className="fa fa-angle-right"></i>
                </a>
            </div>
            <div className="list-item-content">
                <h2 className="uppercase">
                    <p>{data.name}</p>
                </h2>
            </div>
        </li>
    );
};

export default ListItem;
