import React from 'react'
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import TitleBlock from './mini-components/TitleBlock';
import {Form , Button} from "react-bootstrap";
import isEmpty from 'lodash/isEmpty'; 
import validateInput from '../../tools/validationRegister';
import {registration} from '../../actions';

class RegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            passwordConf:'',
            name:'',
            lastname:'',
            dateOfBirth:'',
            phone:'',
            errors:{},
            newsletter:'',
            cgu:'',
            isLoading: false,
            response:{}
        };
    }
    isValid(){
        
        const { errors, isValid } = validateInput(this.state);
        if(!isValid){
            this.setState({errors});
        }
        return isValid;
    }

    handleSubmit(e){

        e.preventDefault();
        if(this.isValid()){
            this.setState({errors:{}, isLoading: true});
            let data={
                "email": this.state.mail.value,
                "roles":["ROLE_USER"],
                "password": this.state.password.value,
                "name":this.state.name.value,
                "lastName":this.state.lastname.value,
                "phone":this.state.phone.value,
                "status":true,
                "dateOfBirth":this.state.dateOfBirth.value,
                "reference":'lorem ipsum',
                "acceptConditionsUser":this.state.cgu.checked,
                "acceptReceiveNewsLetters":this.state.newsletter.checked,
            };
          
            this.props.register(data);
           
           
        } 
    }

    render(){
        return(
            <Container className="d-flex justify-content-center">
                        <div className="d-flex flex-column align-items-center conteneurForm">
                            <Row>
                                <div className="titleConte">
                                    <TitleBlock title="Inscription"/>
                                    <span className="block">Déjà inscrit? Connectez-vous</span> 
                                </div>
                            </Row>
                            <div className="separateur"></div>
                            <Form onSubmit={(e) => this.handleSubmit(e)}> 
                                <div className="text-danger">{!isEmpty(this.props.errorRegistration)? this.props.errorRegistration : ''}</div>
                               
                                <div className="text-danger">{this.state.errors.name}</div>
                                <Form.Group>
                                    <Form.Label>Nom</Form.Label>
                                    <Form.Control className={this.state.errors.alertName} ref={input => this.state.name = input} type="text" placeholder="exemple Dupont"/>
                                </Form.Group>
                                <div className="text-danger">{this.state.errors.lastname}</div>
                                <Form.Group>
                                    <Form.Label>Prenom</Form.Label>
                                    <Form.Control className={this.state.errors.alertLastname} ref={input => this.state.lastname = input}  type="text" placeholder="exemple Jacques"/>
                                </Form.Group>
                                <div className="text-danger">{this.state.errors.dateOfBirth}</div>
                                <Form.Group>
                                    <Form.Label>Date de Naissance</Form.Label>
                                    <Form.Control className={this.state.errors.AlertDateOfBirth}  ref={input => this.state.dateOfBirth = input}  type="date" />
                                </Form.Group>
                                <div className="text-danger">{this.state.errors.mail}</div>
                                <Form.Group>
                                    <Form.Label>Addresse email</Form.Label>
                                    <Form.Control className={this.state.errors.alertMail} ref={input => this.state.mail = input} type="text" placeholder="exemple@compte.com"/>
                                </Form.Group>
                                <div className="text-danger">{ this.state.errors.password}</div>
                                <Form.Group>
                                    <Form.Label>Mot de Passe</Form.Label>
                                    <Form.Control className={this.state.errors.alertPass} type="password" ref={input => this.state.password = input }  placeholder="Mot de Passe "/> 
                                </Form.Group>
                                <div className="text-danger">{ this.state.errors.passwordConf}</div>
                                <Form.Group>
                                    <Form.Label>Confirme le mot de passe</Form.Label>
                                    <Form.Control className={this.state.errors.alertPasswordConf} type="password" ref={input => this.state.passwordConf = input }  placeholder="Mot de Passe "/> 
                                </Form.Group>
                                <div className="text-danger">{this.state.errors.phone}</div>
                                <Form.Group>
                                    <Form.Label>Téléphone</Form.Label>
                                    <Form.Control className={this.state.errors.alertPhone} ref={input => this.state.phone = input}  type="text" placeholder="06xxxxxxxx"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Je souhaite recevoir les dernières offres exclusives</Form.Label>
                                    <Form.Control ref={input => this.state.newsletter = input}  type="checkbox" />
                                </Form.Group>
                                <div className="text-danger">{this.state.errors.cgu}</div>
                                <Form.Group>
                                    <Form.Label>J'accepte les conditions d'utilisateurs et la politique vie privée</Form.Label>
                                    <Form.Control className={this.state.errors.alertCgu} ref={input => this.state.cgu = input}  type="checkbox" />
                                </Form.Group>
                            
                
                                <Form.Group className="d-flex justify-content-center w-100">
                                    <Button className="blue-Marine secondaryNb larger" type="submit" disabled={this.isLoading}>
                                        Accepter et s'inscrire
                                    </Button>
                                </Form.Group>
                            
                            </Form>
                        </div>
                        
                    </Container>
        );
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        register: (data) =>{
            dispatch(registration(data))
        }
    }
}
const MapStateToProps = (state) =>{
    return{
        errorRegistration : state.profil.error,
    }
}
export default connect(MapStateToProps, mapDispatchToProps)(RegisterForm)  