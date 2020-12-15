import React from 'react';
import {connect} from 'react-redux';
import {NavLink, Redirect} from "react-router-dom"
import {authSignup} from './actions/authActions';
import {Button, Grid, TextField , Typography} from '@material-ui/core';

class Registration extends React.Component{
    state = {
        username: "",
        email: "",
        password1: "",
        password2: "",
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
    handleSubmit = e => {
        e.preventDefault();
        const { username, email, password1, password2 } = this.state;
        this.props.signup(username, email, password1, password2);
    };

    render(){
        const {username, email, password1, password2} = this.state;
        const {error, loading, token} = this.props;
        console.log(token)
        if(token){
            return <Redirect to="/" />;
        }
        return(
        <div>
            <Typography style={{padding:30}} variant="h4">Signup to your account</Typography>
            <form onSubmit={this.handleSubmit}>
                <Grid container spacing={2} textAlign="center"
                style={{ height: "50vh" }}
                verticalAlign="middle">
                    <Grid item xs={8}>
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
                    <Grid item xs={8}>
                        <TextField
                            autoComplete='email'
                            name="email"
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoFocus
                            value={email}
                            onChange={this.handleChange}
                            />
                    </Grid>
                    <Grid item xs={8}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password1"
                        label="Password"
                        type="password"
                        id="password1"
                        autoComplete="current-password"
                        value={password1}
                        onChange={this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={8}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password2"
                        label="Password"
                        type="password"
                        id="password2"
                        autoComplete="current-password"
                        value={password2}
                        onChange={this.handleChange}
                    />
                    </Grid>
                    <Grid item xs={8}>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"                  
                        loading={loading}
                        disabled={loading}>
                        Sign Up
                    </Button>
                    </Grid>
                </Grid>
                
                <Grid containter justify="flex-end">
                    <Grid item>
                        <NavLink to="/login" variant="body2">
                            Already have an account?
                        </NavLink>
                    </Grid>
                </Grid>
            </form>
        </div>
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
        signup: (username, email, password1, password2) =>
        dispatch(authSignup(username,email,password1,password2))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Registration);