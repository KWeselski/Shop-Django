import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom';
export default function NavBar() {

        return(
            <div id="navbar">
                <AppBar id="appbar" position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit"
                        aria-label="meny"><MenuIcon /></IconButton>
                        <Typography variant='h6' color="inherit">
                            <Button href="/">Agatka</Button> 
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    };