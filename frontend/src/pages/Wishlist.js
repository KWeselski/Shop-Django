import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Heading,
  Image,
  Button,
  Box,
  Stack,
  Text,
  Divider,
  VStack,
  useToast,
  Container
} from "@chakra-ui/react";
import { deleteFromWishlistUrl, wishlistUrl } from "../constants";
import axios from "axios";
import { addToCart } from "../components/actions/cartActions";
import { MdShoppingCart, MdOutlineDelete } from "react-icons/md";

const ProductBox = ({ items, removeItem, addToCart }) =>
  <Box p={3} bg="white" width="full">
    <Box>
      <Heading>
        Wishlist ({items.length}){" "}
      </Heading>
      {items.map((item, key) =>
        <Fragment>
          <Box display="flex" mt={5} height="150px" key={key}>
            <Box width={"96px"} alignItems="center">
              <Image src={item.image} width="100%" height="auto" />
            </Box>
            <Box px={2} py={1} width="90%" position="relative">
              <Box display="flex" width="full" height="50%">
                <VStack align="left" width="full">
                  <Text>
                    {item.name}
                  </Text>
                  <Text>Size: 43</Text>
                </VStack>
              </Box>
              <Box width="full" display="flex" height="50%">
                <Stack
                  direction="row"
                  spacing={4}
                  position="absolute"
                  bottom={0}
                >
                  <Button
                    leftIcon={<MdOutlineDelete />}
                    size="md"
                    variant="ghost"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </Button>
                  <Button
                    leftIcon={<MdShoppingCart />}
                    onClick={() => addToCart(item.name, item.id)}
                    size="md"
                    variant="ghost"
                  >
                    Add to cart
                  </Button>
                </Stack>
                <Box width="full" position="relative">
                  <VStack position="absolute" bottom={0} right={0}>
                    {item.on_discount &&
                      <Text as="b" color="red">
                        {item.discount_price} $
                      </Text>}
                    <Text as={item.on_discount ? "del" : "b"}>
                      {item.price}$
                    </Text>
                  </VStack>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider mt={2.5} />
        </Fragment>
      )}
    </Box>
  </Box>;

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

  const removeItem = id => {
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
    }
  };

  const Empty = () =>
    <Heading>Your wishlist is empty. Add the products you want.</Heading>;

  return (
    <Container maxW="container.xl">
      <Box h="full" w="60%" p={7}>
        {products.length > 1
          ? <ProductBox
              items={products}
              removeItem={removeItem}
              addToCart={addItem}
            />
          : <Empty />}
      </Box>
    </Container>
  );
};

export default Wishlist;
