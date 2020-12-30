import React, {Component} from 'react';
import {Button, Grid,Paper,Typography,TextField, MenuItem } from '@material-ui/core';
import {connect} from 'react-redux';
import {Link, Redirect } from 'react-router-dom'
import {addCode,getLastOrder} from './actions/cartActions'
import {addAddress} from './actions/addressAction'

class Checkout extends Component {
    state = {
        street_address: "",
        apartament_address: "",
        city: "",
        postal_code: "",
        delivery_type: "",
        code: "",
        total_cost:0, 
        completed : false
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
   
    handleSubmit = e => {
        e.preventDefault();

    };

    checkTotalCost= (total, discount, total_cost) =>{
        let value = 0;        
        if(discount.discount > 0){
            value = discount.total_after_discount;
        }
        else{
            value = total;
        }   
        this.setState({total_cost : value})
    }

    handleSelect = e => {
        this.setState({ [e.target.name]: e.target.value});
    };

    
    handleSubmitCode = e => {
        const { code } = this.state;
        this.props.addCode(e, code);
        this.setState({ code: "" });
             
      };

    handleAddAddress = e => {
        e.preventDefault()
        const { street_address, apartament_address, city, postal_code, delivery_type } = this.state;
        this.props.addAddress(street_address, apartament_address, city, postal_code, delivery_type);
        this.setState({ completed: true });
    }
              
    render(){
        const {street_address, apartament_address, city, postal_code, delivery_type, code, total_cost, total_after_discount,completed} = this.state;
        const {total, discount, isAuthenticated} = this.props
        const deliveryTypes = [
            {value: 'S', label: 'Pay in store'},
            {value: 'O', label: 'Pay online'}
        ]
        if(completed){
            if(delivery_type == 'S'){
                return <Redirect to="/completed" />;
            }
            return <Redirect to="/payment" />;
        }
        return(
            <Grid container xs={12}>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
                <Typography  style={{padding:30}} variant="h4" align='center'>Add your address</Typography>
                
                <form onSubmit={this.handleAddAddress}>         
                    <Grid container spacing={1} textAlign="center"
                    style={{ height: "50vh" }}
                    verticalAlign="middle">
                        <Grid item xs={12}>
                            <TextField
                                autoComplete='StreetAdress'
                                name="street_address"
                                variant="outlined"
                                required
                                fullWidth
                                id="streetAddress"
                                label="Street Address"
                                autoFocus
                                value={street_address}
                                onChange={this.handleChange}
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete='apartamentAdress'
                                name="apartament_address"
                                variant="outlined"
                                required
                                fullWidth
                                id="apartamentAddress"
                                label="Apartament Address"
                                autoFocus
                                value={apartament_address}
                                onChange={this.handleChange}
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete='City'
                                name="city"
                                variant="outlined"
                                required
                                fullWidth
                                id="city"
                                label="City"
                                autoFocus
                                value={city}
                                onChange={this.handleChange}
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete='postalCode'
                                name="postal_code"
                                variant="outlined"
                                required
                                fullWidth
                                id="postalCode"
                                label="Postal Code"
                                autoFocus
                                value={postal_code}
                                onChange={this.handleChange}
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                autoComplete='Delivery'
                                variant="outlined"
                                fullWidth
                                name='delivery_type'
                                id="Delivery"
                                label="Delivery"
                                required
                                value={delivery_type}                           
                                onChange={this.handleSelect}>
                                    {deliveryTypes.map((option)=> (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                        </Grid>
                        <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary" disabled={!isAuthenticated}>Pay</Button>  
                                
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>   
                <Grid containter style={{height:'80%', position:'relative'}}xs={12}>
                    <Grid item xs={12} style={{width:'100%', position:'absolute', marginTop: '6rem'}}>
                    <Typography variant='h5'>Total to pay: {total}<b>$</b></Typography>
                    <Typography variant='h5'>Discount: {discount.discount}<b>%</b></Typography>
                    <Typography style={{border: '1px solid rgba(0,0,0,0.5)',
                        borderWidth: '0 0 1px'}}></Typography>
                    {discount.discount > 0 ? <Typography variant='h5'>Total: {(discount.total_after_discount).toFixed(2)}<b>$</b></Typography> :
                    <Typography variant='h5'>Total: {total}<b>$</b></Typography>}
                    
                    </Grid>
                    <Grid item xs={12}>
                    
                    <form onSubmit={this.handleSubmitCode}>
                        <Typography variant='h6' style={{width:'100%' ,position:'absolute', bottom:140}}>Reedem Code</Typography>
                        <TextField 
                            style={{width:'100%' ,position:'absolute', bottom:80}}
                            autoComplete='Code'
                            name="code"
                            variant="outlined"
                            required
                            fullWidth
                            id="code"
                            label="CODE"
                            autoFocus
                            value={code}
                            onChange={this.handleChange}
                            />
                    </form>               
                        {/* <Button style={{width:'100%' ,position:'absolute', bottom:40}}  type="submit" variant="contained" color='primary' onClick={()=>{this.handleSubmitCode()}}>Reedem Code</Button> */}
                    </Grid>
                    <Grid item xs={12}> 
                              

                    </Grid>
                </Grid>                                        
            </Grid>
        </Grid>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        items: state.cart.addedItems,
        total :state.cart.total,
        discount: state.cart.discount,
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        addCode: (e,code)=> {dispatch(addCode(e,code))},
        lastOrder: () => {dispatch(getLastOrder())},
        addAddress: (street_address, apartament_address, city, postal_code, delivery_type) =>
         {dispatch(addAddress(street_address, apartament_address, city, postal_code, delivery_type))},
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Checkout)