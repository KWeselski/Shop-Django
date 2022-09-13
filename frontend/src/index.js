import React, { Component } from "react";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { fetchProducts } from "./components/actions/cartActions";
import cartReducer from "./components/reducers/cartReducer";
import authReducer from "./components/reducers/authReducer";
import addressReducer from "./components/reducers/addressReducer";
import App from "./pages/App";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  address: addressReducer
});
const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

store.dispatch(fetchProducts());

const appDiv = document.getElementById("app");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  appDiv
);
