import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  ChakraProvider,
  Grid,
  HStack,
  Text,
  extendTheme,
} from "@chakra-ui/react";
import * as actions from "./actions/authActions";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { compose } from "redux";
import NavigationBar from "./NavBar";
import ProductCard from "./ProductCard";
import Main from "../pages/Main";
import ProductList from "../pages/ProductList";
import ProductDetails from "./ProductDetails";

// if (window.location.origin === "http://127.0.0.1:8000") {
//   axios.defaults.baseURL = "http://127.0.0.1:8000";
// } else {
//   axios.defaults.baseURL = window.location.origin;
// }

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: { rounded: "none", border: "2px", borderColor: "black" },
    },
  },
});

function App() {
  // useEffect(() => {
  //   onTryAutoSignup();
  // });SSS

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/category/:id" component={ProductList} />
          <Route exact path="/product/:id" component={ProductDetails} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};
export default compose(connect(mapStateToProps, mapDispatchToProps))(App);
