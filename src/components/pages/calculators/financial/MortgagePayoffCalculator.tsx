import React from 'react'
import { Formik } from 'formik'
import { Typography, Box, Grid, Paper } from '@mui/material'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../navbar/navbar2'
import AddLayout from '../../../layouts/AddLayout'
import { SimpleDialog } from "../../../content";
import useStyles from '../../../../styling/CustomStyles'
import { calculateFinances } from '../../../../services/AppCalculatorsApi'
import { MortgagePayOffWithoutLoanTermI, MortgagePayoffWithLoanTermI } from '../../../../types'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  COLORS,
  LATEX,
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomBtn,
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer,
  StyledTab,
  StyledTabs,
  TabPanel
} from '../../../custom'

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Latex = require('react-latex');

function MortgagePayoffCalculator() {
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
  const [calcName, setCalcName] = React.useState('If You Know the Remaining Loan Term');
  const {
    tabRoot,
    rightTabContainer,
    leftTabContainer,
    formDisplay,
    formDisplay2
  }: any = useStyles()

  const [knownLoanTermInitialValues] = React.useState({
    interest_rate: "",
    total_payments_years: "",
    payments_made_years: "",
    loan_amount: "",
  })
  const [knownResult, setKnownResult] = React.useState({
    balance: 0,
    currency: ''
  })

  const [unknownLoanTermInitialValues] = React.useState({
    interest_rate: "",
    principal_balance: "",
    monthly_payment: "",
  })
  const [unknownResult, setUnknownResult] = React.useState({
    answer: 0,
    years: 0,
    months: 0,
  })

  // Tab value change
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
    if (newValue === 0) {
      setCalcName("If You Know the Remaining Loan Term")
    } else if (newValue === 1) {
      setCalcName("If You Don't Know the Remaining Loan Term")
    }
  };

  return (
    <>
      <NavBar2
        pagename={`Mortgage Payoff Calculator - ${calcName}`}
      />
      <AddLayout>
        <Grid
          container
          justifyContent="center"
        >
          <animated.div style={formAnimation}>
            <Box className={formDisplay2} >
              <StyledTabs variant="fullWidth" value={tabValue} onChange={handleChange}>
                <StyledTab
                  wrapped
                  label={CALCULATORS.mortgagePayoffWithLoanTerm}
                  {...a11yProps(0)}
                />
                <StyledTab
                  wrapped
                  label={CALCULATORS.mortgagePayOffWithoutLoanTerm}
                  {...a11yProps(1)}
                />
              </StyledTabs>

              <TabPanel
                value={tabValue}
                index={0}
              >
                <Formik
                  initialValues={knownLoanTermInitialValues}
                  onSubmit={async ({
                    interest_rate,
                    total_payments_years,
                    payments_made_years,
                    loan_amount,
                  }, { setSubmitting }) => {
                    const payload: MortgagePayoffWithLoanTermI = {
                      interest_rate,
                      total_payments_years,
                      payments_made_years,
                      loan_amount,
                      method: 'mortagePayOffCalculatorWithLoanTerm'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: mortgagePayoffWithLoanTerm } = await calculateFinances(payload)
                      console.log('=====>', mortgagePayoffWithLoanTerm)
                      const { balance, currency } = mortgagePayoffWithLoanTerm
                      if (typeof mortgagePayoffWithLoanTerm === 'object') {
                        setKnownResult({
                          balance: balance,
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
                      <div className="form-row">
                        <Label title={LABELS.interestRate} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="interest_rate"
                          placeholder={PLACEHOLDERS.number}
                          value={values.interest_rate}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.paymentsMade} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="payments_made_years"
                          placeholder={PLACEHOLDERS.number}
                          value={values.payments_made_years}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.totalPaymentsperYear} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="total_payments_years"
                          placeholder={PLACEHOLDERS.number}
                          value={values.total_payments_years}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.loanAmount} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="loan_amount"
                          placeholder={PLACEHOLDERS.number}
                          value={values.loan_amount}
                          onChange={handleChange}
                        />
                      </div>

                      <div
                        className="form-row"
                        style={{ alignItems: 'center', justifyContent: 'space-between' }}
                      >
                        <CustomBtn />
                        <CustomResetBtn
                          onHandleClick={() => resetForm()}
                        />
                      </div>
                    </form>
                  )}
                </Formik>
              </TabPanel>

              <TabPanel
                value={tabValue}
                index={1}
              >
                <Formik
                  initialValues={unknownLoanTermInitialValues}
                  onSubmit={async ({
                    interest_rate,
                    principal_balance,
                    monthly_payment
                  }, { setSubmitting }) => {
                    const payload: MortgagePayOffWithoutLoanTermI = {
                      interest_rate,
                      principal_balance,
                      monthly_payment,
                      method: 'mortagePayOffCalculatorWithoutLoanTerm'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: mortgagePayoffCalculator } = await calculateFinances(payload)
                      console.log('=====>', mortgagePayoffCalculator)
                      const { answer, years, months } = mortgagePayoffCalculator
                      if (typeof mortgagePayoffCalculator === 'object') {
                        setUnknownResult({
                          answer: answer,
                          years: years,
                          months: months
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
                      <div className="form-row">
                        <Label title={LABELS.interestRate} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="interest_rate"
                          placeholder={PLACEHOLDERS.number}
                          value={values.interest_rate}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.principalBalance} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="principal_balance"
                          placeholder={PLACEHOLDERS.number}
                          value={values.principal_balance}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.monthlyPayment} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="monthly_payment"
                          placeholder={PLACEHOLDERS.number}
                          value={values.monthly_payment}
                          onChange={handleChange}
                        />
                      </div>

                      <div
                        className="form-row"
                        style={{ alignItems: 'center', justifyContent: 'space-between' }}
                      >
                        <CustomBtn />
                        <CustomResetBtn
                          onHandleClick={() => resetForm()}
                        />
                      </div>
                    </form>
                  )
                  }
                </Formik >
              </TabPanel>

            </Box>
          </animated.div>

          {answer === true &&
            <ResultTabsContainer
              tabTitle={'Result'}
              animation={resultAnimation}
            >

              <Box className="text-wrap">
                {tabValue === 0 &&
                  <Box sx={{ color: COLORS.text }}>
                    <Typography variant="subtitle1">
                      Balance: {knownResult.currency}{knownResult.balance}
                    </Typography>
                  </Box>
                }

                {tabValue === 1 &&
                  <Box sx={{ color: COLORS.text }}>
                    <Typography variant="subtitle1">
                      Answer: {unknownResult.answer}
                    </Typography>
                    <Typography variant="subtitle1">
                      Payoff in: {unknownResult.years} years and {unknownResult.months} months
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

export default MortgagePayoffCalculator
