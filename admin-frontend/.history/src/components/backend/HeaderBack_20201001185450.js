import React from "react";
import { Navbar, Nav, Image, Row, Container, Col } from "react-bootstrap";
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
                <Row className="align-items-center"> 
                    <Col> 
                        <Nav.Link><Image class="logo"src={logo}/><span class="titlesite">AtypikHouse</span></Nav.Link>
                    </Col>
                    <Col> 
                        <form >
                        
                        <input  type="text" placeholder="Search..." aria-label="Search"  />
                        <button type="submit" ><FaSistrix className="icons"/></button>
                        </form>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Nav.Link><BsEnvelope className="icon-env"/></Nav.Link>
                        <Nav.Link><BsBell className="icon-bell"/></Nav.Link>
                        <Nav.Link><BsFillPersonFill className="icon-person"/></Nav.Link>
                    </Col>
                </Row >
                </Container>
                </div>
                    
                    <div class="sous-header"> 
                    <Container> 
                    <Row className="align-items-center">      
                        <Col> 
                        <button className="pull-right dropdown-toggle" type="button" id="setting">Settings</button>
                        </Col>

                        <Col className="d-flex justify-content-end"> 
                        <BsList class="icon-list"/> 
                        <span className="titlelist"> Dashboard / Sales</span>
                        </Col>
                        
                    
                    </Row>
                    </Container>
                    </div>

            </Navbar>
         </header>


        )
    }

}

export default HeaderBack;