import React, { useState } from "react";
import { Button, Grid, Input, Text } from "@chakra-ui/react";
import { connect } from "react-redux";

import axios from "axios";
import { postOpinionURL } from "../../constants";

const OpinionForm = ({ id, exist, isAuthenticated }) => {
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

  const handleRating = (e) => {
    localStorage;
    setRating(e.target.value);
  };

  const handleText = (e) => {
    setOpinion(e.target.value);
  };

  return (
    <div>
      <Text
        style={{ padding: 10, marginTop: 10, textAlign: "center" }}
        variant="h6"
      >
        User Rating
      </Text>
      <form onSubmit={postOpinion}>
        <Grid container spacing={2} textAlign="center" verticalAlign="middle">
          <Grid item xs={12}>
            <Input
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
            <Text variant="h6">Give Rating:</Text>
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

export default connect(mapStateToProps, null)(OpinionForm);
