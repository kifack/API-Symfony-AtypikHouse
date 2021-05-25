import React from "react";
import { Link } from "react-router-dom";
import "../../css/card.css";
import { IMAGES_ROOT } from "../urls";

const InspirationCard = ({ source, thematic, onFront }) => {
  let imageView = IMAGES_ROOT + "/thematics/" + thematic.fileName;

  let frontGrid;
  onFront ? (frontGrid = "frontGrid") : (frontGrid = "disableFront");
  return (
    <div className={"bg-image card " + frontGrid}>
      <div
        className="cont_image_them"
        style={{ background: `url(${imageView})no-repeat center center/cover` }}
      ></div>
      <div className="bg-blackOpac"> </div>
      <h1 className="center-description">{thematic.name}</h1>
      <div className="img-overlay"></div>
      <div className="details d-flex align-items-center flex-column">
        <p className="text-center">
          {thematic.description.substring(0, thematic.description.length / 2)}
        </p>
        <div className="text-center">
          <Link
            to={`/locations?thematics=${thematic.id}`}
            className="btn btn-link"
            style={{
              textDecoration: "none",
              color: "#17a2b8",
              fontWeight: "bold",
            }}
          >
            <i className="far fa-star text-info mr-2" />
            Hebergements
            <i className="far fa-star text-info ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InspirationCard;
