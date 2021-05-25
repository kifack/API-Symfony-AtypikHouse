import React from 'react'
import { Image } from 'react-bootstrap'
import { BsHeartFill } from "react-icons/bs";
import { BsChatFill } from "react-icons/bs";

class InfoEntity extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="contIndicateur d-flex justify-content-between align-items-center">
                <span>
                    {this.props.date}
                </span>
                <div className="contentSpan">
                    <span>
                       <BsHeartFill/> {this.props.like}
                    </span>
                    <span>
                       <BsChatFill/> {this.props.comment}
                    </span>
                </div>
                
            </div>
        )
    }
}
export default InfoEntity