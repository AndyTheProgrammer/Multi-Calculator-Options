import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Grid, Container, Paper } from '@material-ui/core'
import { Formik } from 'formik'

import { MortgagePayOffWithoutLoanTermI } from '../../../types'
import { calculateFinances } from '../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  BUTTONS,
  LABELS,
  PLACEHOLDERS,
  IDS,
  INPUT_TYPE,
  COLORS
} from '../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  CustomBtn,
  CustomResetBtn,
  Label,
  StyledTab,
  StyledTabs,
  NoIndexTabPanel,
  TabPanel
} from '../../custom'

const useStyles = makeStyles((theme: Theme) => ({
  tabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 20,
  },
  leftTabContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '50%',
    height: '10%',
    float: 'inline-start',
  },
  rightTabContainer: {
    display: 'flex',
    background: COLORS.gradient,
    color: COLORS.light_text_color,
    justifyContent: 'center',
    width: '50%',
    height: '10%',
    float: 'inline-end',
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  paperBackground: {
    margin: theme.spacing(1),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 20,
  },
}));

const MortgagePayOffWithoutLoanTerm = () => {
  const [value, setValue] = React.useState(0);
  const [initialFormValues] = React.useState({
    interest_rate: "",
    principal_balance: "",
    monthly_payment: "",
  })
  const [Result, setResult] = React.useState({
    answer: 0,
    years: 0,
    months: 0,
  })
  const {
    tabRoot,
    rightTabContainer,
    leftTabContainer,
    paperBackground,
  } = useStyles()

  return (
    <>
      <Grid container item xs={12} sm={10}>
        {/* Form grid */}
        <Grid item xs={12} sm={8}>
          <Paper className={paperBackground}>
            <div className={tabRoot}>
              <StyledTabs>
                <div className={leftTabContainer}>
                  <Typography></Typography>
                </div>
                <div className={rightTabContainer}>
                  <Typography className="text-center">
                    {CALCULATORS.mortgagePayOffWithoutLoanTerm}
                  </Typography>
                </div>
              </StyledTabs>

              <NoIndexTabPanel>
                <Formik
                  initialValues={initialFormValues}
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
                      const { payload: mortgagePayoffCalculator } = await calculateFinances(payload)
                      console.log('=====>', mortgagePayoffCalculator)
                      const { answer, years, months } = mortgagePayoffCalculator
                      if (typeof mortgagePayoffCalculator === 'object') {
                        setResult({
                          answer: answer,
                          years: years,
                          months: months
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
                  )}
                </Formik>
              </NoIndexTabPanel>
            </div>
          </Paper>
        </Grid>

        {/* Result grid */}
        <Grid item xs={12} sm={4}>
          <Paper className={paperBackground}>
            <div className={tabRoot}>
              <StyledTabs>
                <div className={leftTabContainer}>
                  <Typography></Typography>
                </div>
                <div className={rightTabContainer}>
                  <Typography>Result</Typography>
                </div>
              </StyledTabs>

              <NoIndexTabPanel>
                <div className="text-center mb-3">
                  <Typography variant="subtitle1">
                    Answer: {Result.answer}
                  </Typography>
                  <Typography variant="subtitle1">
                    Payoff in: {Result.years} years and {Result.months} months
                  </Typography>
                </div>
              </NoIndexTabPanel>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default MortgagePayOffWithoutLoanTerm
