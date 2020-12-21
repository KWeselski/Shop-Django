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
        return(
            <Grid container xs={12}>
                <Grid item xs={3}>
                    <Typography align='left' variant="h5">{this.props.temp.user}</Typography>
                    <Typography align='left' variant="h5">Rating: {this.props.temp.rating}</Typography>                 
                </Grid>
                <Grid item xs={7}>
                    <Typography align='justify' variant="h6">{this.props.temp.opinion}</Typography>
                </Grid>
            </Grid>
                
            )
    }
}

export default (OpinionsForm)