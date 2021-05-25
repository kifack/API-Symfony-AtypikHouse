import React from "react";
import FormOwnerRegister from "../template_parts/formOwnerRegister";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Circular } from "styled-loaders-react";

class BecomeOwner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: (
        <div className="conteneurLoader">
          <Circular color="#1b6e86 " size="150px" />{" "}
        </div>
      ),
    };
  }
  componentDidMount() {
    setTimeout(() => {
      if (
        this.props.profil.connect &&
        this.props.profil.profil.roles.indexOf("ROLE_OWNER") == -1
      ) {
        this.setState(() => {
          return {
            action: (
              <FormOwnerRegister
                history={this.props.history}
                location={this.props.location}
              />
            ),
          };
        });
      } else {
        this.setState(() => {
          return {
            action: <Redirect to="/login" />,
          };
        });
      }
    }, 3000);
  }

  render() {
    let query = this.props.location.search.substring(1);
    if (query && this.props.profil.profil.roles.indexOf("ROLE_OWNER") != -1) {
      let url = query.split("=")[1];
      return <Redirect to={url} />;
    }
    return <section className="formGenerique">{this.state.action}</section>;
  }
}
const getProfil = (state) => {
  return {
    profil: state.profil,
  };
};
export default connect(getProfil)(BecomeOwner);
