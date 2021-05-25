import React, { useEffect, useState } from "react";
import LocationDetails from "../template_parts/LocationDetails";
import Activity from "../template_parts/Activity";
import { loadLocation } from "../../actions/location";
import { loadActivities } from "../../actions/activity";
import { loadComments } from "../../actions/comment";
import { connect } from "react-redux";
import Loader from "../template_parts/Loader";
import CommentCard from "../template_parts/CommentCard";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Rating from "../template_parts/Rating";
import { Modal, Form, Button, Container, Table } from "react-bootstrap";

const Location = (props) => {
  let locationId = props.match.params.id;

  useEffect(() => {
    if (locationId) {
      props.loadLocation(locationId);
      props.loadComments(locationId);
      props.loadActivities(locationId);
    }
  }, [loadLocation]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  if (!locationId) return <Redirect to="/locations" />;

  let location = props.location.location;
  let comments = props.comment.locationComments;
  let activities = props.activity.activities;
  let isLoading =
    props.location.isLoadingLocation ||
    props.location.location == null ||
    props.activity.loading ||
    props.comment.loadingLocationComments;

  let rating = 0;
  if (location && location.reviews.length > 0) {
    rating = location.reviews.reduce(
      (accumulator, currentValue) => accumulator + currentValue.rating,
      0
    );
    rating = rating / location.reviews.length;
  }

  const onClickReviews = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  if (isLoading) {
    return <Loader />;
  } else
    return (
      <div style={{ width: "87%", margin: "auto" }}>
        <h2 className="text-info text-center">{location.name}</h2>
        <div className="d-flex flex-row">
          <div className="d-flex flex-row">
            <Rating value={rating} />
            {location.reviews.length > 0 && (
              <a href className="ml-4 text-info " onClick={onClickReviews}>
                Voir les avis
              </a>
            )}
          </div>
          <div
            className="ml-4 text-info"
            style={{ fontSize: 16, fontWeight: "bold" }}
          >
            {location.street +
              " " +
              location.city +
              ", " +
              location.postal_code}
          </div>
          <div
            style={{ fontSize: 20, fontWeight: "bold" }}
            className="ml-4 text-info"
          >
            {location.price}
            <i className="mx-2 fas fa-euro-sign "></i>/Nuit
          </div>
        </div>
        <LocationDetails details={location} />

        {activities.length > 0 ? (
          <Activity activity={activities[0]} />
        ) : (
          <h4>Aucune activité renseignée</h4>
        )}
        <div className="row m-4">
          <Link to="/order" className="btn btn-info px-2  py-2">
            Faire ma réservation
          </Link>
        </div>
        <hr
          className="text-info"
          style={{ backgroundColor: "#17a2b8", height: 1 }}
        />
        <div>
          <h4 className="text-info">({comments.length}) commentaires</h4>
          <div className="row">
            {comments.map((comment) => (
              <CommentCard key={uuidv4()} comment={comment} />
            ))}
          </div>
          <a href="#" className="text-info my-3">
            Voir plus de commentaires
          </a>
        </div>

        {show && (
          <>
            <ReviewDetails
              handleClose={handleClose}
              reviews={location.reviews}
            />
          </>
        )}
      </div>
    );
};

const ReviewDetails = (props) => {
  const { handleClose, reviews } = props;

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Notes des clients </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Valeur</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={uuidv4()}>
                  <td>{review.comment}</td>
                  <td>
                    <Rating value={review.rating} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <i className="fas fa-times mr-2"></i>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  location: state.location,
  comment: state.comment,
  activity: state.activity,
});
export default connect(mapStateToProps, {
  loadLocation,
  loadComments,
  loadActivities,
})(Location);
