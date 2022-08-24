import React from "react";
import { Box, Container, Image, useColorModeValue } from "@chakra-ui/react";

const ImageBar = () => (
  <Box
    as="image"
    bg="bg-surface"
    boxShadow={useColorModeValue("sm", "sm-dark")}
    py="2px"
  >
    <Box boxSizing="border-box" px="20">
      <Image
        height="780px"
        width="100%"
        objectFit="contain"
        src="\static\images\sale.png"
      />
    </Box>
  </Box>
);

export default ImageBar;
