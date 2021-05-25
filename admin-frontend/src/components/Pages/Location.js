import React, { useState, useEffect } from "react";
import Sidebar from "./../template_parts/Sidebar";
import "../../css/card.css";
import { connect } from "react-redux";
import { loadLocation } from "../../actions/location";
import Spinner from "./../template_parts/Spinner";
import { v4 as uuidv4 } from "uuid";
import { IMAGES_ROOT } from "../urls";

function Location({ isLoading, location, loadLocation, match }) {
  let locationId = match.params.id;
  useEffect(() => {
    loadLocation(locationId);
  }, [loadLocation]);

  let root = IMAGES_ROOT + "/locations/";

  let images = location ? location.images : [];

  const [current, setCurrent] = useState(
    Math.floor(Math.random() * images.length)
  );

  const nextSlide = (index) => {
    index = current + index;
    if (index < 0) index = images.length - 1;
    else if (index >= images.length) index = 0;

    setCurrent(index);
  };
  return location === null ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <div className="row">
        <div className="col-md-5">
          <div className="card">
            <div className="img-container">
              <img
                className="card-img-top custom-fade"
                src={root + images[current].fileName}
                alt="Card image cap"
                style={{ height: "14rem" }}
              />

              <a className="prev" onClick={(e) => nextSlide(-1)}>
                &#10094;
              </a>
              <a className="next" onClick={(e) => nextSlide(1)}>
                &#10095;
              </a>
            </div>
            <div className="card-body">
              <h5 className="card-title text-info text-center">
                {location.name}
              </h5>
              <h3 className="card-title text-info text-center pricing-card-title">
                {location.price}€/jour
              </h3>
              <ul class="list-group ">
                <li class="list-group-item">Adresse : {location.street}</li>
                <li class="list-group-item">
                  Code postal : {location.postal_code}
                </li>
                <li class="list-group-item">Ville : {location.city}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <h3 className="text-info">Description du bien</h3>

          <p className="card-text">{location.description}</p>

          <table className="table table-striped">
            <thead>
              <tr>
                <td colspan="2" className=" text-center bg-info text-white">
                  <h3>Les parametres du logement</h3>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chambres</td>
                <td>{location.rooms}</td>
              </tr>
              <tr>
                <td>Surface</td>
                <td>
                  {location.surface} {"  "} m²
                </td>
              </tr>
              <tr>
                <td>Capacité d'accueil</td>
                <td>{location.travelers} voyageurs</td>
              </tr>
              {location.fieldValues.map((item) => (
                <tr key={uuidv4()}>
                  <td>{item.field.name} </td>
                  <td>{item.fieldValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  location: state.location.location,
  isLoading: state.location.loadingLocation,
});
export default connect(mapStateToProps, {
  loadLocation,
})(Location);
