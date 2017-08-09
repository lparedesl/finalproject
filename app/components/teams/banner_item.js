import React from "react";

const BannerItem = (props) => {
  const {data} = props;

  return (
    <li className="mt-list-item">
        <div className="list-icon-container done">
            <i className="icon-user"></i>
        </div>
        <div className="list-datetime"> {data.phone} </div>
        <div className="list-item-content">
            <h3 className="uppercase">
                <a href="javascript:;">{data.first_name} {data.last_name}</a>
            </h3>
        </div>
    </li>
  )
};

export default BannerItem;
