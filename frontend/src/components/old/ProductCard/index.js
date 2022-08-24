import React, { useState, useEffect } from "react";
import {Button , Box} from '@chakra-ui/react'
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import { compose } from "redux";
import { Link } from "react-router-dom";

const ProductCard = (product) => {
  const [hover, useHover] = useState(false);
  const dispatch = useDispatch();

  const handleHover = () => {
    useHover(!hover);
  };

  const addItem = (id) => {
    dispatch(addToCart(id));
  };

  return <Product handleHover={handleHover} addItem={addItem} {...product} />;
};

const Image = ({ className, image, name }) => {
  return (
    <div>
      <Box
        className={className}
        component={"img"}
        alt="Product"
        height="90"
        image={image}
        title={name}
      />
    </div>
  );
};

const InfoButton = ({ className, children, disabled, onClick }) => {
  return (
    <div className={className}>
      <Button
        disabled={disabled}
        onClick={onClick}
        style={{ height: 20, width: 100 }}
        variant="contained"
        color="primary"
      >
        {children}
      </Button>
    </div>
  );
};

const Content = ({ className, children }) => {
  return <CardContent className={className}>{children}</CardContent>;
};

const Name = ({ id, children }) => {
  return (
    <Link style={{ textDecoration: "none" }} to={`/product/${id}`}>
      <Text color="primary" gutterBottom varian="h5" component="h2">
        {children}
      </Text>
    </Link>
  );
};

const Description = ({ className, children }) => {
  return (
    <div className={className}>
      <Text variant="body" color="textSecondary" component={"p"}>
        {children}
      </Text>
    </div>
  );
};

const Info = ({ category, discount, price }) => {
  return (
    <div>
      <Text variant="body2" color="textSecondary" component="h2">
        {category}
      </Text>
      <Price discount={discount}>{price}</Price>
    </div>
  );
};

const Price = ({ discount, children }) => {
  return discount ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "grey",
          textDecorationLine: "line-through",
        }}
        gutterBottom
        component="h1"
      >
        {children}$
      </Text>
      <Text
        style={{ color: "red" }}
        gutterBottom
        variant="h5"
        component="h6"
      >
        {discount} $
      </Text>
    </div>
  ) : (
    <Text gutterBottom variant="h6" component="h1">
      {children} $
    </Text>
  );
};

const Product = ({
  handleHover,
  addItem,
  available,
  id,
  image,
  name,
  on_discount,
  description,
  price,
  category_name,
  classes,
}) => {
  return (
    <div>
      <div
        className={classes.ProductDiv}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <Content className={classes.ProductInfo}>
          <Image image={image} className={classes.ProductImg} name={name} />
          <Name id={id}>{name}</Name>
          <Description className={classes.CardDescription}>
            {description}
          </Description>
          <Info category={category_name} price={price} discount={on_discount} />
          <InfoButton
            className={classes.ProductContent}
            disabled={!available}
            onClick={() => addItem(id)}
          >
            Add
          </InfoButton>
        </Content>
      </div>
    </div>
  );
};

export default compose(withStyles(styles))(ProductCard);
