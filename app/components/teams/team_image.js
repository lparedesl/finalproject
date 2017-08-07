import React from "react";

const TeamImage = (props) => {
  const {image, name} = props;

  return (
    <div className="row">
        <div className="col-sm-12">
            <div className="thumbnail">
                <img src={image} alt={name} />
            </div>
        </div>
    </div>
  )
};

export default TeamImage;
