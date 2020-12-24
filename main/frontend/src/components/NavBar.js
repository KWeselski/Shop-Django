import React, {Component} from 'react';
import {AppBar, Toolbar, Typography, TextField, Button, Badge, IconButton} from '@material-ui/core/';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Link, withRouter } from "react-router-dom";
import {connect} from "react-redux";
import {compose} from 'redux'
import { logout } from './actions/authActions';
import {fade, withStyles} from "@material-ui/core/styles";


const styles = theme => ({
    typographyStyles: {
        flex: 1
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
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
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
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

    searchContainer: {
        display:'flex',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingLeft: "20px",
        paddingRight: "20px",
        marignTop: "5px",
        marginBottom: "5px"
    }

});

class NavBar extends Component {

    state= {
        search: ""
    }


    handleSearch(){
        const {search} = this.state;
        console.log(search);
        <Link to='search/'></Link>
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render(){
        const {classes, authenticated,items,username} = this.props;
        const {search} = this.state;
        return(      
            <div id="navbar">
                <div style={{ width:'100%', height:150, backgroundImage: "url(" + "\static/images/food.jpg" + ")",
                backgroundPosition: 'top',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat' }}>
                </div>                
                <AppBar id="appbar" position="static"> 
                <Toolbar variant="dense">
                          
                        <Typography style={{marginLeft:'2em' }} variant='h3' className={classes.typographyStyles}>
                            <Link style={{textDecoration: 'none', color:'white'}} to="/"><Typography variant='h4'>Shop</Typography></Link> 
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                            <SearchIcon />
                            </div>
                        <form onSubmit={this.handleSearch()}>
                                <TextField classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput}}
                                autoComplete='search'
                                name="search"
                                variant="outlined"
                                required
                                fullWidth
                                id="search"
                                label="Search"
                                autoFocus
                                value={search}
                                inputProps={{ maxLength: 50 }}
                                onChange={this.handleChange}
                                />
                        </form>
                        </div>
                        <div className={classes.typographyStyles} />
                        <IconButton className={classes.cartButton} size='medium' color='inherit'>
                        <Link to='/cart'>    
                            <Badge badgeContent={items.length} color="secondary">
                             <ShoppingCartIcon className={classes.largeIcon}/>
                             </Badge>
                          </Link>
                        </IconButton>
                        {authenticated ?(             
                            <span>
                            <Typography className={classes.iconsbar}> {username} </Typography>
                            <Typography className={classes.iconsbar} onClick={() => this.props.logout()}> Logout </Typography>
                            </span>
                        ):(
                            <div style={{display:'flex'}}>
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
        username: state.auth.username,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    };
};

export default compose(connect(mapStateToProps, mapDispatchToProps),withStyles(styles),)(NavBar);