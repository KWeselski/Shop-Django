import React from "react";
import {
  Button,
  Flex,
  Container,
  ButtonGroup,
  Box,
  Image,
  HStack,
  Text,
  chakra,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";
import { ChatIcon, SearchIcon, SettingsIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const labels = [
  "RINGS",
  "NECKLACES",
  "WATCHES",
  "CHOKERS",
  "EARINGS",
  "BRACELETS",
];

const NavigationBar = () => (
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
                <Text as="i" fontSize="4xl">
                  Valeé
                </Text>
                <HStack>
                  <IconButton icon={<SettingsIcon />}></IconButton>
                  <IconButton icon={<ChatIcon />}></IconButton>
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
              <ButtonGroup variant='link' spacing="8">
                {labels.map((item) => (
                  <Link to={`/category/${item.toLowerCase()}`}>
                    <Button color="white" key={item}>
                      {item}
                    </Button>
                  </Link>
                ))}
              </ButtonGroup>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  </Box>
);

export default NavigationBar;
