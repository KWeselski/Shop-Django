import React, {Component} from 'react';
import {render} from 'react-dom';
import Navbar from './NavBar';
import ProductList from './ProductList';
import CategoryList from './CategoryList';
import Grid from '@material-ui/core/Grid';
import ProductDetail from './ProductDetail'
import TestComponent from './TestComponent'
import ProductListByCategory from './ProductListByCategory'
import {productListURL, productListByCategoryURL} from "./constants";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

export default class HomePage extends Component{
    constructor(props){
        super (props);
        this.state = {
        }
    }
    render(){
        return (
            <Router>
                <Switch>
                <Route exact path='/'>
                    <Grid container spacing={24}>       
                        <Grid item xs={6}> <ProductList/> </Grid>        
                    </Grid>);
                </Route>
                <Route exact path='/product/:productID' component={ProductDetail}/>
                <Route exact path='/category/:categoryID' component={ProductListByCategory}/>
                <Route exact path="/test"><TestComponent/></Route>      
                </Switch>
            </Router>
        );
    }
}
