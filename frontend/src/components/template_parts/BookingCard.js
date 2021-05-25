import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../../actions/comment";
import { IMAGES_ROOT } from "../urls";

const BookingCard = (props) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const profil = useSelector((state) => state.profil);
  const userId = profil.profil.id;

  let { booking } = props;
  let root = IMAGES_ROOT + "/locations/";
  let owner = booking.location.user || {};

  const setRating = (e) => {
    setShow(!show);
  };

  const createReview = (rating, comment) => {
    setShow(!show);
    let data = {
      user: "/api/v01/users/" + userId,
      location: "/api/v01/All/locations/" + booking.location.id,
      comment,
      rating: parseInt(rating),
    };
    console.log(data);

    dispatch(addReview(data));
  };

  let statusText = "",
    status = booking.status;

  if (status === 0) {
    statusText = (
      <div className="text-primary h4">
        <i className="mr-2 fas fa-spinner fa-spin text-primary" />
        En attente
      </div>
    );
  } else if (status === 1) {
    statusText = (
      <div
        className="text-success"
        style={{ fontSize: 20, fontWeight: "bold" }}
      >
        <i className="mr-2 fas fa-check-circle" /> Validé
      </div>
    );
  } else if (status === 2) {
    statusText = (
      <div className="text-danger h4">
        <i className="mr-2 fas fa-times" />
        Annulé
      </div>
    );
  } else {
    statusText = (
      <div className="text-info h4">
        <i className="mr-2 fas fa-stopwatch" />
        Terminé
      </div>
    );
  }

  return (
    <div>
      <div className="card my-2" style={{ width: "100%" }}>
        <div className="row no-gutters">
          <div className="col-sm-3">
            <img
              src={root + booking.location.images[0].fileName}
              className="card-img-top"
              alt="..."
              style={{ height: 200, borderRadius: 5 }}
            />
          </div>
          <div className="col-sm-9">
            <div className="card-body">
              <div className="booking-status">{statusText}</div>
              <h5 className="card-title">{booking.location.name}</h5>
              <div>
                <div className="font-weight-bold">
                  Periode:
                  <span className="text-muted">
                    {new Date(booking.dateDebut).toLocaleDateString()} -{" "}
                    {new Date(booking.dateFin).toLocaleDateString()}
                  </span>
                </div>
                <div className="font-weight-bold">
                  Paiement:{" "}
                  <span className="text-muted">
                    {booking.payment ? (
                      <>
                        {booking.payment.montant}{" "}
                        <i className="fas fa-euro-sign ml-2"></i>
                      </>
                    ) : (
                      "Non payé"
                    )}
                  </span>
                </div>
                <div className="font-weight-bold">
                  Auteur:
                  <span className="text-muted">
                    <Link
                      className="text-info"
                      to={`/user/profile/${owner.id}`}
                    >
                      {owner.name + " " + owner.lastName}
                    </Link>
                  </span>
                </div>
              </div>
              <div className="pt-3">
                <button className="btn btn-outline-danger mr-3">
                  <i className="fas fa-times mr-2" />
                  Annuler
                </button>
                <button className="btn btn-light" onClick={setRating}>
                  <i className="fas fa-star-half-alt text-warning mr-2" />
                  Votre avis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {show && (
        <>
          <RatingInput
            handleClose={handleClose}
            locationName={booking.location.name}
            createReview={createReview}
          />
        </>
      )}
    </div>
  );
};

const RatingInput = (props) => {
  const { handleClose, locationName, createReview } = props;

  const [fields, setFields] = useState({
    rating: 1,
    comment: "",
  });

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const saveReview = (e) => {
    if (fields.rating != "" && fields.comment != "") {
      createReview(fields.rating, fields.comment);
    }
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Que pensez vous {locationName} ? </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Notes: </Form.Label>
          <Form.Control
            onChange={handleChange}
            value={fields.rating}
            name="rating"
            as="select"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Commentaire</Form.Label>
          <Form.Control
            name="comment"
            onChange={handleChange}
            value={fields.comment}
            as="textarea"
            rows={3}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <i className="fas fa-times mr-2"></i>
          Close
        </Button>
        <Button variant="info" onClick={saveReview}>
          Enregistrer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default BookingCard;
