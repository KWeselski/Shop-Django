import React, {Component} from 'react';
import {render} from 'react-dom';
import Navbar from './NavBar';
import ProductList from './ProductList';
import Grid from '@material-ui/core/Grid';
export default class App extends Component{
    constructor(props){
        super (props);
    }
    render(){
        return(   
            <Grid container spacing={24}>
                <Grid item xs={12} align="center"><Navbar/></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}> <ProductList/></Grid>
            </Grid>);
        }
    }

    
const appDiv = document.getElementById("app");
render(<App/>, appDiv);