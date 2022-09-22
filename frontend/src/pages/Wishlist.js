import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Grid,
  GridItem,
  useToast
} from "@chakra-ui/react";
import { deleteFromWishlistUrl, wishlistUrl } from "../constants";
import { Link } from "react-router-dom";
import axios from "axios";
import { addToCart } from "../components/actions/cartActions";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(
    () => {
      axios
        .get(wishlistUrl, {
          headers: {
            Authorization: `${localStorage.getItem("token")}`
          }
        })
        .then(res => {
          setProducts(res.data);
          setDeleted(false);
        })
        .catch(err => setError(err));
    },
    [deleted]
  );

  const deleteItem = id => {
    axios
      .put(
        deleteFromWishlistUrl(id),
        {},
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`
          }
        }
      )
      .then(res => {
        setDeleted(res.data);
      });
  };

  const addItem = (name, id) => {
    {
      dispatch(addToCart(id));
      toast({
        title: "Added to cart",
        description: name,
        status: "success",
        duration: 900,
        position: "top-right",
        isClosable: true
      });
      deleteItem(id);
    }
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)">
      <GridItem width="10%" />
      <GridItem width={"70%"}>
        <Table colorScheme="black" overflow="none" variant="striped">
          <Thead>
            <Tr>
              <Th width="120" />
              <Th>Name</Th>
              <Th>Price</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {products.map(product =>
              <Tr key={product.id}>
                <Td pd="2">
                  <Image src={product.image} backgroundSize="cover" />
                </Td>
                <Td>
                  <Link to={`/product/${product.id}`}>
                    {product.name}
                  </Link>
                </Td>
                <Td>
                  {product.price}
                </Td>
                <Box>
                  <Button onClick={() => addItem(product.name, product.id)}>
                    Add to Cart
                  </Button>
                  <Button onClick={() => deleteItem(product.id)}>Delete</Button>
                </Box>
              </Tr>
            )}
          </Tbody>
        </Table>
      </GridItem>
      <GridItem width="10%" />
    </Grid>
  );
};

export default Wishlist;
