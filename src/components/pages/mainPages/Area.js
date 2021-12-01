import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import useStyles from "../../../styling/CustomStyles";
import {
  CircleArea,
  EllipseArea,
  ParallelogramArea,
  RectangularArea,
  SectorArea,
  TrapezoidArea,
  TriangleArea,
} from "../index";

function Area() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Typography variant="subtitle2" className="text-center">
        | Area Calculator
      </Typography>
      <hr />
      <Grid container xs={12}>
        {/* Calculator Grid */}
        <Grid item xs={8}>
          <Paper className={classes.paperBackground}>
            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                <CircleArea />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                <EllipseArea />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                <ParallelogramArea />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                <RectangularArea />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                <SectorArea />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                <TrapezoidArea />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                <TriangleArea />
              </Paper>
            </Grid>
          </Paper>
        </Grid>

        {/* Ad Grid */}
        <Grid item xs={4}>
          <Paper className={classes.paper2}>Ad</Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Area;
