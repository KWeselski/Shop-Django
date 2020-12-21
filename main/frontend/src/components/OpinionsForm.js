import React, { Component} from 'react'
import axios from 'axios';
import {Button, Grid, TextField , Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {getOpinions} from './actions/cartActions'

class OpinionsForm extends Component {
 
    constructor(props){
        super(props);
    }   

    render(){
        console.log(this.props.temp)
        return(
            <div>
                <h2>{this.props.temp.rating}</h2>
                
                <h5>{this.props.temp.opinion}</h5>
            </div>
            )
    }
}

export default (OpinionsForm)