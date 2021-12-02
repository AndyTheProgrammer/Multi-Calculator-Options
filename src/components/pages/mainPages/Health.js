import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Typography, Grid, Container, Paper } from "@material-ui/core";

import { CollapsibleMenu, Carousel } from "../../content";
import { PLACEHOLDERS, INPUT_TYPE, COLORS } from "../../../common/shared";
import useStyles from "../../../styling/CustomStyles";
import {
  AmortizedLoanFixedAmount,
  BloodAlcoholContent,
  BMRKatchMcArdle,
  BmrMifflinHarrisBenedict,
  BmrMifflinJeorEquation,
  BodyFatPercentageBmi,
  BodyMassIndex,
  BodyMassIndexMethodTwo,
  BoydFormulaSurfaceArea,
  DuBoisBodySurfaceArea,
  DueDateMittendorfWilliam,
  DueDateNaegeleRule,
  DueDateParikhsRule,
  DueDateWoodsRule,
  FujimotoFormulaSurfaceArea,
  GehanAndGeorgeSurfaceArea,
  HaycockBodySurfaceArea,
  InternationalSystemBfc,
  LeanBodyMass,
  LeanBodyMassPeterFormula,
  MostellerBodySurfaceArea,
  PeroidCalculator,
  ProbabilityOfASeriesOfIndpendentEvents,
  RegularCycleOvulation,
  SinglePointWithKnownSlope,
  TakaSchlichBodySurfaceArea,
  TakahiraBodySurfaceArea,
  USCustomarySystemBfc,
  WholeBodyMassFormula,
} from "../index";
import { CustomBtn, CustomSearchInput } from "../../custom";

const Health = () => {
  const { container, sideBarPaperBackground, paperBackground } = useStyles();
  const [searchText, setSearchText] = React.useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  return (
    <Container className={container}>
      <Grid container xs={12}>
        {/* Calculator grid here */}
        <Grid container item xs={12} sm={10}>
          <BloodAlcoholContent />
          <AmortizedLoanFixedAmount />
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
  );
};

export default Health;
