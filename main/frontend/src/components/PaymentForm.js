import React, { Component} from 'react'
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import axios from 'axios'
import {connect} from 'react-redux';

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
            type: 'card',
            card: elements.getElement(CardElement),});
        console.log(total)    
        this.saveStripeInfo(email,paymentMethod.id,total)
      };

      render() {
         const {email,error} = this.state;
         
         return(
            
        <form onSubmit={this.handleSubmit} style={{width:300}}>
            <div className="form-row">
                <label htmlFor="email">Email Address</label>
                <input className="form-input" id="email" name="name" type="email" placeholder="jenny.rosen@example.com" required 
                value={email} onChange={(event) => { this.setState({email: event.target.value})}}/>
            </div>
            <div className="form-row">
                <label for="card-element">Credit or debit card</label> 
                <CardElement id="card-element" onChange={this.handleChange}/>
                <div className="card-errors" role="alert">{error}</div>
            </div>
            <h3>Total: {this.props.total}</h3>
            <button type="submit" className="submit-btn">
                Submit Payment
            </button>
      </form>
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
