import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { MdLockOutline, MdOutlineEmail } from 'react-icons/md';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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
  Text,
  VStack
} from '@chakra-ui/react';
import {
  authFail,
  authLogout,
  authSuccess,
  checkAuthTimeout
} from '../components/actions/authActions';

const Signed = ({ onLogout }) => (
  <Fragment>
    <Box textAlign="center">
      <VStack>
        <Heading>You are logged</Heading>
        <Heading size="sm">sign in to different account</Heading>
      </VStack>
    </Box>
    <Box my="4" textAlign="left">
      <Button
        bgColor="black"
        color="white"
        variant="outline"
        type="submit"
        width="full"
        mt={4}
        onClick={() => onLogout()}
      >
        Logout
      </Button>
    </Box>
  </Fragment>
);

const NotSigned = ({ error, onSign, setEmail, setPassword }) => (
  <Fragment>
    <Box textAlign="center">
      <Heading>Sign in now</Heading>
    </Box>
    <Box my="4" textAlign="left">
      <form>
        <FormControl isInvalid={error?.email}>
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
            {error?.email && error.email.map(err => err)}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={error?.non_field_errors}>
          <FormLabel>Password</FormLabel>
          <Flex alignItems="center">
            <Icon w={8} h={8} p={1} as={MdLockOutline} />
            <Input
              type="password"
              placeholder="********"
              onChange={e => setPassword(e.currentTarget.value)}
            />
          </Flex>
          {error?.non_field_errors && (
            <FormErrorMessage>
              {error.non_field_errors.map(err => err)}
            </FormErrorMessage>
          )}
        </FormControl>
      </form>
      <Button
        variant="secondary"
        type="submit"
        width="full"
        mt={4}
        onClick={() => onSign()}
      >
        Sign In
      </Button>
    </Box>
    <Text fontSize="xl" color="blue">
      Forgot password?
    </Text>
  </Fragment>
);

const Sign = ({ token }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const onLogout = () =>
    axios
      .post('/rest-auth/logout/', {})
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        dispatch(authLogout());
      })
      .catch(err => {
        dispatch(authFail(err));
      });

  const onSign = () =>
    axios
      .post('/rest-auth/login/', {
        email: email,
        password: password
      })
      .then(response => {
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem('token', response.data.key);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(response.data.key, email));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        setError(err.response.data);
      });

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
          {token ? (
            <Signed onLogout={onLogout} />
          ) : (
            <NotSigned
              error={error}
              onSign={onSign}
              setEmail={setEmail}
              setPassword={setPassword}
            />
          )}
        </Box>
      </Flex>
      <Divider m="5" />
      <Flex width="full" align="center" justifyContent="center">
        <Box p={2} textAlign="center">
          <Heading>You don't have an account?</Heading>
          <Link to={`/register/`}>
            <Button
              bg="white"
              color="black"
              variant="primary"
              type="submit"
              width="full"
              mt={4}
            >
              Create an account
            </Button>
          </Link>
        </Box>
      </Flex>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps, null)(Sign);
