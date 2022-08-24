import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProductCard = ({ id, name, price, image }) => {
  return (
    <Box borderRadius="lg" maxW="250px">
      <Box maxH="160px">
        <Image
          src={image}
          objectFit="cover"
          height="160px"
          width="100%"
          alt="product"
        />
      </Box>
      <Box mt="1" px="2" as="h5" fontWeight="semibold">
        <Link to={`/product/${id}`}>{name}</Link>
      </Box>
      <Box p="2" as="h5" fontWeight="semibold">
        {price}$
      </Box>
    </Box>
  );
};

export default ProductCard;
