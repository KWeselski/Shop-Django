import React, { Fragment } from 'react';
import { CardNumberElement } from '@stripe/react-stripe-js';
import { MdFavorite, MdOutlineDelete } from 'react-icons/md';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AspectRatio,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Select,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react';
import {
  addQuantity,
  orderAdd,
  orderUpdate,
  removeItem,
  subtractQuantity
} from '../components/actions/cartActions';

const CartBox = ({ items, total, totalWithDelivery }) => (
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
        <Text>Products value</Text>
        <Text>{total} $</Text>
      </Box>
      <Box display="flex" width="100%" mt={4} justifyContent="space-between">
        <Text>Delivery:</Text>
        <Text>5.00 $</Text>
      </Box>
      <Divider mt={5} />
      <Box display="flex" width="100%" mt={4} justifyContent="space-between">
        <Text as="b">Total:</Text>
        <Text as="b">{totalWithDelivery} $</Text>
      </Box>
    </Box>
    <Link to={'/order/'}>
      <Button m={4} colorScheme="orange" disabled={items < 1}>
        Proceed to checkout
      </Button>
    </Link>
  </Box>
);

const Empty = () => (
  <Box textAlign="center">
    <Text fontSize="4xl">Your cart is empty</Text>
    <Text fontSize="2xl">Add some products.</Text>
  </Box>
);

const ProductBox = ({ items, removeItem }) => (
  <Box p={3} bg="white" width="full">
    {items.map((item, key) => (
      <>
        <Stack direction={'row'} mt={5} minH="120px" key={key}>
          <AspectRatio w="160px" h="120px" ratio={4 / 3}>
            <Image src={item.image} borderRadius={8} objectFit="cover" />
          </AspectRatio>
          <Stack width="100%" justifyContent="space-between">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems={'flex-start'}
            >
              <Stack>
                <Text as="b">{item.name}</Text>
                <Text>Size: 43</Text>
              </Stack>
              <Stack direction="row" alignItems="right">
                {item.on_discount && (
                  <Text as="b" color="red">
                    ${item.discount_price}
                  </Text>
                )}
                <Text as={item.on_discount ? 'del' : 'b'}>${item.price}</Text>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Select w="20" size="sm">
                <option value="1">1</option>
                <option value="1">2</option>
                <option value="1">3</option>
              </Select>
              <Stack direction={'row'}>
                <IconButton
                  icon={<MdOutlineDelete />}
                  size="md"
                  variant="ghost"
                  onClick={() => removeItem(item.id)}
                />
                <IconButton
                  icon={<MdFavorite />}
                  onClick={() => addToWishlist(product.id)}
                  size="md"
                  variant="ghost"
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Divider mt={2.5} />
      </>
    ))}
  </Box>
);

const Cart = ({ addQuantity, items, removeItem, subtractQuantity, total }) => {
  return (
    <Container maxW="container.xl">
      <Box h="full" w="full" p={5}>
        <Flex h={{ xl: '100vh' }} direction={{ base: 'column', md: 'row' }}>
          <VStack
            h="full"
            w={{ xl: '65%', sm: '100%' }}
            p={2}
            spacing={5}
            alignItems="flex-start"
          >
            {items.length > 0 ? (
              <ProductBox
                items={items}
                addQuantity={addQuantity}
                substractQuantity={subtractQuantity}
                removeItem={removeItem}
              />
            ) : (
              <Empty />
            )}
          </VStack>
          <VStack
            h="full"
            w={{ xl: '35%', md: '35%', sm: '100%' }}
            p={10}
            spacing={10}
            alignItems="center"
          >
            <CartBox total={total} items={items.length} />
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
    totalWithDelivery: state.cart.totalWithDelivery
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addOrder: addedItems => {
      dispatch(orderAdd(addedItems));
    },
    addQuantity: id => {
      dispatch(addQuantity(id));
    },
    subtractQuantity: id => {
      dispatch(subtractQuantity(id));
    },
    removeItem: id => {
      dispatch(removeItem(id));
    },
    updateOrder: addedItems => {
      dispatch(orderUpdate(addedItems));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
