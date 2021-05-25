import React, { useEffect } from "react";
import { connect } from "react-redux";
import Destinationpage from "../template_parts/mini-components/DestinationPage";
import {loadDestinations} from '../../actions/destinations';
import { Circular} from 'styled-loaders-react';

class Destinations extends React.Component {
  componentDidMount() {
    this.props.loadDestinations();
  }
    render(){
     
      let i = 0;
        return(
          <section className="pageLubrique">
            <div className="container">
              <div className="d-grid">
              {
               
               this.props.destinations.loading ? this.props.destinations.destinations.map(function(destination){ 
                 
                if(i==0){
                  i++
                  return <Destinationpage key={destination.id}  destination={destination} onFront='onFront' />
                
                }else if(i==6){
                  i++
                  return <Destinationpage key={destination.id}  destination={destination} onFront='onFront' />
                }
                else{
                  i++
                  return <Destinationpage key={destination.id}   destination={destination} />
                }
              })
            : 
              <div className="conteneurLoader">
                <Circular color="#1b6e86 " size="150px" />
              </div>
          }
          </div>
        </div>
      </section>
    );
  }
}

const destionPropsState = (state) => {
  return {
    destinations: state.destination,
  };
};
export default connect(destionPropsState, {
  loadDestinations,
})(Destinations);
