import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import * as actions from "../components/actions/authActions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { compose } from "redux";
import Cart from "./Cart";
import NavigationBar from "../components/NavBar";
import Main from "./Main";
import ProductList from "./ProductList";
import ProductDetails from "../components/ProductDetails";
import Register from "./Register";
import Wishlist from "./Wishlist";
import Sign from "./Sign";

const theme = extendTheme({
  components: {
    Button: {
      facebook: { rounded: "none", border: "2px", borderColor: "black" }
    }
  }
});

function App({ authLogin, isAuthenticated, loadUser, onTryAutoSignup }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // authLogin("admin", "admin");
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/category/:id" component={ProductList} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/register/" component={Register} />
          <Route exact path="/sign/" component={Sign} />
          <Route exact path="/wishlist/" component={Wishlist} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authLogin: (login, password) =>
      dispatch(actions.authLogin(login, password)),
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};
export default compose(connect(mapStateToProps, mapDispatchToProps))(App);
