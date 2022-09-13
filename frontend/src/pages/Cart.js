import React, { useEffect, useState } from "react";
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

const ProductBox = ({ items }) =>
  <Box p={3} bg="white" width="full">
    <Box>
      <Heading>Products (1)</Heading>
      <Box display="flex" mt={5}>
        <Box width={"96px"}>
          <Image
            src="\static\images\products\black-lace-choker.jpg"
            width="100%"
            height="auto"
          />
        </Box>
        <Box px={2} py={1} width="90%" position="relative">
          <Box display="flex" width="full" height="50%">
            <VStack align="left" width="full">
              <Text>Piersionek CZAKALAKA</Text>
              <Text>Rozmiar: 43</Text>
            </VStack>
            <Box width="25%">
              <NumberInput
                defaultValue={1}
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
            <Stack direction="row" spacing={4} position="absolute" bottom={0}>
              <Button leftIcon={<MdOutlineDelete />} size="sm" variant="link">
                Remove
              </Button>
              <Button leftIcon={<MdFavorite />} size="sm" variant="link">
                Add to favorite
              </Button>
            </Stack>
            <Box width="full" position="relative">
              <VStack position="absolute" bottom={0} right={0}>
                <Text>
                  <b>500 $</b>
                </Text>
                <Text>
                  <b>500 $</b>
                </Text>
              </VStack>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider mt={2.5} />
      <Box display="flex" mt={5}>
        <Box width={"96px"}>
          <Image
            src="\static\images\products\black-lace-choker.jpg"
            width="100%"
            height="auto"
          />
        </Box>
        <Box px={2} py={1} width="90%" position="relative">
          <Box display="flex" width="full" height="50%">
            <VStack align="left" width="full">
              <Text>Piersionek CZAKALAKA</Text>
              <Text>Rozmiar: 43</Text>
            </VStack>
            <Box width="25%">
              <NumberInput
                defaultValue={1}
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
            <Stack direction="row" spacing={4} position="absolute" bottom={0}>
              <Button leftIcon={<MdOutlineDelete />} size="sm" variant="link">
                Remove
              </Button>
              <Button leftIcon={<MdFavorite />} size="sm" variant="link">
                Add to favorite
              </Button>
            </Stack>
            <Box width="full" position="relative">
              <VStack position="absolute" bottom={0} right={0}>
                <Text>
                  <b>500 $</b>
                </Text>
                <Text>
                  <b>500 $</b>
                </Text>
              </VStack>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider mt={2.5} />
    </Box>
  </Box>;

const Cart = ({ addQuantity, items, removeItem, subtractQuantity, total }) => {
  return (
    <Container maxW="container.xl">
      <Box h="full" w="full" py={5} px={3}>
        <Flex h="100vh" p={15}>
          <VStack h="full" w="65%" p={2} spacing={5} alignItems="flex-start">
            <ProductBox items={items} />
          </VStack>
          <VStack h="full" w="35%" p={10} spacing={10} alignItems="center">
            <CartBox total={total} />
          </VStack>
        </Flex>
      </Box>
    </Container>
    // <Grid templateColumns="repeat(3, 1fr)">
    //   <GridItem width="10%" />
    //   <GridItem width="100%">
    //     <Table colorScheme="black" overflow="none" variant="striped">
    //       <Thead>
    //         <Tr>
    //           <Th width="120" />
    //           <Th>Product</Th>
    //           <Th>Price</Th>
    //           <Th>Quantity</Th>
    //           <Th>Total price</Th>
    //           <Th />
    //         </Tr>
    //       </Thead>
    //       <Tbody>
    //         {items.map(product =>
    //           <Tr key={product.id}>
    //             <Td>
    //               <Image src={product.image} backgroundSize="cover" />
    //             </Td>
    //             <Td>
    //               <Link to={`/product/${product.id}`}>
    //                 <b>
    //                   {product.name}
    //                 </b>
    //               </Link>
    //             </Td>
    //             <Td>
    //               {product.price}
    //             </Td>
    //             <Td>
    //               {product.quantity}
    //             </Td>
    //             <Td>
    //               {total}
    //             </Td>
    //             <Td>
    //               <HStack>
    //                 <VStack>
    //                   <IconButton
    //                     icon={<MdArrowDropUp />}
    //                     onClick={() => addQuantity(product.id)}
    //                   />
    //                   <IconButton
    //                     icon={<MdArrowDropDown />}
    //                     onClick={() => subtractQuantity(product.id)}
    //                   />
    //                 </VStack>
    //                 <IconButton
    //                   icon={<MdOutlineDelete />}
    //                   onClick={() => removeItem(product.id)}
    //                 />
    //               </HStack>
    //             </Td>
    //           </Tr>
    //         )}
    //       </Tbody>
    //     </Table>
    //   </GridItem>
    //   <GridItem m="20px" width="100%">
    //     <CartBox total={total} />
    //   </GridItem>
    // </Grid>
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
