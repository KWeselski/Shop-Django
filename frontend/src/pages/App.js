import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { compose } from 'redux';
import NavigationBar from '../components/NavBar';
import ProductDetails from '../components/ProductDetails';
import * as actions from '../components/actions/authActions';
import Cart from './Cart';
import Main from './Main';
import Order from './Order';
import ProductList from './ProductList';
import Register from './Register';
import Sign from './Sign';
import Wishlist from './Wishlist';

function App({ authLogin, isAuthenticated, loadUser, onTryAutoSignup }) {
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/category/:id" element={<ProductList />} />
        <Route exact path="/order/" element={<Order />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/register/" element={<Register />} />
        <Route exact path="/sign/" element={<Sign />} />
        <Route exact path="/wishlist/" element={<Wishlist />} />
      </Routes>
    </div>
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
