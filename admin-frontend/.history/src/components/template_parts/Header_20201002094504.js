import React, { Component } from "react";
import { connect } from "react-redux";
import logo from "./../../media/logo.png";
import { Link } from "react-router-dom";
import "./../../css/admin/navbar.css";
import { Navbar, Nav, Image } from "react-bootstrap";

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <nav
          id="menu_principal"
          className="navbar navbar-expand-lg navbar-light bg-light "
        >
          <div className="container">
            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="/inspirations" className="nav-link">
                    Profil
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/create-location" className="nav-link">
                    Deconnexion
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    profil: state.profil,
  };
};
export default connect(mapStateToProps)(Header);
