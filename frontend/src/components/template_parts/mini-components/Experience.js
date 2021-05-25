import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import etoilePositif from "./../../../media/notation/etoilePositif.png";
import etoileNegatif from "./../../../media/notation/etoileNegatif.png";

import { IMAGES_ROOT } from "../../urls";

class Experience extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    let imageView = IMAGES_ROOT + "/thematics/" + this.props.thematic.fileName;
    return (
      <React.Fragment>
        <div
          className="cont_image_destin_une"
          style={{
            background: `url(${imageView})no-repeat center center/cover`,
          }}
        ></div>
        <div className="conteneurSubCard blue-Marine width-100">
          <h2 className="text-center">{this.props.thematic.name}</h2>
        </div>
      </React.Fragment>
    );
  }
}
export default Experience;
