import React, { useState } from "react";
import "../../css/card.css";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../actions/comment";
import { IMAGES_ROOT } from "../urls";

const LocationDetails = ({ details }) => {
  const [images, setImages] = useState(details.images);

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const profil = useSelector((state) => state.profil);

  const handleClose = () => setShow(false);

  let styles = { width: 100 / images.length + "%" };
  const [current, setCurrent] = useState(
    Math.floor(Math.random() * images.length)
  );
  let root = IMAGES_ROOT + "/locations/";

  const nextSlide = (index) => {
    index = current + index;
    if (index < 0) index = images.length - 1;
    else if (index >= images.length) index = 0;

    setCurrent(index);
  };

  const createComment = (content) => {
    setShow(!show);
    let data = {
      author: "/api/v01/users/" + profil.profil.id,
      locations: "/api/v01/All/locations/" + details.id,
      content,
    };
    console.log(data);

    dispatch(addComment(data));
  };

  return (
    <React.Fragment>
      <div className="row mt-3">
        <div className="col-md-6">
          <div className="image-container">
            <div>
              <div className="numbertext text-info">{`${current + 1}/${
                images.length
              }`}</div>
              <img
                src={root + images[current].fileName}
                style={{ width: "100%", height: "13rem", fontWeight: "bold" }}
              />
            </div>

            {/* Next and previous buttons */}
            <a className="location-prev" onClick={(e) => nextSlide(-1)}>
              ❮
            </a>
            <a className="location-next" onClick={(e) => nextSlide(1)}>
              ❯
            </a>
            {/* Image text */}
            {/* <div className="caption-container">
            <p id="caption">Current</p>
          </div> */}
            {/* Thumbnail images */}
            <div className="custom-row">
              {images.map((image, index) => (
                <div key={uuidv4()} className="column" style={styles}>
                  <img
                    className="demo cursor"
                    className={`demo cursor ${
                      index == current ? "location-active" : ""
                    }`}
                    src={root + images[index].fileName}
                    style={{ width: "100%", height: "100px" }}
                    onClick={(e) => setCurrent(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-6 ">
          <h3 className="text-info">Description</h3>
          <p className="indented">{details.description}</p>
          <table className="table table-striped mt-4">
            <tbody>
              <tr>
                <td>Posté le </td>
                <td>
                  {" "}
                  <span className="text-info">
                    {new Date(details.createdAt).toLocaleDateString()}
                  </span>
                </td>
              </tr>
              <tr>
                <td>Surface</td>
                <td>{details.surface} m²</td>
              </tr>
              <tr>
                <td>Nombre de pieces</td>
                <td>{details.rooms} </td>
              </tr>
              <tr>
                <td>Capacité d'accueil</td>
                <td>{details.travelers} voyageurs</td>
              </tr>
              {details.fieldValues.map((item) => (
                <tr key={uuidv4()}>
                  <td>{item.field.name} </td>
                  <td>{item.fieldValue}</td>
                </tr>
              ))}
              <tr>
                <td>Auteur</td>
                <td>
                  Posté par{" "}
                  <Link to="/" className="text-info">
                    {details.user.name + " " + details.user.lastName}
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
          {profil.connect && (
            <div className="d-flex justify-content-end">
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
            locationName={details.name}
            createComment={createComment}
          />
        </>
      )}
    </React.Fragment>
  );
};

const CommentInput = (props) => {
  const { handleClose, locationName, createComment } = props;

  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const saveComment = (e) => {
    if (comment != "") {
      createComment(comment);
    }
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Que pensez vous de {locationName} ? </Modal.Title>
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

export default LocationDetails;
