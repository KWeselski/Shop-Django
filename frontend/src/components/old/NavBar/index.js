import React, {useState, useEffect} from 'react';
import {AppBar, Grid, Toolbar, Typography, TextField, Button, Badge, IconButton} from '@material-ui/core/';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import { Link, } from "react-router-dom";
import {connect} from "react-redux";
import {compose} from 'redux'
import { logout } from './actions/authActions';
import {fade, withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    appBar:{
        height:130,
        [theme.breakpoints.up('sm')]:{
            height:100},
        [theme.breakpoints.up('md')]:{
        height:60},
        
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        }, 
        width:'16rem',
        [theme.breakpoints.up('md')]:{
            width:'17rem'}
      },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {    
        height:'100%', 
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        display:'flex',
        width: '100%',
    },
    iconsbar: {
        display: 'flex',
        padding: theme.spacing(0,2),
        alignItems: 'center',
        justifyContent: 'center'

    },
    largeIcon: {
        width: 36,
        height: 36,
      },
    navbarBackground: {
        width: '100%',
        height: 70,
        backgroundImage: `url('${window.location.origin}/static/images/b1.jpg')`,
        backgroundPosition: '60% 55%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        [theme.breakpoints.up('md')]:{
            height:200},
    },
    linkDecoration:{
        textDecoration:"none",
        color:'white'
    },
    title:{
        [theme.breakpoints.up('md')]:{
            marginLeft:'2em',
            flex:1}
    },
    desktopBar:{
        display:'none', 
        [theme.breakpoints.up('sm')]:{
                display:'none'},
        [theme.breakpoints.up('md')]:{
                display:'flex'},
    },
    smBar:{
        display:'none',
        [theme.breakpoints.up('sm')]:{
            display:'flex'},
        [theme.breakpoints.up('md')]:{
            display:'none'},     
    },
    xsBar:{
        display:'flex',
        [theme.breakpoints.up('sm')]:{
            display:'none'},
        [theme.breakpoints.up('md')]:{
            display:'none'},        
    }
});

const NavBar = () => {
    
}


const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        items: state.cart.addedItems,
        username: state.auth.username,
        total: state.cart.total,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    };
};

export default compose(connect(mapStateToProps, mapDispatchToProps),withStyles(styles),)(NavBar);