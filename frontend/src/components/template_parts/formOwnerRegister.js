import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import TitleBlock from "./mini-components/TitleBlock";
import { Form, Button } from "react-bootstrap";
import isEmpty from "lodash/isEmpty";
import validateInput from "../../tools/validationRegisterOwner";
import { registration } from "../../actions/owner";

class FormOwnerRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      denomination: "",
      numberSiret: "",
      street: "",
      otherInformationAddresse: "",
      city: "",
      zipCode: "",
      cuntry: "",
      formLegal: {},
      codeNaf: "",
      legalRepresent: "",
      errors: {},
    };
  }
  isValid() {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      let data = {
        denomination: this.state.denomination.value,
        numberSiret: this.state.numberSiret.value,
        street: this.state.street.value,
        otherInformationAddresse: this.state.otherInformationAddresse.value,
        city: this.state.city.value,
        zipCode: this.state.zipCode.value,
        cuntry: this.state.cuntry.value,
        formLegal: this.state.formLegal.value,
        codeNaf: this.state.codeNaf.value,
      };

      this.props.register(data);
    }
  }

  render() {
    return (
      <Container className="d-flex justify-content-center">
        <div className="d-flex flex-column align-items-center conteneurForm">
          <Row>
            <div className="titleConte">
              <TitleBlock title="Inscrivez votre Entreprise " />
            </div>
          </Row>
          <div className="separateur"></div>
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="text-danger">{this.state.errors.denomination}</div>
            <Form.Group>
              <Form.Label>Denomination</Form.Label>
              <Form.Control
                className={this.state.errors.alertDenomination}
                ref={(input) => (this.state.denomination = input)}
                type="text"
                placeholder="* Le nom de votre entreprise"
              />
            </Form.Group>
            <div className="text-danger">{this.state.errors.numberSiret}</div>
            <Form.Group>
              <Form.Label>Numero de siret</Form.Label>
              <Form.Control
                className={this.state.errors.alertNumberSiret}
                ref={(input) => (this.state.numberSiret = input)}
                type="text"
                placeholder="XXXXX"
              />
            </Form.Group>
            <div className="text-danger">{this.state.errors.street}</div>
            <Form.Group>
              <Form.Label>Addresse</Form.Label>
              <Form.Control
                className={this.state.errors.alertStreet}
                ref={(input) => (this.state.street = input)}
                placeholder="Boulevard ou Rue"
                type="text"
              />
            </Form.Group>
            <div className="text-danger">
              {this.state.errors.otherInformationAddresse}
            </div>
            <Form.Group>
              <Form.Label>Complement d'addresse</Form.Label>
              <Form.Control
                className={this.state.errors.alertOtherInformationAddresse}
                ref={(input) => (this.state.otherInformationAddresse = input)}
                type="text"
                placeholder="information complementaire"
              />
            </Form.Group>
            <div className="text-danger">{this.state.errors.city}</div>
            <Form.Group>
              <Form.Label>Ville</Form.Label>
              <Form.Control
                className={this.state.errors.alertCity}
                ref={(input) => (this.state.city = input)}
                type="text"
                placeholder="exemple Paris"
              />
            </Form.Group>
            <div className="text-danger">{this.state.errors.zipCode}</div>
            <Form.Group>
              <Form.Label>Code Postal</Form.Label>
              <Form.Control
                className={this.state.errors.alertZipCode}
                ref={(input) => (this.state.zipCode = input)}
                type="text"
                placeholder="exemple 750014"
              />
            </Form.Group>
            <div className="text-danger">{this.state.errors.cuntry}</div>
            <Form.Group>
              <Form.Label>Pays</Form.Label>
              <Form.Control
                className={this.state.errors.alertCuntry}
                ref={(input) => (this.state.cuntry = input)}
                type="text"
                placeholder="exemple France"
              />
            </Form.Group>
            <div className="text-danger">{this.state.errors.formLegal}</div>
            <Form.Group>
              <Form.Label>Forme Jurique</Form.Label>
              <Form.Control
                className={this.state.errors.alertFormLegal}
                type="text"
                ref={(input) => (this.state.formLegal = input)}
                placeholder="exemple SARL"
              />
            </Form.Group>
            <div className="text-danger">{this.state.errors.codeNaf}</div>
            <Form.Group>
              <Form.Label>Code NAF</Form.Label>
              <Form.Control
                className={this.state.errors.alertCodeNaf}
                type="text"
                ref={(input) => (this.state.codeNaf = input)}
                placeholder="XXXXX"
              />
            </Form.Group>

            <Form.Group className="d-flex justify-content-center w-100">
              <Button
                className="blue-Marine secondaryNb larger"
                type="submit"
                disabled={this.isLoading}
              >
                Accepter et s'inscrire
              </Button>
            </Form.Group>
          </Form>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (data) => {
      dispatch(registration(data));
    },
  };
};
const MapStateToProps = (state) => {
  return {
    errorRegistration: state.owner,
  };
};
export default connect(MapStateToProps, mapDispatchToProps)(FormOwnerRegister);
