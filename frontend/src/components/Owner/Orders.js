import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { loadOwnerBookings, updateBookingStatus } from "../../actions/booking";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Loader from "../template_parts/Loader";
import { Redirect } from "react-router-dom";
import moment from "moment";

const Orders = (props) => {
  let loadOwnerBookings = props.loadOwnerBookings;

  let locationId = props.match.params.locationId;
  useEffect(() => {
    if (locationId) loadOwnerBookings(locationId);
  }, [loadOwnerBookings]);

  if (!locationId) return <Redirect to="/user/properties" />;

  let bookings = props.booking.ownerBookings;
  let loading = props.booking.isLoadingBookings;

  const updateStatus = (bookingId, status) => {
    let data = { status: status };

    props.updateBookingStatus(bookingId, data);
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mt-3">
          <h3 className="text-center text-info">
            Les réservations pour ce logement
          </h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <td>Utilisateur</td>
                <td>Email</td>
                <td>Réservé le </td>
                <td>Date de debut</td>
                <td>Date de fin</td>
                <td>Nombre de personne</td>
                <td>Paiement</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {bookings &&
                bookings.map((booking) => (
                  <tr key={uuidv4()}>
                    <td>
                      {booking.customer.name + " " + booking.customer.lastName}
                    </td>
                    <td>{booking.customer.email}</td>
                    <td>
                      {new Date(booking.dateCreated).toLocaleDateString()}
                    </td>
                    <td>{new Date(booking.dateDebut).toLocaleDateString()}</td>
                    <td>{new Date(booking.dateFin).toLocaleDateString()}</td>
                    <td>{booking.numberPerson}</td>
                    <td>
                      {booking.payment ? (
                        <span className="text-success font-weight-bold">
                          {booking.payment.montant}
                          <i className="fas fa-euro-sign ml-2"></i>
                        </span>
                      ) : (
                        <span className="text-danger">Non payé</span>
                      )}
                    </td>
                    <td>
                      {booking.status === 0 ? (
                        <button
                          onClick={(e) => updateStatus(booking.id, 1)}
                          className="btn btn-success"
                        >
                          Valider
                        </button>
                      ) : (
                        <button
                          onClick={(e) => updateStatus(booking.id, 3)}
                          className="btn btn-warning"
                        >
                          Terminer
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  booking: state.booking,
});
export default connect(mapStateToProps, {
  loadOwnerBookings,
  updateBookingStatus,
})(Orders);
