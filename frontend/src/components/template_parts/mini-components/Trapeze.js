import React from "react";
import {Image} from "react-bootstrap";
import playstore from "./../../../media/pictos/google.png";
import applestore from "./../../../media/pictos/applestore.png";

class Trapeze extends React.Component{
    render(){
        return(
            <div className="trapeze">
                <div>
                    <h2>
                        <span>La difference s'impose</span>
                        <span>venez la découvrir</span>
                        <span>AtypikHouse</span>
                    </h2>
                    <div>
                        <Image src={playstore}/>
                        <Image src={applestore}/>
                    </div>
                </div>
            </div>
            );
    }
    
}
export default Trapeze;