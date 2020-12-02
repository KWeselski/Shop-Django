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
        };
    }



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
render(<App/>, appDiv);


