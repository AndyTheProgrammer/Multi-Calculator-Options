import React from 'react'
import { Formik } from 'formik'
import { Typography, Box, Grid, Paper } from '@mui/material'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../../navbar/navbar2'
import AddLayout from '../../../../layouts/AddLayout'
import useStyles from '../../../../../styling/CustomStyles'
import { calculateFinances } from '../../../../../services/AppCalculatorsApi'
import { ProfitMarginCalculatorI, StockTradingMarginI } from '../../../../../types'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  COLORS,
  LATEX,
} from '../../../../../common/shared'
import {
  CustomTextInput,
  Label,
  FormRow,
  ResultTabsContainer,
  StyledTab,
  StyledTabs,
  TabPanel
} from '../../../../custom'
import {
  finance_icon,
  invest_and_savings_icon,
} from "../../../../../common/assets"

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Latex = require('react-latex');

function MarginCalculator() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [formAnimation, formApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(0px)' : 'translateX(0px)',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  }));
  const [resultAnimation, resultApi] = useSpring(() => ({
    transform: matches === true ? 'translateY(-200px)' : 'translateX(-210px)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  }));
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [tabValue, setTabValue] = React.useState(0);
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)
  const {
    tabRoot,
    rightTabContainer,
    leftTabContainer,
    formDisplay,
    formDisplay2
  }: any = useStyles()

  const [profitInitialValues] = React.useState({
    sales_revenue: "",
    cost: "",
  })
  const [profitResult, setProfitResult] = React.useState({
    profitMargin: 0,
    grossProfit: 0,
    markUp: 0,
    currency: ''
  })

  const [stockInitialValues] = React.useState({
    margin_requirement: "",
    stock_price: "",
    shares: "",
  })
  const [stockResult, setStockResult] = React.useState({
    amountRequired: 0,
    currency: ''
  })

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue)
  };

  return (
    <>
      <NavBar2
        pageimage={finance_icon}
        categoryname="Sales and Retail Calculators"
        pagename="Margin Calculator"
      />
      <AddLayout
        categorykey='sales'
        searchname='Sales and Retail Calculators'
        searchimage={invest_and_savings_icon}
      >
        <Grid
          container
          justifyContent="center"
        >
          <animated.div style={formAnimation}>
            <Box className={formDisplay2} >
              <StyledTabs variant="fullWidth" value={tabValue} onChange={handleChange}>
                <StyledTab
                  wrapped
                  label={CALCULATORS.profitMargin}
                  {...a11yProps(0)}
                />
                <StyledTab
                  wrapped
                  label={CALCULATORS.stockTradingMargin}
                  {...a11yProps(1)}
                />
              </StyledTabs>

              <TabPanel
                value={tabValue}
                index={0}
              >
                <Formik
                  initialValues={profitInitialValues}
                  onSubmit={async ({
                    sales_revenue,
                    cost,
                  }, { setSubmitting }) => {
                    const payload: ProfitMarginCalculatorI = {
                      sales_revenue,
                      cost,
                      method: 'profitMarginCalculator'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: profitMarginCalculator } = await calculateFinances(payload)
                      console.log('=====>', profitMarginCalculator)
                      const { profitMargin, grossProfit, markUp, currency } = profitMarginCalculator
                      if (typeof profitMarginCalculator === 'object') {
                        setProfitResult({
                          profitMargin: profitMargin,
                          grossProfit: grossProfit,
                          markUp: markUp,
                          currency: currency
                        })
                      }
                      if (success === true) {
                        setAnswer(success)
                        formApi.start({
                          transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                        });
                        resultApi.start({
                          transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                        })
                      }
                    } catch (err) {
                      console.log('====>', err)
                    }
                  }}
                >
                  {({ values, handleChange, handleSubmit, isSubmitting, resetForm }) => (
                    <form onSubmit={handleSubmit} className="form-container">
                      <FormRow>
                        <Label title={LABELS.salesRevenue} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="sales_revenue"
                          placeholder={PLACEHOLDERS.number}
                          value={values.sales_revenue}
                          onChange={handleChange}
                        />
                      </FormRow>

                      <FormRow>
                        <Label title={LABELS.cost} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="cost"
                          placeholder={PLACEHOLDERS.number}
                          value={values.cost}
                          onChange={handleChange}
                        />
                      </FormRow>


                      <FormRow buttons reset={() => resetForm()} />
                    </form>
                  )}
                </Formik>
              </TabPanel>

              <TabPanel
                value={tabValue}
                index={1}
              >
                <Formik
                  initialValues={stockInitialValues}
                  onSubmit={async ({
                    margin_requirement,
                    stock_price,
                    shares,
                  }, { setSubmitting }) => {
                    const payload: StockTradingMarginI = {
                      margin_requirement,
                      stock_price,
                      shares,
                      method: 'stockTradingMarginCalculator'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: stockTradingMarginCalculator } = await calculateFinances(payload)
                      console.log('=====>', stockTradingMarginCalculator)
                      const { amountRequired, currency } = stockTradingMarginCalculator
                      if (typeof stockTradingMarginCalculator === 'object') {
                        setStockResult({
                          amountRequired: amountRequired,
                          currency: currency
                        })
                      }
                      if (success === true) {
                        setAnswer(success)
                        formApi.start({
                          transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                        });
                        resultApi.start({
                          transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                        })
                      }
                    } catch (err) {
                      console.log('====>', err)
                    }
                  }}
                >
                  {({ values, handleChange, handleSubmit, isSubmitting, resetForm }) => (
                    <form onSubmit={handleSubmit} className="form-container">
                      <FormRow>
                        <Label title={LABELS.marginRequirement} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="margin_requirement"
                          placeholder={PLACEHOLDERS.number}
                          value={values.margin_requirement}
                          onChange={handleChange}
                        />
                      </FormRow>

                      <FormRow>
                        <Label title={LABELS.stockPrice} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="stock_price"
                          placeholder={PLACEHOLDERS.number}
                          value={values.stock_price}
                          onChange={handleChange}
                        />
                      </FormRow>

                      <FormRow>
                        <Label title={LABELS.shares} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="shares"
                          placeholder={PLACEHOLDERS.number}
                          value={values.shares}
                          onChange={handleChange}
                        />
                      </FormRow>

                      <FormRow buttons reset={() => resetForm()} />
                    </form>
                  )}
                </Formik>
              </TabPanel>

            </Box>
          </animated.div>

          {answer === true &&
            <ResultTabsContainer
              tabTitle={'Result'}
              animation={resultAnimation}
            >

              <Box className="text-wrap text-center">
                {tabValue === 0 &&
                  <Box sx={{ color: COLORS.text }}>
                    <Latex displayMode={true}>{LATEX.profitMargin}</Latex>

                    <Typography variant="subtitle1">
                      Profit margin: {profitResult.profitMargin}%
                    </Typography>
                    <Typography variant="subtitle1">
                      Gross profit: {profitResult.currency}{profitResult.grossProfit}
                    </Typography>
                    <Typography variant="subtitle1">
                      Mark up: {profitResult.markUp}%
                    </Typography>

                  </Box>
                }

                {tabValue === 1 &&
                  <Box sx={{ color: COLORS.text }}>
                    <Latex displayMode={true}>{LATEX.stockTradinfMargin}</Latex>

                    <Typography variant="subtitle1">
                      Amount required: {stockResult.currency}{stockResult.amountRequired}
                    </Typography>

                  </Box>
                }
              </Box>
            </ResultTabsContainer>
          }
        </Grid>
      </AddLayout>
    </>
  )
}

export default MarginCalculator
