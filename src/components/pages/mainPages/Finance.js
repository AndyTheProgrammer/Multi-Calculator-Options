import React from "react";
import { Typography, Grid, Container, Paper } from "@material-ui/core";

import TestNavBar from "../../navbar/TestNavBar";
import { CollapsibleMenu, Carousel } from "../../content";
import { PLACEHOLDERS, INPUT_TYPE, COLORS } from "../../../common/shared";
import { CustomSearchInput, CustomDivider } from "../../custom";
import useStyles from "../../../styling/CustomStyles";
import {
  AmortizedLoanFixedAmount,
  BondPayBackPredetermined,
  DefearedPaymentsLumpsumAtMaturity,
  InflationCalculatorCpiData,
  MortgagePayOffWithoutLoanTerm,
  MortgagePayoffWithLoanTerm,
  PaybackACertainAmount,
  PaybackWithinTimeframe,
  PresentValue,
  PresentValueOfPeriodicalDeposit,
  ProfitMarginCalculator,
  StockTradingMargin,
} from "../index";

function Finance() {
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
            <AmortizedLoanFixedAmount />

            <CustomDivider />

            <BondPayBackPredetermined />

            <CustomDivider />

            <DefearedPaymentsLumpsumAtMaturity />

            <CustomDivider />

            <InflationCalculatorCpiData />

            <CustomDivider />

            <MortgagePayOffWithoutLoanTerm />

            <CustomDivider />

            <MortgagePayoffWithLoanTerm />

            <CustomDivider />

            <PaybackACertainAmount />

            <CustomDivider />

            <PaybackWithinTimeframe />

            <CustomDivider />

            <PresentValue />

            <CustomDivider />

            <PresentValueOfPeriodicalDeposit />

            <CustomDivider />

            <ProfitMarginCalculator />

            <CustomDivider />

            <StockTradingMargin />

            <CustomDivider />
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

export default Finance;
