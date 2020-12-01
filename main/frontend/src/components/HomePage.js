import React, {Component} from 'react';
import {render} from 'react-dom';
import Navbar from './NavBar';
import ProductList from './ProductList';
import CategoryList from './CategoryList';
import Grid from '@material-ui/core/Grid';
import ProductDetail from './ProductDetail'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";

export default class HomePage extends Component{
    constructor(props){
        super (props);
        this.state = {
            api_link : "http://127.0.0.1:8000/api/products/",
            products_loaded:false,
            product_id : window.location.href.split(':8000')[1],
        };
    }

    render(){
        console.log(this.state.product_id)
        return (
            <Router>
                <Switch>
                <Route exact path='/'>
                    <Grid container spacing={24}>            
                        <Grid item xs={6}> <ProductList data_from_api={this.props.data_from_api} loaded={this.props.products_loaded}/> </Grid>        
                    </Grid>);
                </Route>
                <Route exact path={this.state.product_id} component={ProductDetail}/>         
                </Switch>
            </Router>
        )
    }
}
