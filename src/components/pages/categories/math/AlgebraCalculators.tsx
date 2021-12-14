import React from 'react'
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import TestNavBar from "../../../navbar/TestNavBar";
import { CollapsibleMenu, Carousel, SimpleDialog } from "../../../content";
import { PLACEHOLDERS, INPUT_TYPE, COLORS } from "../../../../common/shared";
import useStyles from "../../../../styling/CustomStyles";
import {
  MarginOfErrorCalculator,
  ProbabilityOfASeriesOfIndpendentEvents,
  ProbablityOfTwoEvents,
  ProbablitySolverForTwoEvents,
  SampleSizeCalculator,
} from "../../index";
import { CustomSearchInput } from "../../../custom";

function AlgebraCalculators() {
  const { sideBarPaperBackground } = useStyles();
  const [searchText, setSearchText] = React.useState("");
  const [open, setOpen] = React.useState(false);
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
    calcName: "Margin of Error",
    component: <MarginOfErrorCalculator openDrop={handleClickOpen} />,
  });

  const handleSearchChange = (event: any) => {
    setSearchText(event.target.value);
  };

  const calculators = [
    {
      calcName: "Margin of Error",
      component: <MarginOfErrorCalculator openDrop={handleClickOpen} />,
    },
    {
      calcName: "Probability of a Series of Independent Events",
      component: (
        <ProbabilityOfASeriesOfIndpendentEvents openDrop={handleClickOpen} />
      ),
    },
    {
      calcName: "Probablity of Two Events",
      component: <ProbablityOfTwoEvents openDrop={handleClickOpen} />,
    },
    {
      calcName: "Probablity Solver For Two Events",
      component: <ProbablitySolverForTwoEvents openDrop={handleClickOpen} />,
    },
    {
      calcName: "Sample Size",
      component: <SampleSizeCalculator openDrop={handleClickOpen} />,
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

export default AlgebraCalculators
