import React from "react";
import { Grid, Text } from "@chakra-ui/react";
// import Rating from "@mui/material/Rating";

const Opinion = ({ rating, opinion, user }) => (
  <Grid container xs={12}>
    <Grid item xs={4}>
      <Text align="left" variant="h6">
        {user}
      </Text>
      <Text align="left" variant="h5">
        XXX
      </Text>
    </Grid>
    <Grid item xs={8}>
      <Text align="justify" variant="h6">
        {opinion}
      </Text>
    </Grid>
  </Grid>
);
export default Opinion;
