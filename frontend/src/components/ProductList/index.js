import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import ProductCard from "../ProductCard";
import { productListURL } from "../constants";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(productListURL)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => setError(err));
  }, []);

  return (
    <Grid
      container
      spacing={1}
      style={{ marginTop: 10, justifyContent: "center" }}
    >
      {products.map((product, index) => {
        return (
          <Grid item>
            <ProductCard key={index} {...product} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProductList;
