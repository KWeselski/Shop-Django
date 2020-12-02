import React, {Component} from 'react';



export default class TestComponent extends Component{
    constructor(props){
        super (props);
        this.state = {

        }       
    }

    render(){
        console.log('Hello')
        return(
            
            <h1>Test</h1>
        )
    }
}