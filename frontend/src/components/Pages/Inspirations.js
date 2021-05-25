import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import InspirationCard from "../template_parts/InspirationCard";
import {connect} from 'react-redux';
import {dataThematics} from '../../actions/thematic';
import { Circular} from 'styled-loaders-react'

class Inspirations extends React.Component{
  componentDidMount() {
    this.props.dataThematics();
    }
  render()
  {
    let i = 0;
    return(
      <section className="pageLubrique">
        <div className="container">
          <div className="d-grid">
          {
            this.props.thematics.loading ? this.props.thematics.thematics.map(function(thematic){
              if(i==0){
                i++;
                return <InspirationCard thematic={thematic}  onFront='onFront'/>
              }
              else{
                return <InspirationCard thematic={thematic}/>
              }
            }) : 
            <div className='conteneurLoader'>
            <Circular color="#1b6e86 " size="150px" />
          </div>
          }
          </div>
        </div>
      </section>
    );
  }
}
const mapGetThematic = (state)=>{
  return{
    thematics : state.thematic
  }
}
export default connect(mapGetThematic, {dataThematics})(Inspirations);
