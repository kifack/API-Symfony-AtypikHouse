import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { IMAGES_ROOT } from "../urls";

class CategoryCard extends Component {
  render() {
    let category = this.props.category;
    let src = IMAGES_ROOT + "/categories/" + category.fileName;

    return (
      <Card>
        <Card.Img variant="top" src={src} style={{ height: "13rem" }} />
        <Card.Body>
          <Card.Title>{category.name}</Card.Title>

          <Card.Text>{category.description}</Card.Text>
          <Link
            to={"/locations?category=" + category.id}
            className=" btn btn-info btn-block"
          >
            <i className="fas fa-igloo mr-2"></i>
            Les logements
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

export default CategoryCard;
