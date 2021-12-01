import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import useStyles from "../../../styling/CustomStyles";
import { CollapsibleMenu } from "../../content";
import {
  CapsuleVolume,
  ConeVolume,
  ConicalFrustumVolume,
  CubeVolume,
  CylinderVolume,
  EllipsoidVolume,
  RectangularTankVolume,
  SphereVolume,
  SphericalCapVolume,
  SquarePyramidVolume,
  TubeVolume,
} from "../index";

function Volume() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Typography variant="subtitle2" className="text-center">
        | Volume Calculator
      </Typography>
      <hr />
      <Grid container xs={12}>
        {/* Calculator Grid */}
        <Grid item xs={8}>
          <Paper className={classes.paperBackground}>
            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                <CapsuleVolume />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                <ConeVolume />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                <ConicalFrustumVolume />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                <CubeVolume />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                <CylinderVolume />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                <EllipsoidVolume />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                <RectangularTankVolume />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                <SphereVolume />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                <SphericalCapVolume />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                <SquarePyramidVolume />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper2}>
                <TubeVolume />
              </Paper>
            </Grid>
          </Paper>
        </Grid>

        {/* Ad Grid */}
        <Grid item xs={4}>
          <Paper className={classes.paper2}>
            <CollapsibleMenu />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Volume;
