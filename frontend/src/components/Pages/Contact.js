import React from "react";
import {Form , Button, Row} from "react-bootstrap";
import TitleBlock from './../template_parts/mini-components/TitleBlock';

class Contact extends React.Component{
  
    render(){

        return(
            <section id='contact'>
                <div className="container d-flex flex-column justify-content-center align-items-center"> 
                    <Row>
                    <div className="titleConte">
                        <TitleBlock title="Contactez-Nous"/>
                        
                    </div>
                    </Row>
                    <Form className="d-flex justify-content-between flex-wrap row py-2"> 
                        <Form.Group className="col-6">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control type="text" placeholder="Nom"/>
                        </Form.Group>
                        <Form.Group className="col-6">
                            <Form.Label>Prenom</Form.Label>
                            <Form.Control type="text" placeholder="Prenom"/> 
                        </Form.Group>
                        <Form.Group className="col-6">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Email"/>      
                        </Form.Group>

                        <Form.Group className="col-6">
                            <Form.Label>Telephone</Form.Label>
                            <Form.Control type="text" placeholder="Telephone"/>    
                        </Form.Group>

                        <Form.Group className="col-12">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows="2" />
                        </Form.Group>

                        <Form.Group className="d-flex justify-content-center w-100">
                            <Button className="blue-Marine secondaryNb" type="submit">
                                Envoyer
                            </Button>
                        </Form.Group>
                    
                    </Form>
                </div>
            </section>
            
                
        )
    }

}

export default  Contact;