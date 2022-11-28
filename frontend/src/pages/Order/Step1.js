import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup
} from '@chakra-ui/react';
import { createOrderURL } from '../../constants';

const Step1 = ({ products, nextStep }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    surname: '',
    company: '',
    street: '',
    city: '',
    zip_code: '',
    countryCode: '',
    phoneNumber: ''
  });

  const [errors, setErrors] = useState([]);

  const order = () => {
    axios
      .post(
        createOrderURL,
        {
          customer_info: customerInfo,
          items: products
        },
        {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          }
        }
      )
      .then(response => {
        response.data.success && nextStep();
      })
      .catch(error => {
        error.response && setErrors(error.response.data.error);
      });
  };

  const handleChange = event => {
    setCustomerInfo({
      ...customerInfo,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Box my="4" textAlign="left">
      <form>
        <FormControl isInvalid={errors?.name}>
          <FormLabel>Name</FormLabel>
          <Input name="name" onChange={e => handleChange(e)} />
          <FormErrorMessage>
            {errors?.name && errors.name.map(err => err)}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors?.surname}>
          <FormLabel>Surname</FormLabel>
          <Input name="surname" onChange={e => handleChange(e)} />
          <FormErrorMessage>
            {errors?.surname && errors.surname.map(err => err)}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors?.company}>
          <FormLabel>Company (optional)</FormLabel>
          <Input name="company" onChange={e => handleChange(e)} />
          <FormErrorMessage>
            {errors?.company && errors.company.map(err => err)}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors?.street}>
          <FormLabel>Street</FormLabel>
          <Input name="street" onChange={e => handleChange(e)} />
          <FormErrorMessage>
            {errors?.street && errors.street.map(err => err)}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors?.city}>
          <FormLabel>City</FormLabel>
          <Input name="city" onChange={e => handleChange(e)} />
          <FormErrorMessage>
            {errors?.city && errors.city.map(err => err)}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors?.zip_code}>
          <FormLabel>ZIP code</FormLabel>
          <Input name="zip_code" onChange={e => handleChange(e)} />
          <FormErrorMessage>
            {errors?.zip_code && errors.zip_code.map(err => err)}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Phone</FormLabel>
          <InputGroup>
            <FormControl isInvalid={errors?.phone}>
              <Input
                name="countryCode"
                type="number"
                placeholder="+123"
                maxLength={3}
                maxValue={999}
                ml={0}
                w="20%"
                pattern="\d{3}"
                onChange={e => handleChange(e)}
              />
              <Input
                name="phoneNumber"
                inputMode="tel"
                w="80%"
                onChange={e => handleChange(e)}
              />
              <FormErrorMessage>
                {errors?.phone && errors.phone.map(err => err)}
              </FormErrorMessage>
            </FormControl>
          </InputGroup>
        </FormControl>
      </form>
      <Button
        variant="secondary"
        type="submit"
        width="full"
        mt={4}
        onClick={() => order()}
      >
        Order
      </Button>
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    products: state.cart.addedItems.map(item => ({
      id: item.id,
      quantity: item.quantity
    }))
  };
};

export default connect(mapStateToProps)(Step1);
