import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  footerGrid: {
    position: "absolute",
    bottom: 0,
    height: 75,
    backgroundColor: "#212121",
    color: "white",
  },
  footerDiv: {
    display: "flex",
    margin: "auto",
    letterSpacing: "0.1rem",
  },
  footerItem: {
    padding: 8,
    [theme.breakpoints.up("sm")]: {
      padding: 20,
    },
  },
});

const Footer = (props) => {
  const { classes } = props;
  return (
    <Grid container className={classes.footerGrid} xs={12}>
      <div className={classes.footerDiv}>
        <Grid item xs={6} md={12}>
          <Typography className={classes.footerItem} variant="h3">
            Help
          </Typography>
        </Grid>
        <Grid item xs={6} md={12}>
          <Typography className={classes.footerItem} variant="h3">
            Contact
          </Typography>
        </Grid>
        <Grid item xs={6} md={12}>
          <Typography className={classes.footerItem} variant="h3">
            About
          </Typography>
        </Grid>
        <Grid item xs={6} md={12}>
          <Typography className={classes.footerItem} variant="h3">
            FAQ
          </Typography>
        </Grid>
      </div>
    </Grid>
  );
};

export default withStyles(styles)(Footer);
