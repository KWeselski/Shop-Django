import React from "react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import {
  authResetPasswordConfirm,
  authResetPassword,
} from "./actions/authActions";
import { Button, Grid, TextField, Typography } from "@material-ui/core";

class ResetPasswordForm extends React.Component {
  state = {
    email: "",
    reset: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    this.props.reset(email);
    this.setState({ reset: true });
  };

  render() {
    const { error, loading } = this.props;
    const { email } = this.props;
    const { reset } = this.state;

    if (reset) {
      return (
        <Grid container xs={12} style={{ height: "100%" }}>
          <Grid item xs={1} md={3}></Grid>
          <Grid item xs={12} md={6}>
            <Typography align="center" variant="h4">
              Thank you, we send you an email for reset password
            </Typography>
          </Grid>
          <Grid item xs={1} md={3}></Grid>
        </Grid>
      );
    }

    return (
      <Grid container xs={12} style={{ height: "100%" }}>
        <Grid item xs={1} md={4}></Grid>
        <Grid item xs={10} md={4}>
          <Typography align="center" variant="h4">
            Enter your email for reset password
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <Grid
              container
              spacing={2}
              textAlign="center"
              style={{ height: "100%" }}
              verticalAlign="middle"
            >
              <Grid item xs={12} md={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  autoFocus
                  value={email}
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
                  disabled={loading}
                >
                  Reset password
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={1} md={4}></Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reset: (email) => dispatch(authResetPassword(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
