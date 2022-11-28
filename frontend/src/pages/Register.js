import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdLockOutline, MdOutlineEmail } from 'react-icons/md';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  Text
} from '@chakra-ui/react';
import {
  authFail,
  authSignup,
  authSuccess,
  checkAuthTimeout
} from '../components/actions/authActions';

const Register = ({ register, authError }) => {
  const [success, setSuccess] = useState(false);
  const [hasError, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = () => {
    axios
      .post('/rest-auth/registration/', {
        username: email,
        email: email,
        password1: password,
        password2: confirmPassword
      })
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem('token', response.data.key);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(response.data.key, email));
        dispatch(checkAuthTimeout(3600));
        setSuccess(true);
      })
      .catch(err => dispatch(authFail(err.response.data)));
  };

  useEffect(() => {
    success && navigate('/');
  }, [success]);

  return (
    <React.Fragment>
      <Flex width="full" align="center" justifyContent="center" mt="30">
        <Box
          p={6}
          width="500px"
          borderWidth={1}
          boxShadow="lg"
          borderColor="black"
        >
          <Box textAlign="center">
            <Heading>Register</Heading>
          </Box>
          <Box my="4" textAlign="left">
            <form>
              <FormControl isInvalid={authError?.email}>
                <FormLabel>Email</FormLabel>
                <Flex alignItems="center">
                  <Icon w={8} h={8} p={1} as={MdOutlineEmail} />
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    onChange={e => setEmail(e.currentTarget.value)}
                  />
                </Flex>
                <FormErrorMessage>
                  {authError?.email && authError.email.map(err => err)}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={authError?.password1 || authError?.non_field_errors}
              >
                <FormLabel>Password</FormLabel>
                <Flex alignItems="center">
                  <Icon w={8} h={8} p={1} as={MdLockOutline} />

                  <Input
                    type="password"
                    placeholder="********"
                    onChange={e => setPassword(e.currentTarget.value)}
                  />
                </Flex>
                {authError?.password1 && (
                  <FormErrorMessage>
                    {authError.password1.map(err => err)}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isInvalid={authError?.password2 || authError?.non_field_errors}
              >
                <FormLabel>Confirm password</FormLabel>
                <Flex alignItems="center">
                  <Icon w={8} h={8} p={1} as={MdLockOutline} />
                  <Input
                    type="password"
                    placeholder="********"
                    onChange={e => setConfirmPassword(e.currentTarget.value)}
                  />
                </Flex>
                {authError?.password2 && (
                  <FormErrorMessage>
                    {authError.password2.map(err => err)}
                  </FormErrorMessage>
                )}
                {authError?.non_field_errors && (
                  <FormErrorMessage>
                    {authError.non_field_errors.map(err => err)}
                  </FormErrorMessage>
                )}
              </FormControl>
            </form>
            <Button
              variant="secondary"
              width="full"
              mt={4}
              onClick={() => onRegister()}
            >
              Register
            </Button>
          </Box>
          <Text fontSize="sm">
            By creating an account, you accept our Terms and Conditions. Read
            our Privacy Policy.
          </Text>
        </Box>
      </Flex>
      <Divider m="5" />
      <Flex width="full" align="center" justifyContent="center">
        <Box p={2} textAlign="center">
          <Heading>You have an account?</Heading>
          <Link to="/sign/">
            <Button variant="primary" width="full" mt={4}>
              Sign in
            </Button>
          </Link>
        </Box>
      </Flex>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    authError: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (email, password, confirmPassword) =>
      dispatch(authSignup(email, password, confirmPassword))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
