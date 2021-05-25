import React from "react";
import TitleBlock from "./TitleBlock";
import { Link } from "react-router-dom";



class HautBlock extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="d-flex justify-content-between  width-100">
                   <TitleBlock title={this.props.title}/>
                    <div className="conteneurBtn">
                        <Link  className="btnNb blue-Marine secondaryNb" to={this.props.link}>
                            Tout decouvrir
                        </Link>
                    </div>   
                </div>
        );
    }
}

export default HautBlock;
