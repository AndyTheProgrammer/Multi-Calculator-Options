import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import TestNavBar from "../../navbar/TestNavBar";
import { CollapsibleMenu, Carousel } from "../../content";
import { PLACEHOLDERS, INPUT_TYPE, COLORS } from "../../../common/shared";
import useStyles from "../../../styling/CustomStyles";
import { Font, FontProvider } from "../../font";
import {
  MarginOfErrorCalculator,
  ProbabilityOfASeriesOfIndpendentEvents,
  ProbablityOfTwoEvents,
  ProbablitySolverForTwoEvents,
  SampleSizeCalculator,
} from "../index";
import {
  CustomSearchInput,
  CustomDivider,
  FormTabsContainer,
  ResultTabsContainer,
  StyledTabs,
  NoIndexTabPanel,
  StaticTab,
} from "../../custom";

function SimpleDialog(props) {
  const { onClose, selectedValue, open, dropOptions } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <FontProvider fonts={[{ font: "Raleway" }]}>
        <Font>
          <DialogTitle id="simple-dialog-title">
            Select Statistic Calculator
          </DialogTitle>
        </Font>
        <List>
          {dropOptions.map(({ calcName }) => (
            <ListItem
              button
              onClick={() => handleListItemClick(calcName)}
              key={calcName}
            >
              <Font>
                <ListItemText primary={calcName} />
              </Font>
            </ListItem>
          ))}
        </List>
      </FontProvider>
    </Dialog>
  );
}

const Statistics = () => {
  const {
    container,
    sideBarPaperBackground,
    paperBackground,
    tabRoot,
    rightTabContainer,
    leftTabContainer,
  } = useStyles();
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");

  // main state
  const [currentCalc, setCurrentCalc] = React.useState({
    calcName: "Margin of Error",
    component: <MarginOfErrorCalculator />,
  });

  // state that changes using the dropdown
  const [selectedCalc, setSelectedCalc] = React.useState("marginOfError");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const calculators = [
    {
      calcName: "Margin of Error",
      component: <MarginOfErrorCalculator />,
    },
    {
      calcName: "Probability of a Series of Independent Events",
      component: <ProbabilityOfASeriesOfIndpendentEvents />,
    },
    {
      calcName: "Probablity of Two Events",
      component: <ProbablityOfTwoEvents />,
    },
    {
      calcName: "Probablity Solver For Two Events",
      component: <ProbablitySolverForTwoEvents />,
    },
    {
      calcName: "Sample Size",
      component: <SampleSizeCalculator />,
    },
  ];

  // function that should set the current calculator based on the selected calcName
  function onCalcSelect() {}

  const handleClickOpen = () => {
    setOpen(true);
    console.log("BUTTON: ", "Clicked!");
  };

  const handleClose = (value) => {
    setOpen(false);
    if (value) {
      setSelectedCalc(value);

      // find calcName that matches the selected calc
      const getCalc = calculators.find(({ calcName }) => calcName === value);
      setCurrentCalc(getCalc);
      console.log("CURRENT: ", getCalc.component);
      console.log("VALUE: ", value);
    }
  };

  return (
    <>
      <TestNavBar />
      <Container>
        <Grid container xs={12}>
          {/* Calculator grid here */}
          <Grid container item xs={12} sm={10}>
            <Grid item xs={12} sm={6}>
              <Paper className={paperBackground}>
                <div className={tabRoot}>
                  <StyledTabs>
                    <StaticTab
                      className={leftTabContainer}
                      label={currentCalc.calcName}
                      dropDown={true}
                      openDrop={handleClickOpen}
                    />
                    <StaticTab className={rightTabContainer} label={"tab2"} />
                  </StyledTabs>

                  <NoIndexTabPanel>{currentCalc.component}</NoIndexTabPanel>
                </div>
              </Paper>
            </Grid>
            <SimpleDialog
              dropOptions={calculators}
              selectedValue={selectedCalc}
              open={open}
              onClose={handleClose}
            />

            <ResultTabsContainer
              tabTitle1={"Result"}
              sm={6}
            ></ResultTabsContainer>
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
};

export default Statistics;
