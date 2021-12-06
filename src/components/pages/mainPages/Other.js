import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import TestNavBar from "../../navbar/TestNavBar";
import { CollapsibleMenu, Carousel } from "../../content";
import { PLACEHOLDERS, INPUT_TYPE, COLORS } from "../../../common/shared";
import { CustomSearchInput, CustomDivider } from "../../custom";
import useStyles from "../../../styling/CustomStyles";
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
  RegularCycleOvulation,
  TakaSchlichBodySurfaceArea,
  TakahiraBodySurfaceArea,
  USCustomarySystemBfc,
  WholeBodyMassFormula,
} from "../index";

function Other() {
  const { container, sideBarPaperBackground, paperBackground } = useStyles();
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
            <CircularSlap />

            <CustomDivider />

            <ConcreteSquareFooting />

            <CustomDivider />

            <ConductorResitor />

            <CustomDivider />

            <CurbAndGutterBarrier />

            <CustomDivider />

            <ElapsedTimeMethod />

            <CustomDivider />

            <HoleColumn />

            <CustomDivider />

            <HorsepowerCalculation />

            <CustomDivider />

            <HostingBandwidth />

            <CustomDivider />

            <ParrallelResitor />

            <CustomDivider />

            <SeriesResistor />

            <CustomDivider />

            <SinglePointWithKnownSlope />

            <CustomDivider />

            <SlopeCalculatorForTwoKnownPoints />

            <CustomDivider />

            <StairsConcreate />

            <CustomDivider />

            <TrapSpeedMethod />

            <CustomDivider />

            <WebsiteBandwidth />

            <CustomDivider />

            <BloodAlcoholContent />

            <CustomDivider />

            <BMRKatchMcArdle />

            <CustomDivider />

            <BmrMifflinHarrisBenedict />

            <CustomDivider />

            <BmrMifflinJeorEquation />

            <CustomDivider />

            <BodyFatPercentageBmi />

            <CustomDivider />

            <BodyMassIndex />

            <CustomDivider />

            <BodyMassIndexMethodTwo />

            <CustomDivider />

            <BoydFormulaSurfaceArea />

            <CustomDivider />

            <DuBoisBodySurfaceArea />

            <CustomDivider />

            <DueDateMittendorfWilliam />

            <CustomDivider />

            <DueDateNaegeleRule />

            <CustomDivider />

            <DueDateParikhsRule />

            <CustomDivider />

            <DueDateWoodsRule />

            <CustomDivider />

            <FujimotoFormulaSurfaceArea />

            <CustomDivider />

            <GehanAndGeorgeSurfaceArea />

            <CustomDivider />

            <HaycockBodySurfaceArea />

            <CustomDivider />

            <InternationalSystemBfc />

            <CustomDivider />

            <LeanBodyMass />

            <CustomDivider />

            <LeanBodyMassPeterFormula />

            <CustomDivider />

            <MostellerBodySurfaceArea />

            <CustomDivider />

            <PeroidCalculator />

            <CustomDivider />

            <RegularCycleOvulation />

            <CustomDivider />

            <TakaSchlichBodySurfaceArea />

            <CustomDivider />

            <TakahiraBodySurfaceArea />

            <CustomDivider />

            <USCustomarySystemBfc />

            <CustomDivider />

            <WholeBodyMassFormula />
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

export default Other;
