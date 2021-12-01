import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Grid, Container, Paper } from '@material-ui/core'
import { Formik } from 'formik'

import { AmortizedLoanFixedAmountI } from '../../../types'
import { calculateFinances } from '../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  COLORS
} from '../../../common/shared'
import {
  CustomTextInput,
  CustomBtn,
  CustomResetBtn,
  Label,
  StyledTabs,
  NoIndexTabPanel,
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

const AmortizedLoanFixedAmount = () => {
  const [initialFormValues] = React.useState({
    interest_rate: "",
    present_value: "",
    number_of_months: "",
    number_of_years: "",
  })
  const [Result, setResult] = React.useState({
    totalRepayment: 0,
    currency: ''
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
                    {CALCULATORS.amortizedLoanFixedAmount}
                  </Typography>
                </div>
              </StyledTabs>

              <NoIndexTabPanel>
                <Formik
                  initialValues={initialFormValues}
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
                      const { payload: amortizedLoanWithFixedAmount } = await calculateFinances(payload)
                      console.log('=====>', amortizedLoanWithFixedAmount)
                      const { totalRepayment, currency } = amortizedLoanWithFixedAmount
                      if (typeof amortizedLoanWithFixedAmount === 'object') {
                        setResult({
                          totalRepayment: totalRepayment,
                          currency: currency
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
                        <Label title={LABELS.numberOfMonths} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="number_of_months"
                          placeholder={PLACEHOLDERS.number}
                          value={values.number_of_months}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.presentValue} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="present_value"
                          placeholder={PLACEHOLDERS.number}
                          value={values.present_value}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.numberOfYears} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
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
                    Total Repayment: {Result.currency}{Result.totalRepayment}
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

export default AmortizedLoanFixedAmount
