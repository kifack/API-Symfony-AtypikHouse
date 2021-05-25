import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import "../../css/card.css";
import { v4 as uuidv4 } from "uuid";
import { IMAGES_ROOT } from "../urls";

const LocationCard = ({ location }) => {
  let root = IMAGES_ROOT + "/locations/";
  let imgs = location.images.length > 0 ? location.images : [];

  const [current, setCurrent] = useState(0);
  const [images, setImges] = useState(imgs);

  const nextSlide = (index) => {
    index = current + index;
    if (index < 0) index = images.length - 1;
    else if (index >= images.length) index = 0;

    setCurrent(index);
  };
  let rating = 0;
  if (location.reviews) {
    if (location && location.reviews.length > 0) {
      rating = location.reviews.reduce(
        (accumulator, currentValue) => accumulator + currentValue.rating,
        0
      );
      rating = rating / location.reviews.length;
    }
  }

  const addToWhishList = (e) => {
    e.target.classList.toggle("text-danger");

    let array = localStorage.getItem("whishlist");

    if (array) {
      array = JSON.parse(array);
    } else {
      array = [];
    }

    array.push(location);

    localStorage.setItem("whishlist", JSON.stringify(array));
  };
  return (
    <div className="card house-card ">
      <div className="img-container">
        <img
          className="custom-card-img-top slide fade-slide"
          src={root + images[current].fileName}
        />
        <div className="slider text-center">
          {images.map((image, index) => (
            <span
              key={uuidv4()}
              className={`dot  ${index == current ? "active" : ""}`}
              onClick={(e) => setCurrent(index)}
            />
          ))}
        </div>
        <a className="prev" onClick={(e) => nextSlide(-1)}>
          ❮
        </a>
        <a className="next" onClick={(e) => nextSlide(1)}>
          ❯
        </a>
      </div>
      <div className="bg-info p-2" style={{ opacity: ".7" }}>
        <div className="row px-2">
          <div className="col-md-4">
            <div className="text-white h4">
              {location.rooms}
              <i className="ml-2 fas fa-bed  text-white" />
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="text-white"
              style={{ fontSize: 20, fontWeight: "bold" }}
            >
              {location.price}
              <i className=" ml-2 fas fa-euro-sign" />
            </div>
          </div>
          <div className="col-md-4">
            <button className="btn btn-light-outline" onClick={addToWhishList}>
              <i
                className="fas fa-heart text-white mt-2"
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="card-body text-dark">
        <h3 className="text-info mb-1"> {location.name}</h3>
        <div>
          {location.street}
          <span className="ml-2 text-secondary">
            ( {location.city} - {location.postal_code})
          </span>
        </div>
        <div>{location.description}</div>
        <p>
          <Rating value={rating} color={"#ffc107"} />
        </p>
        <Link
          to={"/location/" + location.id}
          className=" btn btn-light btn-block"
        >
          {" "}
          Voir en details
        </Link>
      </div>
    </div>
  );
};

export default LocationCard;
