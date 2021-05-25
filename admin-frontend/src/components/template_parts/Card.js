import React from "react";

const Card = ({ image, title, description }) => {
  return (
    <div>
      <div className="col-md-4 my-2">
        <div className="card rounded" style={{ width: "16rem" }}>
          <img
            className="card-img-top"
            style={{ height: "13rem" }}
            src={image}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>

            {/* <a href="logements.html" className="btn btn-info btn-block">
              Voir les hébergements
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
