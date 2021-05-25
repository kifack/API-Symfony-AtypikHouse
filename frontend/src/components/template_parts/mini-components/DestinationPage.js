import React from "react";
import { Image } from "react-bootstrap";
import InfoEntity from "./InfoEntity";
import { Link } from "react-router-dom";
import TitleLogement from "./TitleLogement";
import { IMAGES_ROOT } from "../../urls";

class Destinationpage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let imageView =
      IMAGES_ROOT + "/destinations/" + this.props.destination.fileName;

    if (this.props.onFront) {
      return (
        <div className="gridContent frontGrid">
          <Link to={"/locations?destination=" + this.props.destination.id}>
            <h2>{this.props.destination.address}</h2>
          </Link>
          <Image src={imageView} />
        </div>
      );
    } else {
      return (
        <div className="gridContent">
          <div className="conteneurImage">
            <Image src={imageView} />
          </div>
          <Link to={"/locations?destination=" + this.props.destination.id}>
            <TitleLogement title={this.props.destination.address} />
          </Link>
        </div>
      );
    }
  }
}
export default Destinationpage;
