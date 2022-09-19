import React, { Component } from "react";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import thunk from "redux-thunk";
import { fetchProducts } from "./components/actions/cartActions";
import cartReducer from "./components/reducers/cartReducer";
import authReducer from "./components/reducers/authReducer";
import addressReducer from "./components/reducers/addressReducer";
import App from "./pages/App";
import storage from "redux-persist/lib/storage";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage: storage
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: persistReducer(persistConfig, cartReducer),
  address: addressReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const persistor = persistStore(store);

store.dispatch(fetchProducts());

const appDiv = document.getElementById("app");
ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  appDiv
);
