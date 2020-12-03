import React, {Component} from 'react';
import {render} from 'react-dom';
import Navbar from './NavBar';
import ProductList from './ProductList';
import CategoryList from './CategoryList';
import Grid from '@material-ui/core/Grid';
import HomePage from './HomePage'
import {Provider} from 'react-redux';
import cartReducer from './reducers/cartReducer';
import {createStore, applyMiddleware} from 'redux';
import ReactDOM from 'react-dom';
import thunk from "redux-thunk";
import {fetchProducts} from './actions/cartActions';



const store = createStore(cartReducer,applyMiddleware(thunk))
store.dispatch(fetchProducts())
console.log(store.getState())
export default class App extends Component{
    render(){
       
        return(          
            <Grid container spacing={24}>
                <Grid item xs={12} align="center"><Navbar/></Grid>
                <Grid item xs={1}><CategoryList/></Grid>
                <Grid item xs={6}><HomePage></HomePage></Grid>              
            </Grid>);
        }

}
   

const appDiv = document.getElementById("app");
ReactDOM.render(<Provider store={store}><App/></Provider>, appDiv);


