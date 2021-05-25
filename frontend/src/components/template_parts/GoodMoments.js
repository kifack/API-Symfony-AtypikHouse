import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import HautBlock from "./mini-components/HautBlock";
import Experience from "./mini-components/Experience";
import { v4 as uuidv4 } from "uuid";




class GoodMoments extends React.Component{

    render(){
        const thematicView = [];
        for (let i = 0; i <= 3; i++)
        {
            thematicView.push(this.props.thematics.thematics[i]);
        }
        return(
            <Container> 
                <HautBlock title="Les plus belles experiences" link="/inspirations"/>
                <Row>
                    {
                        thematicView.map((thematic) => (
                            <Col key={thematic.id}  md={4}>
                               <Experience  thematic={thematic} />
                            </Col>
                        ))
                    }   
                </Row>
            </Container> 
        )
    }
}
export default GoodMoments;
