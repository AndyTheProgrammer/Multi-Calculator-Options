import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import useStyles from "../../../styling/CustomStyles";
import {
  MarginOfErrorCalculator,
  ProbabilityOfASeriesOfIndpendentEvents,
  ProbablityOfTwoEvents,
  ProbablitySolverForTwoEvents,
  SampleSizeCalculator,
} from "../index";

const Statistics = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Typography variant="h6" className="text-center">
        STATISTICS CALCULATORS
      </Typography>
      <hr />

      <Grid container xs={12} spacing={2}>
        <Grid item xs={6}>
          <Paper className={classes.paper2}>
            <MarginOfErrorCalculator />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper2}>
            <ProbabilityOfASeriesOfIndpendentEvents />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper2}>
            <ProbablityOfTwoEvents />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper2}>
            <ProbablitySolverForTwoEvents />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper2}>
            <SampleSizeCalculator />
          </Paper>
        </Grid>
      </Grid>

      <div style={{ marginBottom: 40 }}></div>
    </Container>
  );
};

export default Statistics;
