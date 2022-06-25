import React from "react";
import { connect } from "react-redux";
import { authResetPasswordConfirm } from "./actions/authActions";
import { Button, Grid, TextField, Typography } from "@material-ui/core";

class ResetPasswordConfirmForm extends React.Component {
  state = {
    password1: "",
    password2: "",
    reset: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { uid, token } = this.props.match.params;
    const { password1, password2 } = this.state;
    this.props.passwordConfirm(uid, token, password1, password2);
    this.setState({ reset: true });
  };

  render() {
    const { loading, error, password1, password2 } = this.props;
    const { reset } = this.state;

    if (reset) {
      return (
        <Grid container xs={12} style={{ height: "100%" }}>
          <Grid item xs={1} md={3}></Grid>
          <Grid item xs={12} md={6}>
            <Typography align="center" variant="h4">
              Thank you, your password is changed
            </Typography>
          </Grid>
          <Grid item xs={1} md={3}></Grid>
        </Grid>
      );
    }
    if (error) {
      return (
        <Grid container xs={12} style={{ height: "100%" }}>
          <Grid item xs={1} md={3}></Grid>
          <Grid item xs={12} md={6}>
            <Typography align="center" variant="h4">
              {error}
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
            Type your new password
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
                  autoComplete="password1"
                  name="password1"
                  variant="outlined"
                  required
                  fullWidth
                  id="password1"
                  label="New password"
                  autoFocus
                  value={password1}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  autoComplete="password2"
                  name="password2"
                  variant="outlined"
                  required
                  fullWidth
                  id="password2"
                  label="Repeat password"
                  autoFocus
                  value={password2}
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
    passwordConfirm: (uid, token, password1, password2) =>
      dispatch(authResetPasswordConfirm(uid, token, password1, password2)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordConfirmForm);
