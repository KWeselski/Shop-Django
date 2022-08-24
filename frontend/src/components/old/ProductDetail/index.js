import React, { Fragment, useEffect, useState } from "react";
import { productDetailURL, getOpinionsURL } from "../../constants";
import { connect } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import { fetchProductsID } from "../../actions/cartActions";
import { Link, useParams } from "react-router-dom";
import { Button, Text, Grid } from "@chakra-ui/react";
import axios from "axios";
import Opinion from "../Opinion";
import OpinionForm from "../OpinionForm";

const ProductDetail = (props) => {
  const [product, setProduct] = useState([]);
  const [opinions, setOpinions] = useState([]);
  const [error, setError] = useState(null);
  const { productId } = useParams();
  const { classes } = props;

  const addItem = (id) => {
    dispatch(addToCart(id));
  };

  const getProduct = (id) =>
    axios
      .get(productDetailURL(id))
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => setError(err));

  const getOpinions = (id) =>
    axios
      .get(getOpinionsURL(id), {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setOpinions(res.data);
      })
      .catch((err) => setError(err));

  useEffect(() => {
    getProduct(productId);
    getOpinions(productId);
  }, [productId]);

  return (
    product && (
      <Container>
        <Grid item xs={12} md={6} className={classes.Column1}>
          <Image src={product.image} />
          {opinions && <OpinionsContainer opinions={opinions} id={productId} />}
        </Grid>
        <Grid item xs={12} md={6} className={classes.Column2}>
          <ProductContainer
            addItem={addItem}
            className={classes.productItem}
            {...product}
          />
        </Grid>
      </Container>
    )
  );
};

const Image = ({ src }) => (
  <div style={{ maxWidth: "100%", height: "auto" }}>
    <img src={src} style={{ verticalAlign: "middle", width: "100%" }} />
  </div>
);

const Container = ({ children }) => (
  <Grid container xs={12} md={12} style={{ height: "100%", display: "flex" }}>
    <Grid item xs={0} md={2} />
    <Grid container xs={12} md={8}>
      {children}
    </Grid>
    <Grid item xs={0} md={2} />
  </Grid>
);

const OpinionsContainer = ({ opinions, id }) => (
  <div>
    <OpinionForm id={id} exist={false} />
    <Grid container spacing={2}>
      {opinions.map((opinion, index) => {
        return (
          <Grid item xs={12}>
            <Opinion key={index} {...opinion} />
          </Grid>
        );
      })}
    </Grid>
  </div>
);

const ProductContainer = ({
  available,
  description,
  rating,
  name,
  price,
  on_discount,
  discount_price,
  className,
  addItem,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      paddingLeft: 0,
      marginBottom: 0,
    }}
  >
    <div className={className}>
      <Text align="center" variant="h6">
        {name}
      </Text>
    </div>
    <div className={className}>10 Reviews</div>
    <div className={className}>
      {on_discount ? (
        <span>
          <Text align="left" variant="h8">
            Price: {price}$
          </Text>
          <Text align="left" variant="h8">
            <b>Discount price: {discount_price}$</b>
          </Text>
        </span>
      ) : (
        <Text align="left" variant="h8">
          Price: {price}$
        </Text>
      )}
    </div>
    <div className={className}>
      <Text align="justify" variant="h9">
        {available ? "Available" : "Unavailable"}
      </Text>
    </div>
    <div className={className}>
      <Text align="justify" variant="h8">
        {description}
      </Text>
    </div>
    <div id="CartButton">
      <Link to="/cart">
        <Button
          variant="contained"
          disabled={!available}
          onClick={() => {
            addItem(item.id);
          }}
          color="primary"
        >
          Add to Cart
        </Button>
      </Link>
    </div>
  </div>
);

export default ProductDetail;
