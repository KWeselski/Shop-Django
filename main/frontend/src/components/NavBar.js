import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default function NavBar() {

        return(
            <div id="navbar">
                <AppBar id="appbar" position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit"
                        aria-label="meny"><MenuIcon /></IconButton>
                        <Typography variant='h6' color="inherit">
                            Agatka
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    };