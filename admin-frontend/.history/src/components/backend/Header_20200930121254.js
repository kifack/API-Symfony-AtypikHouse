import { render } from "node-sass";
import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { BsBell, BsEnvelope } from "react-icons/bs";

class Header extends React.Component{
    render(){
        return(

            <header className="blue-sky">
                <Navbar className="container">
                    <Nav.Link>Qui sommes nous</Nav.Link>
                    <Nav.Link>Mentions légales</Nav.Link>
                    <div>
                        <Image src={facebook}/>
                        <Image src={twitter}/>
                        <Image src={insta}/>
                        <Image src={youtube}/>
                    </div>
                </Navbar>
                <div className="content text-center">
                    {this.state.currentYear} &#169; AtypikHouse
                </div>

                <MDBCol md="6">
                <form className="form-inline mt-4 mb-4">
                    <MDBIcon icon="search" />
                    <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
                </form>
                </MDBCol>

            </header>



        )
    }

}

export default Header;