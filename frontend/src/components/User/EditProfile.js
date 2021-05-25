import React, { Component } from "react";
import ProfileCard from "./../template_parts/ProfileCard";
import { connect } from "react-redux";
import { updateUser } from "./../../actions/user";

class EditProfile extends Component {
  state = {
    name: this.props.profil.name,
    lastName: this.props.profil.lastName,
    email: this.props.profil.email,
    phone: this.props.profil.phone,
    rue: this.props.profil.rue,
    city: this.props.profil.city,
    zipCode: this.props.profil.zipCode,
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    //  this.props.updateUser()
  };
  render() {
    return (
      <React.Fragment>
        <div className="container mb-4">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <form onSubmit={this.handleSubmit}>
                <div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="first_name">Prénom:</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="lastName"
                          onChange={this.handleChange}
                          value={this.state.lastName}
                          placeholder="first name"
                          title="enter your first name if any."
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="last_name">Nom:</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleChange}
                          placeholder="last name"
                          title="enter your last name if any."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="first_name">Email:</label>
                        <input
                          type="mail"
                          className="form-control form-control-lg"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                          placeholder="test@gmail.com"
                          title="enter your first name if any."
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="last_name">Télephone:</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="phone"
                          value={this.state.phone}
                          onChange={this.handleChange}
                          placeholder="last name"
                          title="enter your last name if any."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="first_name">Rue:</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="rue"
                          value={this.state.rue}
                          onChange={this.handleChange}
                          placeholder="first name"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="last_name">Ville:</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="city"
                          value={this.state.city}
                          onChange={this.handleChange}
                          id="last_name"
                          placeholder="last name"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="last_name">Code postal:</label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="zipCode"
                          value={this.state.zipCode}
                          onChange={this.handleChange}
                          id="last_name"
                          placeholder="last name"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Mot de passe  */}
                  <div className="form-group">
                    <label htmlFor="last_name">Mot de passe:</label>
                    <input
                      type="password"
                      name="password"
                      onChange={this.handleChange}
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-info p-2">
                      Enregistrer
                    </button>
                    <button className="btn btn-light p-2 ml-2">Annuler</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  profil: state.profil.profil,
});
export default connect(mapStateToProps, { updateUser })(EditProfile);
