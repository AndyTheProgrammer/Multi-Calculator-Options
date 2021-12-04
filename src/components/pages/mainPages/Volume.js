import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import TestNavBar from "../../navbar/TestNavBar";
import { CollapsibleMenu, Carousel } from "../../content";
import { PLACEHOLDERS, INPUT_TYPE } from "../../../common/shared";
import { CustomSearchInput, CustomDivider } from "../../custom";
import useStyles from "../../../styling/CustomStyles";
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
  const { sideBarPaperBackground } = useStyles();
  const [searchText, setSearchText] = React.useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  return (
    <>
      <TestNavBar />
      <Container>
        <Grid container xs={12}>
          {/* Calculator grid here */}
          <Grid container item xs={12} sm={10}>
            <CapsuleVolume />

            <CustomDivider />

            <ConeVolume />

            <CustomDivider />

            <ConicalFrustumVolume />

            <CustomDivider />

            <CubeVolume />

            <CustomDivider />

            <CylinderVolume />

            <CustomDivider />

            <EllipsoidVolume />

            <CustomDivider />

            <RectangularTankVolume />

            <CustomDivider />

            <SphereVolume />

            <CustomDivider />

            <SphericalCapVolume />

            <CustomDivider />

            <SquarePyramidVolume />

            <CustomDivider />

            <TubeVolume />
          </Grid>

          {/* Ad & menu grid */}
          <Grid item xs={12} sm={2}>
            {/* Carousel */}
            <Grid item xs={12}>
              <Paper elevation={0} className={sideBarPaperBackground}>
                <Carousel />
              </Paper>
            </Grid>

            {/* Search input */}
            <Grid>
              <CustomSearchInput
                type={INPUT_TYPE.text}
                id="search"
                name="search"
                placeholder={PLACEHOLDERS.search}
                value={searchText}
                onChange={handleSearchChange}
              />
            </Grid>

            {/* Menu */}
            <Grid item xs={12}>
              <Paper elevation={0} className={sideBarPaperBackground}>
                <CollapsibleMenu />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Volume;
