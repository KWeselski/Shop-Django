import React, {Component} from 'react';
import {Button, Grid,Paper,Typography,TextField, MenuItem } from '@material-ui/core';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {addCode,getLastOrder, addAddress, clearCart} from './actions/cartActions'

class Checkout extends Component {
    state = {
        street_address: "",
        apartament_address: "",
        city: "",
        postal_code: "",
        delivery_type: "",
        code: "",
        delivery_cost: 0,
        total_cost:0,  
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
   
    handleSubmit = e => {
        e.preventDefault();
    };

    checkTotalCost= (total, discount, delivery_cost, total_cost) =>{
        let value = 0;        
        if(discount.discount > 0){
            value = discount.total_after_discount + delivery_cost;
        }
        else{
            value = total + delivery_cost;
        }   
        this.setState({total_cost : value})
    }

    handleSelect = e => {
        this.setState({ [e.target.name]: e.target.value});
        const { delivery_cost } = this.state;
        if(e.target.value == "D"){
            this.setState({ delivery_cost: 6} )           
        }     
        else{this.setState({ delivery_cost: 0});}      
    };

    
    handleSubmitCode = e => {
        const { code } = this.state;
        this.props.addCode(e, code);
        this.setState({ code: "" });
             
      };

    handleAddAddress = () => {
        const { street_address, apartament_address, city, postal_code, delivery_type } = this.state;
        this.props.addAddress(street_address, apartament_address, city, postal_code, delivery_type);
        
    }
              
    render(){
        const {street_address, apartament_address, city, postal_code, delivery_type, code, delivery_cost, total_cost, total_after_discount} = this.state;
        const {total, discount} = this.props
        const deliveryTypes = [
            {value: 'P', label: 'Pickup in store (Free)'},
            {value: 'D', label: 'Delivery (+6$)'}
        ]
        
        return(
            <Grid container xs={12}>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
                <Typography  style={{padding:30}} variant="h4" align='center'>Add your address</Typography>
                
                <form onSubmit={this.handleSubmit}>         
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
                        borderWidth: '0 0 1px'}} variant='h5'>Delivery cost: {delivery_cost}<b>$</b></Typography>
                    <Typography variant='h5'>Total: {(discount.total_after_discount).toFixed(2)}<b>$</b></Typography>
                    </Grid>
                    <Grid item xs={12}>
                    <form onSubmit={this.handleSubmitCode}>
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
                        <Button style={{width:'100%' ,position:'absolute', bottom:40}}  type="submit" variant="contained" color='primary' onClick={()=>{this.handleSubmitCode()}}>Reedem Code</Button>
                    </Grid>
                    <Grid item xs={12}>                    
                    <Link to='/payment'><Button style={{width:'100%' ,position:'absolute', bottom:0}} variant="contained" color='primary' onClick={()=>{this.handleAddAddress()}}>Pay</Button></Link>
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
        discount: state.cart.discount
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        addCode: (e,code)=> {dispatch(addCode(e,code))},
        lastOrder: () => {dispatch(getLastOrder())},
        addAddress: (street_address, apartament_address, city, postal_code, delivery_type) =>
         {dispatch(addAddress(street_address, apartament_address, city, postal_code, delivery_type))},
        clearCart : () => {dispatch(clearCart())}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Checkout)