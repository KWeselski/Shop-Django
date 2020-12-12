import React, {Component} from 'react';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core/';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link, withRouter } from "react-router-dom";
import {connect} from "react-redux";
import {compose} from 'redux'
import { logout } from './actions/authActions';
import {withStyles} from "@material-ui/styles";

const styles = theme => ({
    typographyStyles: {
        flex: 1
    },

});


class NavBar extends Component {
    render(){
        const {classes, authenticated} = this.props;
        return(      
            <div id="navbar">
                <AppBar id="appbar" position="static"> 
                <Toolbar>       
                        <Typography variant='h3' className={classes.typographyStyles}>
                            <Link to="/">Shop</Link> 

                        </Typography>
                        <Link to='/cart'><ShoppingCartIcon></ShoppingCartIcon></Link>
                        {authenticated ? (
                                <div>
                                    <h5>Logged</h5>
                                    <Button class="icon" onClick={() => this.props.logout()}> Logout </Button>                                    
                                </div>
                            )
                            :(
                                <div>
                                    <Link to='/login'><Button class="icon">Login</Button></Link>
                                    <Link to='/signup'><Button class="icon">Signup</Button></Link>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    };
};

export default compose(connect(mapStateToProps, mapDispatchToProps),withStyles(styles),)(NavBar);

