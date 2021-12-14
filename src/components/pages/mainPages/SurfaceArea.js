import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import TestNavBar from "../../navbar/TestNavBar";
import { CollapsibleMenu, Carousel, SimpleDialog } from "../../content";
import { PLACEHOLDERS, INPUT_TYPE, COLORS } from "../../../common/shared";
import useStyles from "../../../styling/CustomStyles";
import { CustomSearchInput } from "../../custom";
import {
  BallSurfaceArea,
  CapsuleSurfaceArea,
  ConeSurfArea,
  ConicalFrustrumSurfaceArea,
  CubeSurfArea,
  CylindricalTankSurfArea,
  EllipsoidSurfaceArea,
  SphericalCapSurfaceArea,
  SquarePyramidSurfaceArea,
} from "../index";

function SurfaceArea() {
  const { sideBarPaperBackground } = useStyles();
  const [searchText, setSearchText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  // state that changes using the dropdown
  const [selectedCalc, setSelectedCalc] = React.useState("marginOfError");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    if (value) {
      setSelectedCalc(value);

      // find calcName that matches the selected calc
      const getCalc = calculators.find(({ calcName }) => calcName === value);
      setCurrentCalc(getCalc);
    }
  };

  // main state
  const [currentCalc, setCurrentCalc] = React.useState({
    calcName: "Ball Surface Area",
    component: <BallSurfaceArea openDrop={handleClickOpen} />,
  });

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const calculators = [
    {
      calcName: "Ball Surface Area",
      component: <BallSurfaceArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Capsule Surface Area",
      component: <CapsuleSurfaceArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Cone Surface Area",
      component: <ConeSurfArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Conical Frustrum Surface Area",
      component: <ConicalFrustrumSurfaceArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Cube Surface Area",
      component: <CubeSurfArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Cylindrical Tank Surface Area",
      component: <CylindricalTankSurfArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Ellipsoid Surface Area",
      component: <EllipsoidSurfaceArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Spherical Cap Surface Area",
      component: <SphericalCapSurfaceArea openDrop={handleClickOpen} />,
    },
    {
      calcName: "Square Pyramid Surface Area",
      component: <SquarePyramidSurfaceArea openDrop={handleClickOpen} />,
    },
  ];

  return (
    <>
      <TestNavBar />
      <Container>
        <Grid container xs={12}>
          {/* Calculator grid here */}
          <Grid container item xs={12} sm={10}>
            {currentCalc.component}
            <SimpleDialog
              dropOptions={calculators}
              selectedValue={selectedCalc}
              open={open}
              onClose={handleClose}
            />
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

export default SurfaceArea;
