import React, { useEffect, useState } from "react";
import {
  Heading,
  Grid,
  Box,
  Button,
  ButtonGroup,
  HStack,
  Image,
  Stack,
  Text,
  Flex,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { productDetailURL, getOpinionsURL } from "../../constants";
import { Link, useParams } from "react-router-dom";
import OpinionList from "../OpinionList";
import { CheckCircleIcon } from "@chakra-ui/icons";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [opinions, setOpinions] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const getProduct = (id) =>
    axios
      .get(productDetailURL(id))
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => setError(err));

  const getOpinions = (id) =>
    axios
      .get(getOpinionsURL(id), {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setOpinions(res.data);
      })
      .catch((err) => setError(err));

  useEffect(() => {
    getProduct(id);
    getOpinions(id);
  }, [id]);

  return (
    <>
      <Flex
        align="center"
        justify={{ base: "center", md: "space-around", xl: "space-between" }}
        direction={{ base: "column-reverse", md: "row" }}
        minH="70vh"
        wrap="no-wrap"
        px="8"
        mb="16"
      >
        <Box
          w={{ base: "80%", sm: "60%", md: "50%" }}
          mb={{ base: 12, md: 0 }}
          ml={{ base: 20, md: 0 }}
          p={{ base: "65px" }}
        >
          <Image src={product.image} size="60%" shadow="2xl" />
        </Box>
        <Stack
          spacing={4}
          w={{ base: "80%", md: "40%" }}
          align={["center", "center", "flex-start", "flex-start"]}
        >
          <Heading
            as="h1"
            size="xl"
            fontWeight="bold"
            color="primary.800"
            textAlign={["center", "center", "left", "left"]}
          >
            {product.name}
          </Heading>
          <HStack>
            <HStack>
              <Heading
                as={product.on_discount ? "s" : "h2"}
                size="xl"
                fontWeight="bold"
                color="primary.800"
                textAlign={["center", "center", "left", "left"]}
              >
                {product.price}$
              </Heading>
              {product.on_discount && (
                <Heading
                  as="h2"
                  size="xl"
                  fontWeight="bold"
                  color="red"
                  textAlign={["center", "center", "left", "left"]}
                >
                  {product.discount_price}$
                </Heading>
              )}
            </HStack>
            <CheckCircleIcon />
            <Text>Dostępny</Text>
          </HStack>
          <Heading
            as="h2"
            size="md"
            color="primary.800"
            opacity="0.8"
            fontWeight="normal"
            lineHeight={1.5}
            textAlign={["center", "center", "left", "left"]}
          >
            {product.description}
          </Heading>
          <Button
            bg="white"
            color="black"
            width="100%"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
            variant="primary"
          >
            Add to cart
          </Button>
          <Button
            bg="black"
            color="white"
            border="2px"
            borderColor="black.800"
            width="100%"
            py="4"
            px="4"
            lineHeight="1"
            size="md"
          >
            Buy now
          </Button>
          <Text
            fontSize="xs"
            mt={2}
            textAlign="center"
            color="primary.800"
            opacity="0.6"
          >
            No credit card required.
          </Text>
        </Stack>
      </Flex>
      {opinions.length > 1 && <OpinionList opinions={opinions} />}
    </>
  );
};

export default ProductDetails;
