import React from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import {
  AspectRatio,
  Center,
  Icon,
  Image,
  Stack,
  Text
} from '@chakra-ui/react';

const ProductCard = ({
  id,
  name,
  price,
  on_discount,
  discount_price,
  image
}) => {
  return (
    <Stack w="250px">
      <Stack position="relative">
        <AspectRatio h="200px" ratio={4 / 3}>
          <Image src={image} objectFit="cover" borderRadius={8} alt="product" />
        </AspectRatio>
        <Icon
          w={6}
          h={6}
          position="absolute"
          top={2}
          right={4}
          as={MdFavoriteBorder}
        />
      </Stack>
      <Center>
        <Link to={`/product/${id}`}>
          <Text as="b" noOfLines={1}>
            {name}
          </Text>
        </Link>
      </Center>
      <Stack direction="row" justifyContent={'center'}>
        {on_discount && (
          <Text as="b" color="red">
            ${discount_price}
          </Text>
        )}
        <Text as={on_discount ? 'del' : 'b'}>${price}</Text>
      </Stack>
    </Stack>
  );
};

export default ProductCard;
