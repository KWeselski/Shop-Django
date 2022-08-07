import React, { useState, useEffect } from "react";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { withStyles } from "@material-ui/styles";
import { compose } from "redux";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  ProductDiv: {
    height: 300,
    width: 240,
    transition: "transform 1s",
    transformStyle: "preserve-3d",
    cursor: "pointer",
    position: "relative",
    zIndex: 0,
    border: "1px solid black",
    "& h1, h2": {
      textAlign: "center",
      fontFamily: "'Crimson Text', sans-serif",
    },
    "&:hover": {
      transition: "all 0.7s",
      backgroundColor: "rgba(77,77,77,0.5)",
    },
    "&:hover $ProductInfo": {
      opacity: 1,
    },
    "&:hover $ProductContent": {
      opacity: 1,
    },
    "&:hover $CardDescription": {
      opacity: 0,
    },
  },
  ProductInfo: {
    opacity: 1,
  },
  ProductContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ProductImg: {
    height: 160,
    "& img": {
      objectFit: "contain",
      width: 100,
    },
  },
  CardDescription: {
    margin: "10% 5% 5% 5%",
    textIndent: "1.5em",
    position: "absolute",
    height: "100%",
    opacity: "0",
    "& p": {
      color: "black",
      textAlign: "center",
    },
  },
  CardContent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
});

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

const Image = (children, ...restProps) => {
  return (
    <div>
      <CardMedia
        className={classes.ProductImg}
        component={"img"}
        alt="Product"
        height="90"
        image={image}
        title={this.props.temp.name}
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
      <Typography color="primary" gutterBottom varian="h5" component="h2">
        {children}
      </Typography>
    </Link>
  );
};

const Description = ({ className, children }) => {
  return (
    <div className={className}>
      <Typography variant="body" color="textSecondary" component={"p"}>
        {children}
      </Typography>
    </div>
  );
};

const Info = ({ category, discount, price }) => {
  return (
    <div>
      <Typography variant="body2" color="textSecondary" component="h2">
        {category}
      </Typography>
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
      <Typography
        style={{
          color: "grey",
          textDecorationLine: "line-through",
        }}
        gutterBottom
        component="h1"
      >
        {children}$
      </Typography>
      <Typography
        style={{ color: "red" }}
        gutterBottom
        variant="h5"
        component="h6"
      >
        {discount} $
      </Typography>
    </div>
  ) : (
    <Typography gutterBottom variant="h6" component="h1">
      {children} $
    </Typography>
  );
};

const Product = ({
  handleHover,
  addItem,
  available,
  id,
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
