import React, { useEffect, useState } from 'react';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack
} from '@chakra-ui/react';
import { clearCart } from '../../components/actions/cartActions';
import { stripeURL } from '../../constants';

const inputStyle = {
  fontSize: '18px',
  color: '#1A202C',
  '::placeholder': {
    color: '#A0AEC0'
  }
};

const ERRORS_TYPES = {
  INCOMPLETE_CVC: 'incomplete_cvc',
  INCOMPLETE_EXPIRY: 'incomplete_expiry',
  INCOMPLETE_NUMBER: 'incomplete_number',
  INVALID_EXPIRY_YEAR: 'invalid_expiry_year',
  INVALID_EXPIRY_YEAR_PAST: 'invalid_expiry_year_past',
  INVALID_NUMBER: 'invalid_number'
};

const PayoutForm = ({ clearCart, nextStep, prevStep, totalAmount }) => {
  const [successed, setSucceessed] = useState(false);
  const [isProcessing, setProcessing] = useState(false);
  const [errors, setErrors] = useState([]);
  const stripe = useStripe();
  const [paymentCompleted, setPaymentCompleted] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false
  });
  const elements = useElements();

  const saveStripeInfo = paymentMethodId => {
    axios
      .post(stripeURL, {
        email: 'xyz@o2.pl',
        payment_method_id: paymentMethodId,
        amount: totalAmount
      })
      .then(response => {
        setSucceessed(response.data.success);
        clearCart();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }
    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement)
    });
    if (error) {
      setErrors(error);
    } else {
      saveStripeInfo(paymentMethod.id);
    }
    setProcessing(false);
  };

  const handleChange = event => {
    const { complete, elementType } = event;
    setPaymentCompleted({ ...paymentCompleted, [elementType]: complete });
  };

  useEffect(() => {
    successed && nextStep();
  }, [successed]);

  return (
    <form>
      <FormControl>
        <FormLabel>Card number</FormLabel>
        <Box
          borderWidth={1}
          borderRadius="md"
          borderColor="gray.300"
          padding="4px 8px 4px 8px"
        >
          <CardNumberElement
            options={{
              style: {
                base: inputStyle
              }
            }}
            onChange={handleChange}
          />
        </Box>
        <FormErrorMessage>
          {[
            ERRORS_TYPES.INCOMPLETE_NUMBER,
            ERRORS_TYPES.INVALID_NUMBER
          ].includes(errors.code) && errors.message}
        </FormErrorMessage>
      </FormControl>
      <Stack direction="row">
        <FormControl
          isInvalid={[
            ERRORS_TYPES.INCOMPLETE_EXPIRY,
            ERRORS_TYPES.INVALID_EXPIRY_YEAR,
            ERRORS_TYPES.INVALID_EXPIRY_YEAR_PAST
          ].includes(errors.code)}
        >
          <FormLabel>Expiration date</FormLabel>
          <Box
            borderWidth={1}
            borderColor="gray.300"
            borderRadius="md"
            padding="4px 8px 4px 8px"
          >
            <CardExpiryElement
              options={{
                style: {
                  base: inputStyle
                }
              }}
              onChange={handleChange}
            />
          </Box>
        </FormControl>
        <FormErrorMessage>
          {[
            ERRORS_TYPES.INCOMPLETE_EXPIRY,
            ERRORS_TYPES.INVALID_EXPIRY_YEAR,
            ERRORS_TYPES.INVALID_EXPIRY_YEAR_PAST
          ].includes(errors.code) && errors.message}
        </FormErrorMessage>
        <FormControl>
          <FormLabel>CCV</FormLabel>
          <Box
            borderWidth={1}
            borderColor="gray.300"
            borderRadius="md"
            padding="4px 8px 4px 8px"
          >
            <CardCvcElement
              options={{
                style: {
                  base: inputStyle
                }
              }}
              onChange={handleChange}
            />
          </Box>
        </FormControl>
        <FormErrorMessage>
          {[ERRORS_TYPES.INCOMPLETE_CVC].includes(errors.code) &&
            errors.message}
        </FormErrorMessage>
      </Stack>
      <Stack direction="row" mt="20px" justifyContent="space-between">
        <Button variant="primary" onClick={() => prevStep()}>
          Back
        </Button>
        <Button
          variant="secondary"
          isLoading={isProcessing}
          disabled={!stripe}
          onClick={() => handleSubmit()}
        >
          Pay
        </Button>
      </Stack>
    </form>
  );
};

const Step2 = props => {
  const stripePromise = loadStripe(`${process.env.REACT_STRIPE_SECRET_KEY}`);
  return (
    <Elements stripe={stripePromise}>
      <PayoutForm {...props} />
    </Elements>
  );
};

const mapStateToProps = state => {
  return {
    totalAmount: state.cart.total
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(clearCart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step2);
