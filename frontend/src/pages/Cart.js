import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
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
  IconButton,
  HStack,
  VStack,
  Stack,
  Heading,
  Flex,
  Divider,
  Text,
  Container,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  removeItem,
  addQuantity,
  subtractQuantity,
  orderAdd,
  orderUpdate
} from "../components/actions/cartActions";
import axios from "axios";
import { MdFavorite, MdOutlineDelete } from "react-icons/md";

const CartBox = ({ total }) =>
  <Box
    p={5}
    width="full"
    align="center"
    border="2px"
    borderColor="black"
    minWidth="280px"
    bg="white"
  >
    <Box align="left">
      <Heading>To pay</Heading>
      <Box display="flex" width="100%" mt={10} justifyContent="space-between">
        <Text>Products value:</Text>
        <Text>
          {total} $
        </Text>
      </Box>
      <Box display="flex" width="100%" mt={4} justifyContent="space-between">
        <Text>Delivery:</Text>
        <Text>5.00 $</Text>
      </Box>
      <Divider mt={5} />
      <Box display="flex" width="100%" mt={4} justifyContent="space-between">
        <Text as="b">Total:</Text>
        <Text as="b">5.00 $</Text>
      </Box>
    </Box>
    <Button m={4} colorScheme="orange">
      Proceed to checkout
    </Button>
  </Box>;

const ProductBox = ({ items, removeItem }) =>
  <Box p={3} bg="white" width="full">
    <Box>
      <Heading>
        Products ({items.length})
      </Heading>
      {items.map((item, key) =>
        <Fragment>
          <Box display="flex" mt={5} height="150px">
            <Box width={"96px"} alignItems="center">
              <Image src={item.image} width="100%" height="auto" />
            </Box>
            <Box px={2} py={1} width="90%" position="relative">
              <Box display="flex" width="full" height="50%">
                <VStack align="left" width="full">
                  <Text>
                    {item.name}
                  </Text>
                  <Text>Rozmiar: 43</Text>
                </VStack>
                <Box width="25%">
                  <NumberInput
                    value={item.quantity}
                    max={10}
                    clampValueOnBlur={false}
                    size="sm"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
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
                    size="sm"
                    variant="link"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </Button>
                  <Button leftIcon={<MdFavorite />} size="sm" variant="link">
                    Add to favorite
                  </Button>
                </Stack>
                <Box width="full" position="relative">
                  <VStack position="absolute" bottom={0} right={0}>
                    <Text as="b">
                      {item.discount_price} $
                    </Text>
                    <Text as="b">
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

const Cart = ({ addQuantity, items, removeItem, subtractQuantity, total }) => {
  return (
    <Container maxW="container.xl">
      <Box h="full" w="full" py={5} px={3}>
        <Flex h="100vh" p={15}>
          <VStack h="full" w="65%" p={2} spacing={5} alignItems="flex-start">
            <ProductBox
              items={items}
              addQuantity={addQuantity}
              substractQuantity={subtractQuantity}
              removeItem={removeItem}
            />
          </VStack>
          <VStack h="full" w="35%" p={10} spacing={10} alignItems="center">
            <CartBox total={total} />
          </VStack>
        </Flex>
      </Box>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    items: state.cart.addedItems,
    total: state.cart.total,
    discount: state.cart.discount,
    ordered: state.cart.ordered
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addQuantity: id => {
      dispatch(addQuantity(id));
    },
    subtractQuantity: id => {
      dispatch(subtractQuantity(id));
    },
    removeItem: id => {
      dispatch(removeItem(id));
    },
    addOrder: addedItems => {
      dispatch(orderAdd(addedItems));
    },
    updateOrder: addedItems => {
      dispatch(orderUpdate(addedItems));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
