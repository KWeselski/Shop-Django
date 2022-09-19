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
  Icon
} from "@chakra-ui/react";
import {
  MdOutlinePersonOutline,
  MdOutlineEmail,
  MdLockOutline
} from "react-icons/md";
import { connect } from "react-redux";
import { authSignup } from "../components/actions/authActions";
import { Link, Redirect } from "react-router-dom";

const ResetPassword = ({ resetPassword }) => {
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

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
            </form>
            <Button
              bgColor="black"
              color="white"
              variant="outline"
              type="submit"
              width="full"
              mt={4}
              onClick={() => resetPassword(email)}
            >
              Reset passoword
            </Button>
          </Box>
          <Text fontSize="xl" color="blue">
            Back to login
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
              Create an account
            </Button>
          </Link>
        </Box>
      </Flex>
    </React.Fragment>
  );
};

const mapDispatchToProps = distpatch => {
  return {
    resetPassword: email => distpatch(authSignup(email))
  };
};

export default connect(null, mapDispatchToProps)(ResetPassword);
