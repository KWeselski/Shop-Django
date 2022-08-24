import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Container, HStack, SimpleGrid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { productListURL, productListByCategoryURL } from "../constants";

const ProductList = () => {
  let { id } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(productListByCategoryURL(id))
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => setError(err));
  }, [id]);

  return (
    <Container maxW="1150px">
      <SimpleGrid columns={[1, 2, 3, 4]} mt={6} spacing={1}>
        {products.map((product, index) => {
          return <ProductCard key={index} {...product} />;
        })}
      </SimpleGrid>
    </Container>
  );
};

export default ProductList;
