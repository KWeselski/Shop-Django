import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Flex,
  Container,
  ButtonGroup,
  Box,
  Image,
  HStack,
  Text,
  IconButton,
  useColorModeValue,
  Input,
  Icon,
  Circle
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  MdFavorite,
  MdShoppingCart,
  MdOutlinePersonOutline
} from "react-icons/md";

import { Link } from "react-router-dom";

const labels = [
  "RINGS",
  "NECKLACES",
  "WATCHES",
  "CHOKERS",
  "EARINGS",
  "BRACELETS"
];

const NavigationBar = ({ cartItems }) =>
  <Box as="section">
    <Box
      as="nav"
      bg="bg-surface"
      boxShadow={useColorModeValue("sm", "sm-dark")}
    >
      <Box>
        <Box>
          <Box px="6" py="2">
            <Container maxW="1200px">
              <Flex flex="1" justifyContent="space-between">
                <Box display="flex" py="2">
                  <IconButton
                    aria-label="Search database"
                    icon={<SearchIcon />}
                  />
                  <Input placeholder="Wyszukaj produkt" />
                </Box>
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
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <MdShoppingCart />
                        {cartItems.length > 0 &&
                          <Circle
                            size="1rem"
                            bg="tomato"
                            fontSize="10px"
                            color="white"
                            style={{
                              position: "absolute",
                              top: 0,
                              right: 0
                            }}
                          >
                            {cartItems.length}
                          </Circle>}
                      </Flex>
                    </Button>
                  </Link>
                  <Link to={`/sign/`}>
                    <IconButton icon={<MdOutlinePersonOutline />} />
                  </Link>
                </HStack>
              </Flex>
            </Container>
          </Box>
        </Box>
      </Box>
      <Box bgColor="black">
        <Container py={{ base: "2", lg: "1" }}>
          <Flex justify="space-between" flex="1">
            <HStack spacing="12" justify="space-between">
              <ButtonGroup variant="link" spacing="8">
                {labels.map(item =>
                  <Link to={`/category/${item.toLowerCase()}`}>
                    <Button color="white" key={item}>
                      {item}
                    </Button>
                  </Link>
                )}
              </ButtonGroup>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  </Box>;

const mapStateToProps = state => {
  return {
    cartItems: state.cart.addedItems
  };
};

export default connect(mapStateToProps, null)(NavigationBar);
