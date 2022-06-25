import React from 'react';
import {connect} from 'react-redux';
import {Link, NavLink, Redirect} from "react-router-dom"
import {Button, Grid, TextField,Typography } from '@material-ui/core';
import {authLogin} from './actions/authActions';


class LoginForm extends React.Component {
  
    state = {
        username: "",
        password: ""
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
    handleSubmit = e => {
        e.preventDefault();
        const { username, password } = this.state;
        this.props.login(username, password);
      };

    render() {
        const { error, loading, token} = this.props;
        const {username, password} = this.props;

        if(token) {
            return <Redirect to="/"></Redirect>
        }

        return(
            <Grid container xs={12} style={{height:'100%'}}>
            <Grid item xs={1} md={3}></Grid>
            <Grid item xs={10} md={6}>
            <Typography align='center' variant="h4">Login to your account</Typography>
            <form onSubmit={this.handleSubmit} >
                <Grid container spacing={2} textAlign="center" style={{ height: "100%"}}
                verticalAlign="middle">         
                    <Grid item xs={12} md={12}>
                        <TextField
                            autoComplete='username'
                            name="username"
                            variant="outlined"
                            required
                            fullWidth
                            id="userName"
                            label="Username"
                            autoFocus
                            value={username}
                            onChange={this.handleChange}
                            />
                    </Grid>
                    <Grid item xs={12} md={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"                  
                        loading={loading}
                        disabled={loading}>
                        Login
                        </Button>
                    </Grid>
                 </Grid>               
                <Grid container justify="space-around">
                    <Grid item>
                            <Link to="/signup" variant="body2">
                                Create account
                            </Link>
                    </Grid>
                    <Grid item>
                            <Link to="/reset_password/" variant="body2">
                                Reset password
                            </Link>
                    </Grid>
                </Grid>               
                </form>
                </Grid> 
                <Grid item xs={1} md={3}></Grid>                
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
      loading: state.auth.loading,
      error: state.auth.error,
      token: state.auth.token
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      login: (username, password) => dispatch(authLogin(username, password))
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginForm);