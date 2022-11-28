import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineDelete, MdShoppingCart } from 'react-icons/md';
import { connect, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  useToast
} from '@chakra-ui/react';
import { addToCart } from '../components/actions/cartActions';
import { deleteFromWishlistUrl, wishlistUrl } from '../constants';

const ProductBox = ({ items, removeItem, addToCart }) => (
  <Box p={3} bg="white" width="full">
    <Box>
      <Heading>Wishlist ({items.length})</Heading>
      {items.map((item, key) => (
        <Fragment>
          <Box display="flex" mt={5} height="150px" key={key}>
            <Box width={'96px'} alignItems="center">
              <Image src={item.image} width="100%" height="auto" />
            </Box>
            <Box px={2} py={1} width="90%" position="relative">
              <Box display="flex" width="full" height="50%">
                <VStack align="left" width="full">
                  <Text>{item.name}</Text>
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
                    {item.on_discount && (
                      <Text as="b" color="red">
                        {item.discount_price} $
                      </Text>
                    )}
                    <Text as={item.on_discount ? 'del' : 'b'}>
                      {item.price}$
                    </Text>
                  </VStack>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider mt={2.5} />
        </Fragment>
      ))}
    </Box>
  </Box>
);

const Empty = ({ token }) =>
  token ? (
    <Heading>Your wishlist is empty. Add the products you want.</Heading>
  ) : (
    <Heading>You must log in to add products to the wish list</Heading>
  );

const Wishlist = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    axios
      .get(wishlistUrl, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`
        }
      })
      .then(res => {
        setProducts(res.data);
        setDeleted(false);
      })
      .catch(err => setError(err));
  }, [deleted]);

  const removeItem = id => {
    axios
      .put(
        deleteFromWishlistUrl(id),
        {},
        {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
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
        title: 'Added to cart',
        description: name,
        status: 'success',
        duration: 900,
        position: 'top-right',
        isClosable: true
      });
    }
  };

  return (
    <Container maxW="container.xl">
      <Box h="full" w="60%" p={7}>
        {products.length > 0 ? (
          <ProductBox
            items={products}
            removeItem={removeItem}
            addToCart={addItem}
          />
        ) : (
          <Empty token={token} />
        )}
      </Box>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps, null)(Wishlist);
