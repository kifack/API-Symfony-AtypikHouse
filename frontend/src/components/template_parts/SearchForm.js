import React from "react";
import { Form, Button } from "react-bootstrap";

import { v4 as uuidv4 } from "uuid";

class SearchForm extends React.Component {
  constructor(props) {
    super();

    this.state = {
      destination: "",
      category: "",
      thematic: "",
      startDate: "",
      endDate: "",
      travellers: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let query = [];

    if (this.state.destination) {
      query.push(`destination=${this.state.destination}`);
    }

    if (this.state.category) {
      query.push(`category=${this.state.category}`);
    }

    if (this.state.thematic) {
      query.push(`thematics=${this.state.thematic}`);
    }

    if (this.state.travellers) {
      query.push(`travelers[gte]=${this.state.travellers}`);
    }

    if (this.state.startDate && this.state.endDate) {
      query.push(
        `bookings.dateDebut[strictly_before]=${this.state.startDate}&bookings.dateFin[strictly_after]=${this.state.endDate}`
      );
    } else if (this.state.startDate) {
      query.push(`bookings.dateDebut[strictly_before]=${this.state.startDate}`);
    } else if (this.state.endDate) {
      query.push(`bookings.dateFin[strictly_after]=${this.state.endDate}`);
    }

    this.props.history.push("/locations?" + query.join("&"));
    // console.log(query.join("&"));
  };
  render() {
    return (
      <Form
        className="d-flex justify-content-between  flex-wrap row py-2"
        onSubmit={this.onSubmit}
      >
        <Form.Group className="col-4">
          <Form.Control
            as="select"
            className={"form-control-lg"}
            placeholder="Types d'hébergement"
            name="destination"
            onChange={this.handleChange}
            value={this.state.destination}
          >
            <option value="">Destination</option>
            {this.props.destinations &&
              this.props.destinations.map((item) => (
                <option key={uuidv4()} value={item.id}>
                  {item.address}
                </option>
              ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="col-4">
          <Form.Control
            as="select"
            className={"form-control-lg"}
            placeholder="Types d'hébergement"
            name="category"
            onChange={this.handleChange}
            value={this.state.category}
          >
            <option value="">Type d'hébergement</option>'
            {this.props.categories.map((item) => (
              <option key={uuidv4()} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="col-4">
          <Form.Control
            as="select"
            className={"form-control-lg"}
            placeholder="Thématiques"
            name="thematic"
            onChange={this.handleChange}
            value={this.state.thematic}
          >
            <option value="">Thématiques</option>
            {this.props.thematics.map((item) => (
              <option key={uuidv4()} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="col-4">
          <Form.Control
            type="date"
            className={"form-control-lg"}
            placeholder="Date d'arrivée"
            name="startDate"
            onChange={this.handleChange}
            value={this.state.startDate}
          />
        </Form.Group>

        <Form.Group className="col-4">
          <Form.Control
            type="date"
            className={"form-control-lg"}
            placeholder="Date de départ"
            name="endDate"
            onChange={this.handleChange}
            value={this.state.endDate}
          />
        </Form.Group>

        <Form.Group className="col-4">
          <Form.Control
            type="number"
            placeholder="Nombre de voyageurs"
            className={"form-control-lg"}
            name="travellers"
            onChange={this.handleChange}
            value={this.state.travellers}
          />
        </Form.Group>

        <Form.Group className="d-flex justify-content-center w-100">
          <Button className="blue-Marine secondaryNb" type="submit">
            Rechercher
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default SearchForm;
