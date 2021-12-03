import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Typography, Grid, Container, Paper } from "@material-ui/core";

import { CollapsibleMenu, Carousel } from "../../content";
import { PLACEHOLDERS, INPUT_TYPE, COLORS } from "../../../common/shared";
import {
  AmortizedLoanFixedAmount,
  BondPayBackPredetermined,
  DefearedPaymentsLumpsumAtMaturity,
  InflationCalculatorCpiData,
  MortgagePayOffWithoutLoanTerm,
  MortgagePayoffWithLoanTerm,
  PayBackACertainAmount,
  PaybackWithinTimeframe,
  PresentValue,
  PresentValueOfPeriodicalDeposit,
  ProfitMarginCalculator,
  StockTradingMargin,
} from "../index";
import { Label, CustomBtn, CustomSearchInput } from "../../custom";

const useStyles = makeStyles((theme) => ({
  sideBarPaperBackground: {
    margin: theme.spacing(1),
    backgroundColor: "transparent",
    borderRadius: 20,
  },
}));

function Finance() {
  const { sideBarPaperBackground } = useStyles();
  const [searchText, setSearchText] = React.useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  return (
    <>
      <Container>
        <Grid container xs={12}>
          {/* Calculator grid here */}
          <Grid container item xs={12} sm={10}></Grid>

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
