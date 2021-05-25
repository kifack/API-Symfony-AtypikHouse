import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { loadLocations } from "../../actions/location";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Loader from "../template_parts/Loader";

const Properties = (props) => {
  useEffect(() => {
    let query = "user=" + props.profil.profil.id;
    props.loadLocations(query);
  }, [loadLocations]);

  let locations = props.locations.locations;
  let loading = props.locations.loading;

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mt-3">
          <h3 className="text-center text-info">Mes Biens</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <td>Nom</td>
                <td>Status</td>
                <td>Reservations</td>
                <td>Activités</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {locations.length > 0 ? (
                locations.map((location) => (
                  <tr key={uuidv4()}>
                    <td>{location.name}</td>
                    <td>
                      {location.status == 0 ? (
                        <span className="text-white badge badge-warning p-2">
                          <i className="fas fa-sync fa-spin mr-2"></i>
                          En attente de validation
                        </span>
                      ) : location.status == 1 ? (
                        <span className="badge badge-success p-2">Validé</span>
                      ) : (
                        <span className="badge badge-danger p-2">Bloqué</span>
                      )}
                    </td>

                    <td>
                      {location.bookings.length > 0 ? (
                        <Link to={`/user/${location.id}/orders`}>
                          {location.bookings.length + " Reservations"}
                        </Link>
                      ) : (
                        <span className="text-danger">Pas de réservations</span>
                      )}
                    </td>
                    <td>
                      {location.activities.length > 0 ? (
                        <span className="text-info">
                          {location.activities.length} activités
                        </span>
                      ) : (
                        <span className="text-danger">Aucune activité</span>
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/user/${location.id}/create-activity`}
                        className="btn btn-info"
                      >
                        Ajouter une activité
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colspan="5" className="text-center">
                    Vous n'avez pas encore publié d'annonce
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  locations: state.location,
  profil: state.profil,
});
export default connect(mapStateToProps, {
  loadLocations,
})(Properties);
