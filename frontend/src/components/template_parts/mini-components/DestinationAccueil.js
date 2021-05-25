import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IMAGES_ROOT } from "../../urls";

class DestinationAccueil extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    let imageView =
      IMAGES_ROOT + "/destinations/" + this.props.destination.fileName;

    return (
      <React.Fragment>
        <div
          className="cont_image_destin_une"
          style={{
            background: `url(${imageView})no-repeat center center/cover`,
          }}
        ></div>
        <Link to={"/locations?" + this.props.destination.id}>
          <div className="conteneurSubCard blue-Marine width-100">
            <h2 className="text-center">{this.props.destination.address}</h2>
          </div>
        </Link>
      </React.Fragment>
    );
  }
}
export default DestinationAccueil;
