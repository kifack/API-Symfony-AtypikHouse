import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import { BsBell, BsEnvelope } from "react-icons/bs";
import facebook from "./../../media/pictos/facebook-2.png";


class Header extends React.Component{
    render(){
        return(

            <header className="blue-sky ">
            <Navbar className="container ">
                    <Nav.Link><BsEnvelope class="icon-env"> </BsEnvelope></Nav.Link>
                    <Nav.Link><BsBell class="icon-bell"></BsBell></Nav.Link>
                    <Nav.Link><BsFillPersonFill class="icon-person"></BsFillPersonFill></Nav.Link>
                    <Nav.Link><img class="logo"src={logo}/></Nav.Link>
                    <span class="titlesite">AtypikHouse</span>
                    
                    <form className="form-inline mt-4 mb-4">
                    <FaSistrix  class="icons"></FaSistrix>
                    <input class="form-control form-control-sm ml-5 w-100" type="text" placeholder="   Search..." aria-label="Search"  />
                    </form>
                    
                    <div class="sous-header"> 
                        <div class="fond">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >Settings</button>
                        <BsList class="icon-list"></BsList> 
                        <span class="titlelist"> Dashboard / Sales</span>
                        </div>
                    </div>

            </Navbar>
         </header>


        )
    }

}

export default Header;