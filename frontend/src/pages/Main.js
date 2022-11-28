import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, HStack, SimpleGrid } from '@chakra-ui/react';
import ImageBar from '../components/ImageBar';
import ProductCard from '../components/ProductCard';
import { productListURL } from '../constants';

const Main = () => {
  return (
    <Container maxW="1150px">
      <ImageBar />
    </Container>
  );
};

export default Main;
