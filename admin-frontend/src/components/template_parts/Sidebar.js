import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./../../css/sidebar.css";
import Header from "./Header.js";

export default class Sidebar extends Component {
  state = { destinations: true, categories: false, experiences: false };

  showDestinations = (e) => {
    e.preventDefault();
    this.setState({ destinations: !this.state.destinations });
  };

  showCategories = (e) => {
    e.preventDefault();
    this.setState({ categories: !this.state.categories });
  };

  showExperiences = (e) => {
    e.preventDefault();
    this.setState({ experiences: !this.state.experiences });
  };
  render() {
    return (
      <React.Fragment>
        {/* <Header /> */}
        <nav className="sidebar">
          <ul className="menu">
            <li>
              <Link to="/">
                <i className="fas fa-home mr-2"></i>
                <span className="item"> Accueil</span>
              </Link>
            </li>
            <li>
              <Link to="/users">
                <i className="fas fa-users mr-2"></i>
                <span className="item"> Gérer les utilisateurs</span>
              </Link>
            </li>

            <li>
              <Link to="/comments">
                <i className="fas fa-comments mr-2"></i>
                <span className="item"> Gérer les commentaires</span>
              </Link>
            </li>
            <li className="menu-item">
              <a href="#" onClick={this.showDestinations}>
                <i className="fas fa-map-marker-alt mr-2"></i>
                <span className="item">
                  Destination
                  <span
                    className={`fas fa-caret-down caret-menu first ${
                      this.state.destinations ? "rotate" : ""
                    }`}
                  ></span>
                </span>
              </a>

              <ul
                className="feat-show submenu"
                style={{ display: this.state.destinations ? "block" : "none" }}
              >
                <li>
                  <Link to="/destinations">Les destinations</Link>
                </li>
                <li>
                  <Link to="/destination">Ajouter une destination</Link>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a href="#" className="serv-btn" onClick={this.showCategories}>
                <i className="fas fa-igloo mr-2"></i>
                <span className="item">
                  Habitats
                  <span
                    className={`fas fa-caret-down second caret-menu ${
                      this.state.categories ? "rotate" : ""
                    }`}
                  ></span>
                </span>
              </a>

              <ul
                className="serv-show submenu"
                style={{ display: this.state.categories ? "block" : "none" }}
              >
                <li>
                  <Link to="/category-list">Les hébergements</Link>
                </li>
                <li>
                  <Link to="/category">Ajouter un hébergement</Link>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a href="#" className="serv-btn" onClick={this.showExperiences}>
                <i className="fab fa-affiliatetheme mr-2"></i>
                <span className="item">
                  Experiences
                  <span
                    className={`fas fa-caret-down second caret-menu ${
                      this.state.experiences ? "rotate" : ""
                    }`}
                  ></span>
                </span>
              </a>

              <ul
                className="submenu"
                style={{ display: this.state.experiences ? "block" : "none" }}
              >
                <li>
                  <Link to="/thematics">Les thématiques</Link>
                </li>
                <li>
                  <Link to="/experience">Ajouter une experience</Link>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <Link to="/categories">
                <i className="fas fa-cogs mr-2"></i>
                <span className="item">Gérer les paramétres</span>
              </Link>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}
