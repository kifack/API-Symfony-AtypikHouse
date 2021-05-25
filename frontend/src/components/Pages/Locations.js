import React, { useEffect } from "react";
import LocationCard from "../template_parts/LocationCard";
import { loadLocations } from "../../actions/location";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Loader from "../template_parts/Loader";
import { dataDestinations } from "../../actions/destinations";
import { Circular } from "styled-loaders-react";
import { isEmptyObject } from "jquery";

const Locations = (props) => {
  let query = props.location.search.substring(1);

  useEffect(() => {
    props.loadLocations(query);
  }, [loadLocations]);
  let locations = props.locations.locations;
  let loading = props.locations.loading;

  return (
    <React.Fragment>
      {loading ? (
        <div className="conteneurLoader">
          <Circular color="#1b6e86 " size="150px" />
        </div>
      ) : (
        <div className="container my-3">
          <h1 className="text-info">Les locations disponibles</h1>

          {isEmptyObject(locations) ? (
            <div className="alert alert-warning">
              <h4>
                <i className="fas fa-info mr-2"></i>Aucune location pour ces
                critéres
              </h4>
            </div>
          ) : (
            <div className="d-grid">
              {locations.map((location) => (
                <LocationCard key={uuidv4()} location={location} />
              ))}
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  locations: state.location,
});
export default connect(mapStateToProps, {
  loadLocations,
})(Locations);
