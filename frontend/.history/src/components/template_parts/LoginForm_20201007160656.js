import React from 'react'
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import TitleBlock from './mini-components/TitleBlock';
import {Form , Button} from "react-bootstrap";
import isEmpty from 'lodash/isEmpty'; 
import validateInput from '../../tools/validationLogin';
import { authentification } from '../../actions';

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mail:'',
            password:'',
            errors:{},
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
                "password": this.state.password.value
            };
           
            this.props.connexion(data); 
           
           
        } 
    }

    render(){
        return(
            <Container className="d-flex justify-content-center">
                        <div className="d-flex flex-column align-items-center conteneurForm">
                            <Row>
                                <div className="titleConte">
                                    <TitleBlock title="Connexion"/>
                                    <span className="block">Nouveau? Créer un compte</span> 
                                </div>
                            </Row>
                            <div className="separateur"></div>
                            <Form onSubmit={(e) => this.handleSubmit(e)}> 
                                <div className="text-danger">{!isEmpty(this.props.errorConnexion)? 'Oups! La combinaison email / mot de passe est incorrecte.' : ''}</div>
                                <div className="text-danger">{this.state.errors.mail}</div>
                                <Form.Group>
                                    <Form.Label>Addresse email</Form.Label>
                                    <Form.Control className={this.state.errors.alertMail} ref={input => this.state.mail = input} type="text" placeholder="exemple@compte.com"/>
                                </Form.Group>
                                <div className="text-danger">{ this.state.errors.password}</div>
                                <Form.Group>
                    
                                    <div className="d-flex justify-content-between">
                                        <Form.Label>Mot de Passe</Form.Label>
                                        <span className='info'>
                                            oublié?
                                        </span>
                                    </div>
                                    <Form.Control className={this.state.errors.alertPass} type="password" ref={input => this.state.password = input }  placeholder="Mot de Passe "/> <br/>
                                   
                                    <label class="custom-control-label" for="customCheck1">Remember password</label>
                                </Form.Group>

                            
                
                                <Form.Group className="d-flex justify-content-center w-100">
                                    <Button className="blue-Marine secondaryNb" type="submit" disabled={this.isLoading}>
                                        connexion
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
        connexion: (data) =>{
            dispatch(authentification(data))
        }
    }
}
const MapStateToProps = (state) =>{
    return{
        errorConnexion : state.error,
    }
}
export default connect(MapStateToProps, mapDispatchToProps)(LoginForm) 