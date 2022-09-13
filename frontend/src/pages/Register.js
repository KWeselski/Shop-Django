import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
  Icon,
  Text
} from "@chakra-ui/react";
import {
  MdOutlinePersonOutline,
  MdOutlineEmail,
  MdLockOutline
} from "react-icons/md";
import { connect } from "react-redux";
import { authSignup } from "../components/actions/authActions";
import { Link, Redirect } from "react-router-dom";

const Register = ({ register, token }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const onRegister = () => {
    register(username, email, password, confirmPassword)
      .then(setSuccess(true))
      .catch(err => setError(err));
  };

  useEffect(
    () => {
      success && <Redirect to="/" />;
    },
    [success]
  );

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
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Flex alignItems="center">
                  <Icon w={8} h={8} p={1} as={MdOutlinePersonOutline} />
                  <Input
                    placeholder="Please enter a username"
                    onChange={e => setUsername(e.currentTarget.value)}
                  />
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Flex alignItems="center">
                  <Icon w={8} h={8} p={1} as={MdOutlineEmail} />

                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    onChange={e => setEmail(e.currentTarget.value)}
                  />
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Flex alignItems="center">
                  <Icon w={8} h={8} p={1} as={MdLockOutline} />

                  <Input
                    type="password"
                    placeholder="********"
                    onChange={e => setPassword(e.currentTarget.value)}
                  />
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel>Confirm password</FormLabel>
                <Flex alignItems="center">
                  <Icon w={8} h={8} p={1} as={MdLockOutline} />
                  <Input
                    type="password"
                    placeholder="********"
                    onChange={e => setConfirmPassword(e.currentTarget.value)}
                  />
                </Flex>
              </FormControl>
            </form>
            <Button
              bgColor="black"
              color="white"
              variant="outline"
              type="submit"
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
            <Button
              bg="white"
              color="black"
              variant="primary"
              type="submit"
              width="full"
              mt={4}
            >
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
    token: state.auth.token
  };
};

const mapDispatchToProps = distpatch => {
  return {
    register: (username, email, password, confirmPassword) =>
      distpatch(authSignup(username, email, password, confirmPassword))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
