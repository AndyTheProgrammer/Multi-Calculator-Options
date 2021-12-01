import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import useStyles from "../../../styling/CustomStyles";
import {
  CircleArea,
  ConeArea,
  CubeArea,
  CylindricalTank,
  EllipseArea,
  ParallelogramArea,
  RectangularArea,
  SectorArea,
  TrapezoidArea,
  TriangleArea,
  BallSurfaceArea,
  CapsuleSurfaceArea,
  ConicalFrustrumSurfaceArea,
  EllipsoidSurfaceArea,
  SphericalCapSurfaceArea,
  SquarePyramidSurfaceArea,
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

const Math = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Grid container xs={12} spacing={2}></Grid>

      <div style={{ marginBottom: 40 }}></div>
    </Container>
  );
};

export default Math;
