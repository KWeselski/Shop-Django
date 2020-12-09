import React from 'react';
import {connect} from 'react-redux';
import {NavLink, Redirect} from "react-router-dom"
import {authLogin} from './actions/authActions';
import {Button, Grid, TextField } from '@material-ui/core';


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
            <div>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
                <Grid container spacing={2}>
                    
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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
                <Grid containter justify="flex-end">
                    <Grid item>
                        <NavLink to="/signup" variant="body2">
                            Creat account
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
      login: (username, password) => dispatch(authLogin(username, password))
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginForm);