import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import Sidebar from "./../template_parts/Sidebar";
import LocationEntry from "./../partials/LocationEntry";
import { v4 as uuidv4 } from "uuid";
import Spinner from "./../template_parts/Spinner";

import {
  loadLocations,
  validateLocation,
  deactivateLocation,
} from "../../actions/location";

const AdminHome = ({
  loadLocations,
  validateLocation,
  deactivateLocation,
  location: { locations, loading },
}) => {
  useEffect(() => {
    if (locations.length == 0) loadLocations();
  }, [loadLocations]);

  const handleValidation = (id) => {
    //alert(id);
  };

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h2 className="text-center">Gérer les annonces</h2>
          <table className="table  table-striped">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Type d'hébergement</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <LocationEntry
                  key={uuidv4()}
                  entry={location}
                  validateLocation={() => validateLocation(location.id)}
                  deactivateLocation={() => deactivateLocation(location.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  location: state.location,
});
export default connect(mapStateToProps, {
  loadLocations,
  validateLocation,
  deactivateLocation,
})(AdminHome);
