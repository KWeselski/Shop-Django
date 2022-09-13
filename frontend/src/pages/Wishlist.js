import React, { useEffect, useState } from "react";
import { Image, Table, Thead, Tbody, Tr, Th, Td, Button, Box, Grid, GridItem } from "@chakra-ui/react";
import { wishlistUrl } from "../constants";
import {Link} from 'react-router-dom'
import axios from "axios";

const Wishlist = () => {
    const [products, setProducts] = useState([])
    const [error , setError] = useState(null)

    useEffect(() => {
        axios
        .get(wishlistUrl, {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          })
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => setError(err));
    }, [])

    return (
      <Grid templateColumns='repeat(3, 1fr)'>
        <GridItem width="10%"/>
        <GridItem width={'70%'}>
        <Table colorScheme="black" overflow="none" variant="striped">
             <Thead>
                <Tr>
                <Th width="120"/>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th/>
                </Tr>
             </Thead>
             <Tbody>
                {products.map((product) => (
                    <Tr key={product.id} >
                        <Td pd="2" >
                           <Image src={product.image} backgroundSize="cover"/>
                        </Td>
                        <Td><Link to={`/product/${product.id}`}>{product.name}</Link></Td>
                        <Td>{product.price}</Td>
                        <Box>
                            <Button>Add to Cart</Button>  
                            <Button>Delete</Button> 
                         </Box>
                    </Tr>
                ))}
             </Tbody>
            </Table>
            </GridItem>
            <GridItem width="10%"/>
            </Grid>
    )
}

export default Wishlist