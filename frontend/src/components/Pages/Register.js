import React from "react";
import { connect } from "react-redux";
import RegisterForm from "../template_parts/RegisterForm";

class Register extends React.Component {
  render() {
    return (
      <section className="formGenerique">
        {this.props.profil.connect ? (
          this.props.history.push("/")
        ) : this.props.profil.inscrit ? (
          <div> {this.props.profil.message} </div>
        ) : (
          <RegisterForm />
        )}
      </section>
    );
  }
}

const mapInpatchToPros = (state) => {
  return {
    profil: state.profil,
  };
};

export default connect(mapInpatchToPros)(Register);
