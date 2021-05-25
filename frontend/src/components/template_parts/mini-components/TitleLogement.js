import React from 'react'

class TitleLogement extends React.Component{

    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="d-flex align-items-center contTitle">
                 <h2>{this.props.title}</h2>
            </div>
           
        )
    }
}

export default TitleLogement