import React from "react";
import { Container } from "react-bootstrap";
import Trapeze from "./mini-components/Trapeze";

class Slogan extends React.Component{

    render(){
        return(
            <Container className="d-flex justify-content-end width-100">
                <Trapeze />
            </Container>
           
        );
    }

}
export default Slogan;