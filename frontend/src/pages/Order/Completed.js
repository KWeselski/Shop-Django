import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, Text } from '@chakra-ui/react';

const Completed = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box textAlign="center">
        <Text fontSize="4xl">The payment was successful</Text>
        <Text fontSize="2xl">Thank you for your pursache.</Text>
      </Box>
      <Center>
        <Button variant="secondary" onClick={() => navigate('/')}>
          Done
        </Button>
      </Center>
    </>
  );
};

export default Completed;
