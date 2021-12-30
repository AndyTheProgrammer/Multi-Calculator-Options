import React from 'react'
import { Formik } from 'formik'
import { Typography, Box, Grid, Paper } from '@mui/material'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../navbar/navbar2'
import AddLayout from '../../../layouts/AddLayout'
import useStyles from '../../../../styling/CustomStyles'
import { calculateFinances } from '../../../../services/AppCalculatorsApi'
import { AmortizedLoanFixedAmountI, BondPayBackPredeterminedI, DeferredPaymentsLumpsumAtMaturityI } from '../../../../types'
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

function LoanCalculator() {
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
  const [calcName, setCalcName] = React.useState('Amortized Loan: Paying Back a Fixed Amount Periodically');
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)
  const {
    tabRoot,
    rightTabContainer,
    leftTabContainer,
    formDisplay,
    formDisplay2
  }: any = useStyles()

  const [amortizedLoanInitialValues] = React.useState({
    interest_rate: "",
    present_value: "",
    number_of_months: "",
    number_of_years: "",
  })
  const [amortizedLoanResult, setAmortizedLoanResult] = React.useState({
    paymentEveryMonth: 0,
    totalPayments: 0,
    totalInterest: 0,
    currency: ''
  })

  const [bondInitialValues] = React.useState({
    interest_rate: "",
    predetermined_amount: "",
    number_of_months: "",
    number_of_years: "",
  })
  const [bondResult, setBondResult] = React.useState({
    monthlyRepayments: 0,
    totalAmountRepayable: 0,
    currency: ''
  })

  const [deferredInitialValues] = React.useState({
    interest_rate: "",
    loan_amount: "",
    number_of_months: "",
    number_of_years: "",
  })
  const [deferredResult, setDeferredResult] = React.useState({
    amountDueAtLoanMaturity: 0,
    totalInterest: 0,
    currency: ''
  })

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue)
    if (newValue === 0) {
      setCalcName("Amortized Loan: Paying Back a Fixed Amount Periodically")
    } else if (newValue === 1) {
      setCalcName("Deferred Payment Loan: Paying Back a Lump Sum Due at Maturity")
    }
    else if (newValue === 2) {
      setCalcName("Bond: Paying Back a Predetermined Amount Due at Loan Maturity")
    }
  };

  return (
    <>
      <NavBar2
        pagename={`Loan Calculator - ${calcName}`}
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
                  label={CALCULATORS.amortizedLoan}
                  {...a11yProps(0)}
                />
                <StyledTab
                  wrapped
                  label={CALCULATORS.deferredPaymentsLoan}
                  {...a11yProps(1)}
                />
                <StyledTab
                  wrapped
                  label={CALCULATORS.bondPayBackPredetermined}
                  {...a11yProps(2)}
                />
              </StyledTabs>

              <TabPanel
                value={tabValue}
                index={0}
              >
                <Formik
                  initialValues={amortizedLoanInitialValues}
                  onSubmit={async ({
                    interest_rate,
                    present_value,
                    number_of_months,
                    number_of_years,
                  }, { setSubmitting }) => {
                    const payload: AmortizedLoanFixedAmountI = {
                      interest_rate,
                      present_value,
                      number_of_months,
                      number_of_years,
                      method: 'amortizedLoanFixeAmount'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: amortizedLoanWithFixedAmount } = await calculateFinances(payload)
                      console.log('=====>', amortizedLoanWithFixedAmount)
                      const { totalRepayment, currency } = amortizedLoanWithFixedAmount
                      if (typeof amortizedLoanWithFixedAmount === 'object') {
                        setAmortizedLoanResult({
                          paymentEveryMonth: 0,
                          totalPayments: 0,
                          totalInterest: 0,
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
                          col
                          type={INPUT_TYPE.text}
                          id="interest_rate"
                          placeholder={PLACEHOLDERS.number}
                          value={values.interest_rate}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.numberOfMonths} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="number_of_months"
                          placeholder={PLACEHOLDERS.number}
                          value={values.number_of_months}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.presentValue} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="present_value"
                          placeholder={PLACEHOLDERS.number}
                          value={values.present_value}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.numberOfYears} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="number_of_years"
                          placeholder={PLACEHOLDERS.number}
                          value={values.number_of_years}
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
                  initialValues={bondInitialValues}
                  onSubmit={async ({
                    interest_rate,
                    predetermined_amount,
                    number_of_months,
                    number_of_years,
                  }, { setSubmitting }) => {
                    const payload: BondPayBackPredeterminedI = {
                      interest_rate,
                      predetermined_amount,
                      number_of_months,
                      number_of_years,
                      method: 'bondPayBackPredeterminedAmountAtLoanMaturity'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: bondPaybackWithPredeterminedAmount } = await calculateFinances(payload)
                      console.log('=====>', bondPaybackWithPredeterminedAmount)
                      const { monthlyRepayments, totalAmountRepayable, currency } = bondPaybackWithPredeterminedAmount
                      if (typeof bondPaybackWithPredeterminedAmount === 'object') {
                        setBondResult({
                          monthlyRepayments: monthlyRepayments,
                          totalAmountRepayable: totalAmountRepayable,
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
                          col
                          type={INPUT_TYPE.text}
                          id="interest_rate"
                          placeholder={PLACEHOLDERS.number}
                          value={values.interest_rate}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.predeterminedAmount} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="predetermined_amount"
                          placeholder={PLACEHOLDERS.number}
                          value={values.predetermined_amount}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.numberOfMonths} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="number_of_months"
                          placeholder={PLACEHOLDERS.number}
                          value={values.number_of_months}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.numberOfYears} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="number_of_years"
                          placeholder={PLACEHOLDERS.number}
                          value={values.number_of_years}
                          onChange={handleChange}
                        />
                      </div>

                      <div
                        className="form-row"
                        style={{ alignItems: 'center', justifyContent: 'space-between' }}
                      >

                        <CustomResetBtn
                          onHandleClick={() => resetForm()}
                        />
                        <CustomBtn />
                      </div>
                    </form>
                  )}
                </Formik>
              </TabPanel>

              <TabPanel
                value={tabValue}
                index={2}
              >
                <Formik
                  initialValues={deferredInitialValues}
                  onSubmit={async ({
                    interest_rate,
                    loan_amount,
                    number_of_months,
                    number_of_years,
                  }, { setSubmitting }) => {
                    const payload: DeferredPaymentsLumpsumAtMaturityI = {
                      interest_rate,
                      loan_amount,
                      number_of_months,
                      number_of_years,
                      method: 'DeferedPaymentLumpSumAtMaturity'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: deferedPaymentLumpsumAtMaturity } = await calculateFinances(payload)
                      console.log('=====>', deferedPaymentLumpsumAtMaturity)
                      const { amountDueAtLoanMaturity, totalInterest, currency } = deferedPaymentLumpsumAtMaturity
                      if (typeof deferedPaymentLumpsumAtMaturity === 'object') {
                        setDeferredResult({
                          amountDueAtLoanMaturity: amountDueAtLoanMaturity,
                          totalInterest: totalInterest,
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
                          col
                          type={INPUT_TYPE.text}
                          id="interest_rate"
                          placeholder={PLACEHOLDERS.number}
                          value={values.interest_rate}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.creditCardBalance} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="loan_amount"
                          placeholder={PLACEHOLDERS.number}
                          value={values.loan_amount}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.numberOfMonths} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="number_of_months"
                          placeholder={PLACEHOLDERS.number}
                          value={values.number_of_months}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.numberOfYears} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="number_of_years"
                          placeholder={PLACEHOLDERS.number}
                          value={values.number_of_years}
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
                    <Latex displayMode={true}>{LATEX.amortizedLoan}</Latex>
                    <Typography variant="subtitle1">
                      Payment Every Month: {amortizedLoanResult.currency}{amortizedLoanResult.paymentEveryMonth}
                    </Typography>
                    <Typography variant="subtitle1">
                      Payments Total: {amortizedLoanResult.currency}{amortizedLoanResult.totalPayments}
                    </Typography>
                    <Typography variant="subtitle1">
                      Total Interest: {amortizedLoanResult.currency}{amortizedLoanResult.totalInterest}
                    </Typography>
                  </Box>
                }

                {tabValue === 1 &&
                  <Box sx={{ color: COLORS.text }}>
                    <Latex displayMode={true}>{LATEX.bondPayback}</Latex>
                    <Typography variant="subtitle1">
                      Your monthly repayments: {bondResult.currency}{bondResult.monthlyRepayments}
                    </Typography>
                    <Typography variant="subtitle1">
                      Total amount repayments: {bondResult.currency}{bondResult.totalAmountRepayable}
                    </Typography>
                  </Box>
                }

                {tabValue === 2 &&
                  <Box sx={{ color: COLORS.text }}>
                    <Latex displayMode={true}>{LATEX.deferredPayment}</Latex>
                    <Typography variant="subtitle1">
                      Amount due at loan maturity: {deferredResult.currency}{deferredResult.amountDueAtLoanMaturity}
                    </Typography>
                    <Typography variant="subtitle1">
                      Total interest: {deferredResult.currency}{deferredResult.totalInterest}
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

export default LoanCalculator
