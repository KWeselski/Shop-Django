import React, { Component} from 'react'
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import axios from 'axios'
import {connect} from 'react-redux';
import {Button, Grid,Paper,Typography,TextField, MenuItem } from '@material-ui/core';

class PaymentForm extends Component {
      
    constructor(props){
        super(props);
        this.state = {
            error:null, 
            email:""
        };
    }
         
      handleChange = (event) => {
          if (event.error){
              this.setState({error: event.error.message});
          } else {
            this.setState({error: null});
          }
      }

    

    saveStripeInfo = (email , payment_method, total) => {
        axios.post("http://127.0.0.1:8000/api/save-stripe-info/",{
            email: email,
            payment_method_id : payment_method,
            amount: total
        }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error)
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const {stripe, elements, total} = this.props;
        const {email} = this.state;
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: ['card'],
            card: elements.getElement(CardElement),});
        this.saveStripeInfo(email,paymentMethod.id,total)
    };

      render() {
         const {email,error} = this.state;   
         const {stripe} = this.props;
         return(
            <Grid container xs={12}>
                <Grid item xs={6}>
                    <form onSubmit={this.handleSubmit} style={{width:300}}>
                        <Grid container spacing={1} textAlign="center" style={{height:"10vh"}}
                        verticalAlign="middle">
                            <Grid item xs={12}>
                            <Typography variant='h6'>Payment</Typography>
                            </Grid>
                            <Grid item xs={12}>        
                            <TextField
                                autoComplete='email'
                                name="email"
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoFocus
                                value={email}
                                onChange={(event) => { this.setState({email: event.target.value})}}/> 
                            </Grid>
                            <Grid item xs={12}>      
                                <Typography variant='h6'>Card Number</Typography>
                                <CardElement id="card-element" style={{width:100, height:100}} onChange={this.handleChange}/>
                                <div className="card-errors" role="alert">{error}</div>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant='contained' color='primary'>Submit Payment</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={6}>
                    <Typography></Typography>
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

export default connect(mapStateToProps)(PaymentForm)



/*
<Grid item xs={6}>
                        <h3>P 24</h3>
                        <P24BankElement options={P24_ELEMENT_OPTIONS}/>
                </Grid>   





*/
/*const P24_ELEMENT_OPTIONS = {
    // Custom styling can be passed to options when creating an Element
    style: {
      base: {
        padding: '10px 12px',
        color: '#32325d',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        },
      },
    },
  };*/
