import React, { Component} from 'react'
import {Typography, Grid} from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    footerGrid: {
        position:'absolute',
        bottom:0,
        height:75,
        backgroundColor:'#212121',
        color:'white',
    },   
    footerDiv: {
        display:'flex',
        margin:'auto',
        letterSpacing: '0.1rem',
    },   
    footerItem: {
        padding: 20
    }

});

class Footer extends Component{
   
    render(){
        const {classes} = this.props
        return(
            <Grid container className={classes.footerGrid} xs={12}>
                <div className={classes.footerDiv}>
                <Grid item xs={12}><Typography className={classes.footerItem} variant='h6'>Help</Typography></Grid> 
                <Grid item xs={12}><Typography className={classes.footerItem} variant='h6'>Contact</Typography></Grid>
                <Grid item xs={12}><Typography className={classes.footerItem} variant='h6'>About</Typography></Grid>
                <Grid item xs={12}><Typography className={classes.footerItem} variant='h6'>FAQ</Typography></Grid>
                </div>
            </Grid>)
    }
}
export default withStyles(styles)(Footer)