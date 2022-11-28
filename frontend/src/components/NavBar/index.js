import React from 'react';
import {
  MdFavorite,
  MdOutlinePersonOutline,
  MdShoppingCart
} from 'react-icons/md';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Circle,
  Container,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text
} from '@chakra-ui/react';

const labels = ['RINGS', 'NECKLACES', 'WATCHES', 'EARINGS', 'DISCOUNT'];

const AnnoucmentBar = () => (
  <Box bg="black" h={{ sm: '40px', md: '30px' }} p={2}>
    <Container width="100%" maxW={'7xl'}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        justifyContent={{ base: 'center', md: 'space-between' }}
      >
        <Text color="white">BUY 3 PRODUCTS, 1 FREE</Text>
        <Text color="white">FREE DELIVERY ABOVE $100</Text>
        <Text color="white">SHOP NOW, PAY LATER</Text>
      </Stack>
    </Container>
  </Box>
);

const CategoriesBar = () => (
  <Box bg="black" h={{ sm: '54px', md: '40px' }} p={2}>
    <Container width="100%" maxW={'7xl'} centerContent>
      <ButtonGroup
        variant="link"
        spacing="8"
        display={['none', 'none', 'flex', 'flex']}
      >
        {labels.map(item => (
          <Link to={`/category/${item.toLowerCase()}`}>
            <Button color="white" key={item} _hover={{ color: 'gray' }}>
              {item}
            </Button>
          </Link>
        ))}
      </ButtonGroup>
      <IconButton
        aria-label="Open Menu"
        size="md"
        mr={2}
        icon={<HamburgerIcon />}
        display={['flex', 'flex', 'none', 'none']}
      />
    </Container>
  </Box>
);

const Header = ({ cartItemsCount }) => (
  <Container width="100%" maxW={'7xl'}>
    <Flex justifyContent="space-between">
      <Link to={`/`}>
        <Text as="i" fontSize="4xl">
          Valeé
        </Text>
      </Link>
      <HStack>
        <Link to={`/wishlist/`}>
          <IconButton icon={<MdFavorite />} />
        </Link>
        <Link to={`/cart/`}>
          <Button w="40px">
            <Flex
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <MdShoppingCart />
              {cartItemsCount > 0 && (
                <Circle
                  size="1rem"
                  bg="tomato"
                  fontSize="10px"
                  color="white"
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0
                  }}
                >
                  {cartItemsCount}
                </Circle>
              )}
            </Flex>
          </Button>
        </Link>
        <Link to={`/sign/`}>
          <IconButton icon={<MdOutlinePersonOutline />} />
        </Link>
      </HStack>
    </Flex>
  </Container>
);

const NavigationBar = props => (
  <Box as="nav">
    <AnnoucmentBar />
    <Header {...props} />
    <CategoriesBar />
  </Box>
);

const mapStateToProps = state => {
  return {
    cartItemsCount: state.cart.addedItems.length
  };
};

export default connect(mapStateToProps, null)(NavigationBar);
