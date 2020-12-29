import React, {Component} from 'react';
import {connect,} from 'react-redux';
import {Button , Grid, Typography} from '@material-ui/core';

class Completed extends Component {

    constructor(props){
        super(props);
        
    }
    render(){
        this.props.clearCart();
        return(
            <Grid container xs={12}>
                <Typography variant="h4"> Payment Completed</Typography>        
            </Grid>               
            )}
}


const mapDispatchToProps = (dispatch) =>{
    return{
        clearCart : () => {dispatch(clearCart())}
    }
}

export default connect(null, mapDispatchToProps)(Completed)