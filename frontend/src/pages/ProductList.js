import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  AspectRatio,
  Box,
  Center,
  Container,
  Image,
  ScaleFade,
  SimpleGrid,
  Stack,
  Text
} from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import { productListByCategoryURL } from '../constants';

const formatBannerImage = id =>
  ({
    ['bracelets']: `/static/images/banners/bracelets.jpg`,
    ['discount']: `/static/images/banners/discount.jpg`,
    ['earings']: `/static/images/banners/earrings.jpg`,
    ['necklaces']: `/static/images/banners/necklaces.jpg`,
    ['rings']: `/static/images/banners/rings.jpg`,
    ['watches']: `/static/images/banners/watches.jpg`
  }[id]);

const formatBannerLabel = id =>
  ({
    ['bracelets']: ``,
    ['discount']: `All products at a promotional price`,
    ['earings']: `Earrings designed and made in a Polish studio. They have beautiful gemstones that will enrich your beauty`,
    ['necklaces']: `Necklaces designed and made in a Polish studio. They have beautiful gemstones that will enrich your beauty`,
    ['rings']: `Beautiful rings with diamonds and gemstones will perfectly reflect your style.`,
    ['watches']: `Elegant, classic, and well-crafted, we’ve built our entire legacy on offering some of the best watches. Our best-selling watches are a must-have for anyone looking to make a sophisticated statement with a timepiece you can not only rely on, but also wear with comfort and ease throughout the day. `
  }[id]);

const ProductBanner = ({ id }) => (
  <ScaleFade key={id} initialScale={0.9} in>
    <Stack position="relative" h="300px" mt={15} direction={'column-reverse'}>
      <AspectRatio
        position="absolute"
        width="100%"
        h="300px"
        ratio={16 / 9}
        top={0}
        left={0}
        zIndex={-2}
      >
        <Image src={formatBannerImage(id)} objectFit="cover" />
      </AspectRatio>
      <Box padding={10} zIndex={-1} textAlign="center">
        <Text as="b" color="white" textShadow="black 2px 2px" fontSize="18px">
          {formatBannerLabel(id)}
        </Text>
      </Box>
    </Stack>
  </ScaleFade>
);

const ProductList = () => {
  let { id } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(productListByCategoryURL(id))
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => setError(err));
  }, [id]);

  return (
    <Container width="100%" maxW={'7xl'}>
      <ProductBanner id={id} />
      {products.length > 0 || error ? (
        <SimpleGrid columns={[1, 2, 3, 4]} mt={6} spacing={1}>
          {products.map((product, index) => {
            return (
              <Center>
                <ProductCard key={index} {...product} />
              </Center>
            );
          })}
        </SimpleGrid>
      ) : (
        <p>XYZ</p>
      )}
    </Container>
  );
};

export default ProductList;
