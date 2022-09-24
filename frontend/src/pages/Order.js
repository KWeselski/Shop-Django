import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
  Text,
  Icon,
  VStack
} from "@chakra-ui/react";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { connect } from "react-redux";
import { authLogin } from "../components/actions/authActions";
import { Link } from "react-router-dom";

const Sign = ({ sign, token }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            {token
              ? <VStack>
                  <Heading>You are logged</Heading>
                  <Heading size="sm">sign in to different account</Heading>
                </VStack>
              : <Heading>Sign in now</Heading>}
          </Box>
          <Box my="4" textAlign="left">
            <form>
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
            </form>
            <Button
              bgColor="black"
              color="white"
              variant="outline"
              type="submit"
              width="full"
              mt={4}
              onClick={() => sign(email, password)}
            >
              Sign In
            </Button>
          </Box>
          <Text fontSize="xl" color="blue">
            Forgot password?
          </Text>
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

const mapDispatchToProps = distpatch => {
  return {
    sign: (email, password) => distpatch(authLogin(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
