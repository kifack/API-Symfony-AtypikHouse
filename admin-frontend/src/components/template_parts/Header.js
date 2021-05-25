import React from "react";
import { Navbar, Nav, Image, Row, Container, Col } from "react-bootstrap";
import { BsBell, BsEnvelope, BsFillPersonFill, BsList } from "react-icons/bs";
import { FaSistrix } from "react-icons/fa";
import { connect } from "react-redux";
import logo from "./../../media/logonegatif.svg";
import { logout } from "../../actions/auth";
import { toggleSidebar } from "../../actions/user";

class Header extends React.Component {
  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  toggleSidebar = (e) => {
    this.props.toggleSidebar();
  };
  render() {
    return (
      <header className="w-100">
        <Navbar bg="light" className="bg-white" variant="light">
          <div className="sidebar-btn ml-2" onClick={this.toggleSidebar}>
            <i className="fas fa-bars"></i>
          </div>
          <Container>
            <Navbar.Brand href="#home" className="titlesite">
              Atypikhouse
            </Navbar.Brand>

            <Nav className="ml-auto">
              <Nav.Link>
                <i className="fas fa-user text-blue mr-2"></i>
                {this.props.user.name + " " + this.props.user.lastName}
              </Nav.Link>
              <Nav.Link onClick={this.logout}>
                <i className="fas fa-sign-out-alt text-blue mr-2"></i>
                Deconnexion
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  logout,
  toggleSidebar,
})(Header);
