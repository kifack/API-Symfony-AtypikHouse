import React from 'react';

class TitleBlock extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <h2 className='titleBlock'>{this.props.title}</h2>
        );
    }
}

export default TitleBlock;