import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  TextField,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@chakra-ui/react";
import {
  removeItem,
  addQuantity,
  subtractQuantity,
  orderAdd,
  orderUpdate
} from "../../../actions/cartActions";

import { compose } from "redux";
import { failAddOrder } from "../../../actions/cartActions";

// const styles = (theme) => ({
//   tableCellImage: {
//     width: 60,
//     height: 60,
//     display: "none",
//     [theme.breakpoints.up("sm")]: {
//       display: "block",
//     },
//     [theme.breakpoints.up("md")]: {
//       display: "block",
//     },
//   },
//   tableCell: {
//     width: 60,
//     [theme.breakpoints.up("sm")]: {
//       width: 160,
//     },
//     [theme.breakpoints.up("md")]: {
//       width: 160,
//     },
//   },
//   totalPayTypography: {
//     width: "100%",
//     marginTop: "15%",
//   },
// });

const Cart = ({ items, classes, isAuthenticated }) => {
  const dispatch = useDispatch();

  const makeOrder = addedItems => dispatch(failAddOrder(addedItems));
  const change = event => {};

  return (
    items &&
    <ItemTable>
      {items.map((item, index) => {
        return <ItemRow classes={classes} key={index} {...item} />;
      })}
    </ItemTable>
  );
};

const TableCellLabels = ["", "Product", "Price", "Quantity", "Total price"];

const ItemTable = ({ children }) =>
  <TableContainer>
    <TableHead>
      <TableRow>
        {TableCellLabels.map((label, index) =>
          <TableCell align="right">
            {label}
          </TableCell>
        )}
      </TableRow>
    </TableHead>
    <TableBody>
      {children}
    </TableBody>
  </TableContainer>;

const ItemRow = ({ id, name, classes, price, quantity, image }) => {
  const dispatch = useDispatch();
  const removeItem = id => dispatch(removeItem(id));
  const addQuantity = id => dispatch(addQuantity(id));
  const substractQuantity = id => dispatch(substractQuantity(id));
  const getTotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };
  return (
    <TableRow key={id}>
      <TableCell className={classes.imageCell}>
        <img className={classes.tableCellImage} src={image} />
      </TableCell>
      <TableCell component="th" scope="row">
        <b>
          {name}
        </b>
      </TableCell>
      <TableCell className={classes.tableCell} align="right">
        {price}$
      </TableCell>
      <TableCell className={classes.tableCell} align="right">
        {quantity}
      </TableCell>
      <TableCell className={classes.tableCell} align="right">
        {getTotal(price, quantity)}$
      </TableCell>
      <TableCell component="th" scope="row">
        <Link to="/cart">
          <i
            className="material-icons"
            onClick={() => {
              addQuantity(id);
            }}
          />
        </Link>
        <Link to="/cart">
          <i
            className="material-icons"
            onClick={() => {
              subtractQuantity(id);
            }}
          />
        </Link>
        <Button
          onClick={() => {
            removeItem(id);
          }}
        />
      </TableCell>
    </TableRow>
  );
};

const OrderCard = ({ isAuthenticated }) =>
  <Grid container xs={12} md={12}>
    <Grid item xs={12} md={12}>
      <Typography variant="h3">You have ordered:</Typography>
    </Grid>
    <Grid item xs={12} md={9}>
      {addedItems}
    </Grid>
    <Grid item xs={12} md={3}>
      <Grid container xs={12} md={12}>
        <Grid item xs={12} md={12} className={classes.totalPayTypography}>
          <Typography align="center" variant="h5">
            Total to pay: {total}
            <b>$</b>
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Button
            style={{ width: "100%" }}
            component={Link}
            to={"/checkout"}
            disabled={!isAuthenticated || items.length < 1}
            variant="contained"
            color="primary"
            onClick={() => {
              makeOrder(items);
            }}
          >
            Make Order
          </Button>
          {!isAuthenticated &&
            <div style={{ textAlign: "center" }}>
              <Link to="/login" variant="h6">
                Please login
              </Link>
            </div>}
        </Grid>
      </Grid>
    </Grid>
  </Grid>;

const mapStateToProps = state => {
  return {
    items: state.cart.addedItems,
    total: state.cart.total,
    isAuthenticated: state.auth.token !== null,
    discount: state.cart.discount,
    ordered: state.cart.ordered
  };
};

export default compose(connect(mapStateToProps, null))(Cart);
