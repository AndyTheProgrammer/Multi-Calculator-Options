import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import {
  CircularSlap,
  ConcreteSquareFooting,
  ConductorResitor,
  CurbAndGutterBarrier,
  ElapsedTimeMethod,
  HoleColumn,
  HorsepowerCalculation,
  HostingBandwidth,
  ParrallelResitor,
  SeriesResistor,
  SinglePointWithKnownSlope,
  SlopeCalculatorForTwoKnownPoints,
  StairsConcreate,
  TrapSpeedMethod,
  WebsiteBandwidth,
} from "../index";
import useStyles from "../../../styling/CustomStyles";

function Other() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Grid item xs={12}>
        <Typography variant="h6" className="text-center">
          OTHER CALCULATORS
        </Typography>
        <hr />
      </Grid>

      <Grid container xs={12} spacing={2}>
        <Grid item xs={6}>
          <Paper className={classes.paper2}>
            <CircularSlap />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper2}>
            <ConcreteSquareFooting />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper2}>
            <ConductorResitor />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper2}>
            <CurbAndGutterBarrier />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper2}>
            <ElapsedTimeMethod />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper2}>
            <HoleColumn />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper2}>
            <HorsepowerCalculation />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper2}>
            <HostingBandwidth />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper2}>
            <ParrallelResitor />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper2}>
            <SeriesResistor />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper2}>
            <SinglePointWithKnownSlope />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper2}>
            <SlopeCalculatorForTwoKnownPoints />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper2}>
            <StairsConcreate />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper2}>
            <TrapSpeedMethod />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper2}>
            <WebsiteBandwidth />
          </Paper>
        </Grid>
      </Grid>

      <div style={{ marginBottom: 40 }}></div>
    </Container>
  );
}

export default Other;
