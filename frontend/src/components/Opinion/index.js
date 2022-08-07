import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import { postOpinionURL } from "../constants";

const Opinion = ({ id, exist, isAuthenticated }) => {
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [opinion, setOpinion] = useState("");

  const postOpinion = () => {
    axios
      .post(
        postOpinionURL(id),
        {
          rating: rating,
          opinion: opinion,
          product: id,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((error) => setError(error));
  };

  const handleRating = (e) => {localStorage
    setRating(e.target.value);
  };

  const handleText = (e) => {
    setOpinion(e.target.value);
  };

  return (
    <div>
      <Typography
        style={{ padding: 10, marginTop: 10, textAlign: "center" }}
        variant="h6"
      >
        User Rating
      </Typography>
      <form onSubmit={postOpinion}>
        <Grid container spacing={2} textAlign="center" verticalAlign="middle">
          <Grid item xs={12}>
            <TextField
              autoComplete="opinion"
              name="opinion"
              variant="outlined"
              fullWidth
              multiline={true}
              rows={4}
              id="opinion"
              label="Opinion"
              autoFocus
              value={opinion}
              inputProps={{ maxLength: 250 }}
              onChange={handleText}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6">Give Rating:</Typography>
            <Rating value={rating} onChange={handleRating}></Rating>
          </Grid>
          <Grid item xs={4}>
            {exist ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Update opinion
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!isAuthenticated}
                fullWidth
                variant="contained"
                color="primary"
              >
                Send opinion
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps, null)(Opinion);
