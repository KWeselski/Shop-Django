import React, { Component} from 'react'
import {Typography, Grid} from '@material-ui/core';




export default class Footer extends Component{
    render(){
        return(
            <Grid style={{position:'absolute', bottom:0,height:100, backgroundColor:'#3f50b5', color:'white',display:'block'}}container xs={12}>
                <Grid item xs={12}>Help</Grid> 
                <Grid item xs={12}>Contact</Grid>
                <Grid item xs={12}>About</Grid>
                <Grid item xs={12}>FAQ</Grid>
            </Grid>)
    }
}