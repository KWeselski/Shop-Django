import React, { Component } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Fonts from './Fonts';
import { fetchProducts } from './components/actions/cartActions';
import addressReducer from './components/reducers/addressReducer';
import authReducer from './components/reducers/authReducer';
import cartReducer from './components/reducers/cartReducer';
import App from './pages/App';

const theme = extendTheme({
  components: {
    Steps,
    Button: {
      variants: {
        primary: {
          rounded: 'none',
          border: '2px',
          borderColor: 'black',
          _hover: {
            color: 'white',
            borderColor: 'DarkSlateGray',
            backgroundColor: 'DarkSlateGray'
          }
        },
        secondary: {
          rounded: 'none',
          border: '2px',
          backgroundColor: 'black',
          color: 'white',
          _hover: {
            color: 'white',
            borderColor: 'DarkSlateGray',
            backgroundColor: 'DarkSlateGray'
          }
        }
      }
    }
  },
  fonts: {
    body: 'Raleway'
  }
});

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage: storage
};

const stripe = loadStripe('{PUBLIC-KEY}');

const rootReducer = combineReducers({
  auth: authReducer,
  cart: persistReducer(persistConfig, cartReducer),
  address: addressReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const persistor = persistStore(store);

store.dispatch(fetchProducts());

const appDiv = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Fonts />

      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </ChakraProvider>
  </Provider>,
  appDiv
);
