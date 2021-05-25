import React, { useEffect } from "react";
import LocationCard from "../template_parts/LocationCard";
import { v4 as uuidv4 } from "uuid";

const WhishList = (props) => {
  let locations = [];
  if (localStorage.getItem("whishlist")) {
    locations = localStorage.getItem("whishlist");
    locations = JSON.parse(locations) || [];
  }

  return (
    <React.Fragment>
      <div className="container my-3">
        <h1 className="text-info">Vos locations préférées</h1>
        <div className="row">
          {locations.length == 0 ? (
            <div>Aucun résultat</div>
          ) : (
            locations.map((location) => (
              <div key={uuidv4()} className="col-md-4">
                <LocationCard location={location} />
              </div>
            ))
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default WhishList;
