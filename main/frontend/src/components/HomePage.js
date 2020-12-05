import React, {Component} from 'react';
import ProductList from './ProductList';
import CategoryList from './CategoryList';
import ProductDetail from './ProductDetail'
import Cart from './Cart'
import App from './App'
import ProductListByCategory from './ProductListByCategory'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import NavBar from './NavBar';

export default class HomePage extends Component{
    constructor(props){
        super (props);
        this.state = {
        }
    }
    render(){     
        return (
            <Router>
            </Router>
        );
    }
}
