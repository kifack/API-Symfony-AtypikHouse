import React from "react";
import { Navbar, Nav, Image, Row, Container } from "react-bootstrap";
import { BsBell, BsEnvelope, BsFillPersonFill, BsList } from "react-icons/bs";
import { FaSistrix } from "react-icons/fa";
import logo from './../../media/logonegatif.svg';


class HeaderBack extends React.Component{
    render(){
        return(

            <header>
            <Navbar>
                
                <div className="blue-sky menuhaut">
                <Container > 
                <Row > 
                        <Nav.Link><Image class="logo"src={logo}/><span class="titlesite">AtypikHouse</span></Nav.Link>
                        <Nav.Link><BsEnvelope class="icon-env"/></Nav.Link>
                        <Nav.Link><BsBell class="icon-bell"/></Nav.Link>
                        <Nav.Link><BsFillPersonFill class="icon-person"/></Nav.Link>
                        <form className="form-inline mt-4 mb-4">
                        <FaSistrix  className="icons"/>
                        <input className="form-control form-control-sm ml-5 w-100" type="text" placeholder="   Search..." aria-label="Search"  />
                        </form>
                </Row>
                </Container>
                </div>
                    
                    <div class="sous-header"> 
                    <Container> 
                    <Row> 
                    <div> 
                        <div class="fond">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >Settings</button>
                        <BsList class="icon-list"/> 
                        <span class="titlelist"> Dashboard / Sales</span>
                        </div>
                    </div>
                    </Row>
                    </Container>
                    </div>

            </Navbar>
         </header>


        )
    }

}

export default HeaderBack;