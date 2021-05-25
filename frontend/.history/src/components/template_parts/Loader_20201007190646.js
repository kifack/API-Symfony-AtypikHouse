import React from 'react'
import logo from './../media/logo.png';
import { Circular} from 'styled-loaders-react'

class Loader extends React.Component{
    state = {
        loading:true
    }
    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                loading:false
            })
        }, 5000)
    }
    render(){
        return(
            <div className="loader">{
                this.state.loading?<Circular color="#1b6e86 " size="150px" /> : <img src={logo} /> 
            }       
            </div>
        );
    }
}

export default Loader;