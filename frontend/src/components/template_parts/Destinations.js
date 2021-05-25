import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HautBlock from "./mini-components/HautBlock";
import DestinationAccueil from "./mini-components/DestinationAccueil";
import { v4 as uuidv4 } from "uuid";

class Destinations extends React.Component{
    
    render(){
        const destinationsView = [];
        for (let i = 0; i < 3; i++)
        {
            destinationsView.push(this.props.destinations.destinations[i]);
        }
        return(
            <Container>
               
                <HautBlock title="Nos destinations" link="/destinations"/>
                <Row>
                {
                    destinationsView.map((destination) => (
                    <Col key={destination.id} md={4}>
                       <DestinationAccueil destination={destination}/>
                    </Col>
                    ))
                } 
                </Row>
            </Container> 
        );
    }

}

export default Destinations;
