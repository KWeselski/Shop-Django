import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { connect, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircleIcon } from '@chakra-ui/icons';
import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  VStack,
  useToast
} from '@chakra-ui/react';
import {
  addToWishlistUrl,
  deleteFromWishlistUrl,
  getOpinionsURL,
  productDetailURL
} from '../../constants';
import OpinionList from '../OpinionList';
import { addToCart } from '../actions/cartActions';

const ProductDetails = ({ cartItems, token }) => {
  const [product, setProduct] = useState([]);
  const [opinions, setOpinions] = useState([]);
  const [error, setError] = useState(null);
  const [onWishlist, setOnWishlist] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const addItem = id => {
    if (cartItems.some(item => item.id === parseInt(id))) {
      toast({
        title: 'Product already in cart',
        description: product.name,
        status: 'error',
        duration: 900,
        position: 'top-right',
        isClosable: true
      });
    } else {
      dispatch(addToCart(id));
      toast({
        title: 'Added to cart',
        description: product.name,
        status: 'success',
        duration: 900,
        position: 'top-right',
        isClosable: true
      });
    }
  };

  const getProduct = id =>
    axios
      .get(productDetailURL(id), {
        headers: { Authorization: token }
      })
      .then(res => {
        setProduct(res.data);
      })
      .catch(err => setError(err));

  const getOpinions = id =>
    axios
      .get(getOpinionsURL(id), {
        headers: { Authorization: token }
      })
      .then(res => {
        setOpinions(res.data);
      })
      .catch(err => setError(err));

  const addToWishlist = id =>
    axios
      .put(
        addToWishlistUrl(id),
        {},
        {
          headers: { Authorization: token }
        }
      )
      .then(res => {
        setOnWishlist(true);
      });

  const deleteFromWishlist = id => {
    axios
      .put(
        deleteFromWishlistUrl(id),
        {},
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => {
        setOnWishlist(false);
      });
  };

  const order = id => {
    addItem(id);
    navigate('/order');
  };

  useEffect(() => {
    getProduct(id);
    getOpinions(id);
  }, [onWishlist]);

  return (
    <Fragment>
      <Flex
        align="center"
        direction={{ base: 'column', md: 'row' }}
        minH="70vh"
        p={{ base: '2', sm: '16' }}
        mb={{ base: '2', sm: '16' }}
      >
        <Box
          w={{ base: '100%', sm: '60%', md: '50%' }}
          p={{ base: '20px', md: '65px' }}
          alignItems="center"
        >
          <AspectRatio ratio={4 / 3}>
            <Image
              src={product.image}
              size={{ base: '100%', sm: '60%' }}
              maxH="600px"
              shadow="2xl"
              m="auto"
            />
          </AspectRatio>
        </Box>
        <Stack
          spacing={4}
          w={{ base: '80%', md: '40%' }}
          align={['center', 'center', 'flex-start', 'flex-start']}
        >
          <Heading
            as="h1"
            size="xl"
            fontWeight="bold"
            color="primary.800"
            textAlign={['center', 'center', 'left', 'left']}
          >
            {product.name}
          </Heading>
          <HStack>
            <HStack>
              <Heading
                as={product.on_discount ? 's' : 'h2'}
                size="xl"
                fontWeight="bold"
                color="primary.800"
                textAlign={['center', 'center', 'left', 'left']}
              >
                {product.price}$
              </Heading>
              {product.on_discount && (
                <Heading
                  as="h2"
                  size="xl"
                  fontWeight="bold"
                  color="red"
                  textAlign={['center', 'center', 'left', 'left']}
                >
                  {product.discount_price}$
                </Heading>
              )}
            </HStack>
            <CheckCircleIcon />
            <Text>Available</Text>
          </HStack>
          <Heading
            as="h2"
            size="md"
            color="primary.800"
            opacity="0.8"
            fontWeight="normal"
            lineHeight={1.5}
            textAlign={['center', 'center', 'left', 'left']}
          >
            {product.description}
          </Heading>
          <Button
            color="black"
            width="100%"
            p="4"
            lineHeight="1"
            size="md"
            variant="primary"
            onClick={() => addItem(id)}
          >
            Add to cart
          </Button>
          <HStack width="100%">
            <Button
              width="100%"
              p="4px"
              lineHeight="1"
              size="md"
              variant="secondary"
              onClick={() => order(id)}
            >
              Buy now
            </Button>
            {product.in_wishlist ? (
              <IconButton onClick={() => deleteFromWishlist(product.id)}>
                <MdFavorite />
              </IconButton>
            ) : (
              <IconButton
                onClick={() =>
                  token ? addToWishlist(product.id) : navigate('/sign')
                }
              >
                <MdFavoriteBorder />
              </IconButton>
            )}
          </HStack>
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
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    cartItems: state.cart.addedItems,
    token: state.auth.token
  };
};

export default connect(mapStateToProps, null)(ProductDetails);
