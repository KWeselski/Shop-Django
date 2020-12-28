import React, { Component} from 'react'
import {Typography, Grid} from '@material-ui/core';




export default class Footer extends Component{
    render(){
        return(
            <Grid style={{position:'absolute', bottom:0,height:75, backgroundColor:'#212121', color:'white'}}container xs={12}>
                <div style={{display:'flex',margin:'auto', letterSpacing:'0.1rem'}}>
                <Grid item xs={12}><Typography className={'footerItem'} variant='h6'>Help</Typography></Grid> 
                <Grid item xs={12}><Typography className={'footerItem'} variant='h6'>Contact</Typography></Grid>
                <Grid item xs={12}><Typography className={'footerItem'} variant='h6'>About</Typography></Grid>
                <Grid item xs={12}><Typography className={'footerItem'} variant='h6'>FAQ</Typography></Grid>
                </div>
            </Grid>)
    }
}