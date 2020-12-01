import React, {Component} from 'react';
import {render} from 'react-dom';
import Navbar from './NavBar';
import ProductList from './ProductList';
import CategoryList from './CategoryList';
import Grid from '@material-ui/core/Grid';
import HomePage from './HomePage'

export default class App extends Component{
    constructor(props){
        super (props);
        this.state = {
            api_link:"http://127.0.0.1:8000/api/products/",
            product_loaded:false,
        };
    }

    onChangeList(new_url){
        this.setState({
            api_link : new_url,
            products_loaded : false
        });
    }

    render(){
        return(   
            <Grid container spacing={24}>
                <Grid item xs={12} align="center"><Navbar/></Grid>
                <Grid item xs={3}> <CategoryList changeLink={this.onChangeList.bind(this)}/></Grid>
                <HomePage data_from_api = {this.state.api_link} loaded = {this.state.product_loaded}></HomePage>
            </Grid>);
        }

}
   
const appDiv = document.getElementById("app");
render(<App/>, appDiv);


