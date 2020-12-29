import React, {Component} from 'react';
import {AppBar, Toolbar, Typography, TextField, Button, Badge, IconButton} from '@material-ui/core/';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { NavLink, Link, withRouter } from "react-router-dom";
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
        width: '17rem',
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
    cartButton:{
    },
    largeIcon: {
        width: 36,
        height: 36,
      },
});

class NavBar extends Component {

    state= {
        query: ""
    }
    
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render(){
        const {classes, authenticated,items,username, total} = this.props;
        const {query} = this.state;
        return(      
            <div id="navbar">
                <div style={{ width:'100%', height:200, backgroundImage: `url('${window.location.origin}/static/images/b1.jpg')`,
                backgroundPosition: '60% 55%',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat' }}>
                </div>                
                <AppBar id="appbar" position="static"> 
                <Toolbar variant="dense">             
                        <Typography style={{marginLeft:'2em' }} variant='h3' className={classes.typographyStyles}>
                            <Link style={{textDecoration: 'none', color:'white'}} to="/"><Typography variant='h4'>Valeé</Typography></Link> 
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <div>
                            <form  className={classes.inputInput} onSubmit={e => { e.preventDefault(); }}>
                                <TextField style={{marginTop: 2}}   
                                name="query"
       
                                required
                                fullWidth       
                                autoFocus
                                value={query}
                                inputProps={{ maxLength: 50 }}
                                onChange={this.handleChange}
                                />
                                <Button style={{marginLeft: 8}} component={Link} to={`/search/${query}`} type="submit" color="secondary" variant="contained">Search</Button>
                            </form>
                            </div> 
                        </div>
                        <div className={classes.typographyStyles} />
                        <IconButton className={classes.cartButton} size='medium' >
                        <Link to='/cart'>    
                            <Badge badgeContent={items.length} color="secondary">
                             <ShoppingCartIcon color="secondary" className={classes.largeIcon}/>
                             </Badge>
                          </Link>
                        </IconButton>
                        <Typography className={classes.iconsbar}>{total} $</Typography>
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
        total: state.cart.total,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    };
};

export default compose(connect(mapStateToProps, mapDispatchToProps),withStyles(styles),)(NavBar);