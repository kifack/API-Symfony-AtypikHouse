import React from "react";
import { connect } from "react-redux";
import LoginForm from "../template_parts/LoginForm";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  render() {
    //Pour les redirections automatiques
    let query = this.props.location.search.substring(1);

    if (query && this.props.profil.connect) {
      let url = query.split("=")[1];
      return <Redirect to={url} />;
    }

    return (
      <section className="formGenerique">
        {this.props.profil.load && this.props.profil.connect ? (
          <Redirect to="/" />
        ) : (
          <LoginForm />
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

export default connect(mapInpatchToPros)(Login);
