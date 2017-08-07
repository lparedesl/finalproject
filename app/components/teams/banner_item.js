import React from "react";

const BannerItem = (props) => {
  const {data} = props;

  return (
    <li className="mt-list-item done">
        <div className="list-icon-container">
            <i className="icon-check"></i>
        </div>
        <div className="list-datetime"> {data.phone} </div>
        <div className="list-item-content">
            <h3 className="uppercase">
                <a href="javascript:;">{data.name}</a>
            </h3>
        </div>
    </li>
  )
};

export default BannerItem;
