import React, {Component} from 'react';
import {AppBar, Toolbar, Typography, Button, Badge, IconButton} from '@material-ui/core/';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link, withRouter } from "react-router-dom";
import {connect} from "react-redux";
import {compose} from 'redux'
import { logout } from './actions/authActions';
import {withStyles} from "@material-ui/core/styles";


const styles = theme => ({
    typographyStyles: {
        flex: 1
    },
    iconsbar: {
        display: 'flex',
        padding: theme.spacing(0,2),

        alignItems: 'center',
        justifyContent: 'center'

    },
    cartButton:{
        marginRight: theme.spacing(4),
    },
    largeIcon: {
        width: 36,
        height: 36,
      },

});


class NavBar extends Component {
    render(){
        const {classes, authenticated,items} = this.props;
        console.log(this.props)
        return(      
            <div id="navbar">
                <AppBar id="appbar" position="static"> 
                <Toolbar variant="dense">       
                        <Typography variant='h3' className={classes.typographyStyles}>
                            <Link style={{textDecoration: 'none', color:'white'}} to="/"><Typography variant='h4'>Shop</Typography></Link> 
                        </Typography>
                        <IconButton className={classes.cartButton} size='medium' color='inherit'>
                        <Link to='/cart'>    
                            <Badge badgeContent={items.length} color="secondary">
                             <ShoppingCartIcon className={classes.largeIcon}/>
                             </Badge>
                          </Link>
                        </IconButton>
                        {authenticated ?(
                            <span style={{marignRight:40}}>
                            <Typography className={classes.iconsbar} onClick={() => this.props.logout()}> Logout </Typography>
                            </span>
                        ):(
                            <div style={{marignRight:40, display:'flex'}}>
                                <Link style={{textDecoration:"none", color:'white'}} to='/login'><Typography className={classes.iconsbar}>Login</Typography></Link>
                                <Link style={{textDecoration:"none", color:'white'}} to='/signup'><Typography className={classes.iconsbar}>Signup</Typography></Link>
                            </div>
                        )}                                                                 
                </Toolbar>                                         
                </AppBar>                
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.token !== null,
        items: state.cart.addedItems,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    };
};

export default compose(connect(mapStateToProps, mapDispatchToProps),withStyles(styles),)(NavBar);


/*
                      )
                            :(
                                <div>
                                    <Link to='/login'><Typography class="icon">Login</Typography></Link>
                                    <Link to='/signup'><Typography  class="icon">Signup</Typography></Link>
                                </div>
                            )}     */