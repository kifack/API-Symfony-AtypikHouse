import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import {NavLink }from "react-router-dom";
import facebook from "./../../media/pictos/facebook-2.png";
import twitter from "./../../media/pictos/twitter.png";
import insta from "./../../media/pictos/insta.png";
import youtube from "./../../media/pictos/youtube.png";

class Footer extends React.Component{
    date = new Date();
    year = this.date.getFullYear();
    state = {
        currentYear : this.year
    }
    render(){
        return(
            <footer className="blue-sky">
                <Navbar className="container">
                    <Nav.Link>Qui sommes nous</Nav.Link>
                    <Nav.Link>Mentions légales</Nav.Link>
                    <Nav.Link>Confidentialité</Nav.Link>
                    <Nav.Link>Responsabilités</Nav.Link>
                    <Nav.Link>Rejoignez-nous</Nav.Link>
                    <NavLink to="/contact">Contactez-nous</NavLink> 
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
            </footer>
        );
    }
}
export default Footer;
