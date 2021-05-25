import React, { useState, useEffect } from "react";
import "../../css/card.css";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../actions/comment";
import { IMAGES_ROOT } from "../urls";

const Activity = (props) => {
  let activity = props.activity;
  let root = IMAGES_ROOT + "/activities/";

  const [images, setImages] = useState(activity.images);
  const [current, setCurrent] = useState(
    Math.floor(Math.random() * images.length)
  );

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const profil = useSelector((state) => state.profil);

  const handleClose = () => setShow(false);

  const createComment = (content) => {
    setShow(!show);
    let data = {
      author: "/api/v01/users/" + profil.profil.id,
      activities: "/api/v01/activities/" + activity.id,
      content,
    };
    console.log(data);

    dispatch(addComment(data));
  };

  const nextSlide = (index) => {
    index = current + index;
    if (index < 0) index = images.length - 1;
    else if (index >= images.length) index = 0;

    setCurrent(index);
  };
  return (
    <React.Fragment>
      <h2 className="text-info text-center py-3">Activités à proximité</h2>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="slideshow-container">
            <div className="slide custom-fade">
              <div className="activity-numbertext">{`${current + 1}/${
                images.length
              }`}</div>
              <img
                src={root + images[current].fileName}
                style={{ width: "100%", height: "16rem" }}
              />
            </div>

            <a className="activity-prev" onClick={(e) => nextSlide(-1)}>
              ❮
            </a>
            <a className="activity-next" onClick={(e) => nextSlide(1)}>
              ❯
            </a>
            <div style={{ textAlign: "center" }} className="dots">
              {images.map((image, index) => (
                <span
                  key={uuidv4()}
                  className={`dot ${current == index ? "activity-active" : ""}`}
                  onClick={(e) => setCurrent(index)}
                />
              ))}
            </div>
          </div>
          <br />
          <a href="#" className="text-info">
            Voir plus d'activités
          </a>
        </div>
        <div className="col-md-6 ">
          <div className="mt-1">
            <h3 className="text-info">Description</h3>
            <p className="indented">{activity.description}</p>

            <ul className="list-group">
              <li className="list-group-item">
                Publié le :{" "}
                <span className="font-weight-bold text-info">
                  {activity.createdAt}
                </span>
              </li>
              <li className="list-group-item">
                Distance du logement:{" "}
                <span className="font-weight-bold text-info">
                  {activity.distance} Km
                </span>
              </li>
              <li className="list-group-item">
                Prix:{" "}
                <span className="font-weight-bold text-info">
                  {activity.price} <i className="fas fa-euro-sign ml-3"></i>
                </span>
              </li>
            </ul>
          </div>

          {profil.connect && (
            <div className="mt-3 d-flex justify-content-end">
              <div>
                <button
                  className="btn btn-outline-info"
                  onClick={(e) => setShow(!show)}
                >
                  <i className="fas fa-comments text-info mr-3"></i>
                  Laisser un commentaire
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {show && profil.connect && (
        <>
          <CommentInput
            handleClose={handleClose}
            createComment={createComment}
          />
        </>
      )}
    </React.Fragment>
  );
};

const CommentInput = (props) => {
  const { handleClose, createComment } = props;

  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const saveComment = (e) => {
    if (comment != "") {
      createComment(comment);
      setOpen(false);
    }
  };

  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Mon commentaire </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Commentaire</Form.Label>
          <Form.Control
            name="comment"
            onChange={handleChange}
            value={comment}
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
        <Button variant="info" onClick={saveComment}>
          Enregistrer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default Activity;
