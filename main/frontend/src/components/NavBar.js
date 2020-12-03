import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import PersonIcon from '@material-ui/icons/Person';
import Link from 'react-router-dom'
import Button from '@material-ui/core/Button';
export default function NavBar() {

        return(
            <div id="navbar">
                <AppBar id="appbar" position="static"> 
                <Toolbar> 
                              
                        <Typography variant='h3' align="center" color="inherit">
                            
                        </Typography>
                        <ShoppingBasketIcon class="icon" href="/cart"></ShoppingBasketIcon>
                        <PersonIcon class="icon"></PersonIcon>
                </Toolbar>
                </AppBar>
            </div>
        );
    };