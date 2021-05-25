import React, { useEffect } from "react";
import BookingCard from "../template_parts/BookingCard";
import { loadUserBookings } from "../../actions/booking";
import Loader from "../template_parts/Loader";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const Bookings = (props) => {
  useEffect(() => {
    props.loadUserBookings();
  }, [props.loadUserBookings]);
  let bookings = props.bookings;
  if (props.isLoading) {
    return <Loader />;
  } else
    return (
      <div className="container p-4">
        <h3 className="text-info text-center py-2">
          Historique de mes réservations
        </h3>
        {bookings != undefined && bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookingCard key={uuidv4()} booking={booking} />
          ))
        ) : (
          <div className="alert alert-info text-danger">
            Aucune reservation éffectuée
          </div>
        )}
      </div>
    );
};

const mapStateToProps = (state) => ({
  bookings: state.booking.userBookings,
  isLoading: state.booking.loadingUserBookings,
});
export default connect(mapStateToProps, {
  loadUserBookings,
})(Bookings);
