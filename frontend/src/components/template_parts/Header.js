import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "./../../media/logo.png";
import avatar from "./../../media/avatar.png";
import "./../../css/admin/navbar.css";
import { Navbar, Nav, Image } from "react-bootstrap";
import { logout } from "./../../actions";

class Header extends Component {
  count = 0;
  constructor(props) {
    super(props);

    if (localStorage.getItem("whishlist")) {
      let locations = localStorage.getItem("whishlist");
      locations = JSON.parse(locations) || [];
      this.count = locations.length;
    }
  }

  logout = (e) => {
    this.props.logout();
  };

  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-blue navbar-expand-sm  blue-sky">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
              aria-controls="mobile-nav"
              aria-expanded="false"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="dashboard.html" className="nav-link">
                  <i className="far fa-envelope"></i>
                  Newsletter
                </a>
              </li>
              <li className="nav-item">
                <Link to="/whishlist" className="nav-link">
                  <i className="far fa-heart"></i>
                  Post Feed
                  {this.count > 0 && (
                    <span className="badge badge-info">{this.count}</span>
                  )}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/locations" className="nav-link">
                  Nouveautés
                </Link>
              </li>

              {this.props.profil.connect ? (
                <li className="nav-item">
                  <div className="avatar_cont">
                    <Image className="avatar" src={avatar} />
                  </div>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Connexion
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Inscription
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        <nav id="menu_principal" className="navbar navbar-expand-lg">
          <div className="container">
            <Link className="navbar-brand block" to="/">
              <div className="d-flex  conteneurLogo">
                <Image className="logo" src={logo} />
                <h1 className="titlesite ">AtypikHouse</h1>
              </div>
            </Link>
            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/destinations" className="nav-link">
                    Destinations
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/categories" className="nav-link">
                    Hébergements
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/inspirations" className="nav-link">
                    Inspirations
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/create-location" className="nav-link">
                    Publier des annoces
                  </Link>
                </li>

                {this.props.profil.connect && (
                  <li className="nav-item dropdown">
                    <button
                      className="btn  btn-outline-info  dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {this.props.profil.profil.name +
                        " " +
                        this.props.profil.profil.lastName}
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <Link className="dropdown-item py-2" to="/user/bookings">
                        <i className="fas fa-shopping-cart text-info  mr-2"></i>{" "}
                        Mes réservation
                      </Link>
                      <Link
                        className="dropdown-item  py-2"
                        to="/user/edit-profile"
                      >
                        <i className="fas fa-user text-info mr-2"></i> Profile
                      </Link>
                      {this.props.profil.profil.roles.indexOf("ROLE_OWNER") !=
                        -1 && (
                        <Link
                          className="dropdown-item  py-2"
                          to="/user/properties"
                        >
                          <i className="fas fa-user text-info mr-2"></i> Mes
                          biens
                        </Link>
                      )}
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item  py-2" onClick={this.logout}>
                        <i className="fas fa-sign-out-alt text-info mr-2"></i>{" "}
                        Déconnexion
                      </a>
                    </div>
                  </li>
                )}
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
export default connect(mapStateToProps, { logout })(Header);
