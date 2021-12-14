import React from 'react'
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import TestNavBar from "../../../../navbar/TestNavBar";
import { CollapsibleMenu, Carousel, SimpleDialog } from "../../../../content";
import useStyles from "../../../../../styling/CustomStyles";
import {
  PLACEHOLDERS,
  INPUT_TYPE,
} from '../../../../../common/shared'
import {
  CustomSearchInput
} from '../../../../custom'
import {
  CircularSlab,
  ConcreteSquareFooting,
  CurbAndGutterBarrier,
  HoleColumn,
  StairsConcreate
} from "../../../index";

function ConcreteCalculator() {
  const { sideBarPaperBackground } = useStyles();
  const [searchText, setSearchText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleSearchChange = (event: any) => {
    setSearchText(event.target.value);
  };
  // state that changes using the dropdown
  const [selectedCalc, setSelectedCalc] = React.useState("marginOfError");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: any) => {
    setOpen(false);
    if (value) {
      setSelectedCalc(value);

      // find calcName that matches the selected calc
      const getCalc = calculators.find(({ calcName }) => calcName === value);
      setCurrentCalc(getCalc!);
    }
  };

  // main state
  const [currentCalc, setCurrentCalc] = React.useState({
    calcName: "Circular Slab or Tube",
    component: <CircularSlab openDrop={handleClickOpen} />,
  });

  const calculators = [
    {
      calcName: "Circular Slab or Tube",
      component: <CircularSlab openDrop={handleClickOpen} />,
    },
    {
      calcName: "Slabs, Square Footings, or Walls",
      component: <ConcreteSquareFooting openDrop={handleClickOpen} />,
    },
    {
      calcName: "Hole, Column, or Round Footings",
      component: <HoleColumn openDrop={handleClickOpen} />,
    },
    {
      calcName: "Curb and Gutter Barrier",
      component: <CurbAndGutterBarrier openDrop={handleClickOpen} />,
    },
    {
      calcName: "Sample Size",
      component: <StairsConcreate openDrop={handleClickOpen} />,
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
  )
}

export default ConcreteCalculator
