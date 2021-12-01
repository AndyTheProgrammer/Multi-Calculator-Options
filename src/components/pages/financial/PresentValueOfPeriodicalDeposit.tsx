import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Grid, Container, Paper } from '@material-ui/core'
import { Formik } from 'formik'

import { PresentValueOfPeriodicalDepositI } from '../../../types'
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

const PresentValueOfPeriodicalDeposit = () => {
  const [value, setValue] = React.useState(0);
  const [initialFormValues] = React.useState({
    interest_rate: "",
    period_deposit: "",
    number_of_months: "",
    number_of_years: "",
  })
  const [Result, setResult] = React.useState({
    presentValue: 0,
    futureValue: 0,
    totalPrincipal: 0,
    totalInterest: 0,
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
                    {CALCULATORS.presentValueOfPeriodicalDeposit}
                  </Typography>
                </div>
              </StyledTabs>

              <NoIndexTabPanel>
                <Formik
                  initialValues={initialFormValues}
                  onSubmit={async ({
                    interest_rate,
                    period_deposit,
                    number_of_months,
                    number_of_years,
                  }, { setSubmitting, resetForm }) => {
                    const payload: PresentValueOfPeriodicalDepositI = {
                      interest_rate,
                      period_deposit,
                      number_of_months,
                      number_of_years,
                      method: 'presentValueOfPeriodDeposit'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { payload: presentValueOfPeriodicalDeposits } = await calculateFinances(payload)
                      console.log('=====>', presentValueOfPeriodicalDeposits)
                      const { presentValue, futureValue, totalPricipal, totalInterest, currency } = presentValueOfPeriodicalDeposits
                      if (typeof presentValueOfPeriodicalDeposits === 'object') {
                        setResult({
                          presentValue: presentValue,
                          futureValue: futureValue,
                          totalPrincipal: totalPricipal,
                          totalInterest: totalInterest,
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
                        <Label title={LABELS.periodDeposit} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="period_deposit"
                          placeholder={PLACEHOLDERS.number}
                          value={values.period_deposit}
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
                  <Typography variant="subtitle1"> Present value: {Result.currency}{Result.presentValue}</Typography>
                  <Typography variant="subtitle1"> Future value: {Result.currency}{Result.futureValue}</Typography>
                  <Typography variant="subtitle1"> Total principal: {Result.currency}{Result.totalPrincipal}</Typography>
                  <Typography variant="subtitle1"> Total interest: {Result.currency}{Result.totalInterest}</Typography>
                </div>
              </NoIndexTabPanel>
            </div>
          </Paper>
        </Grid>
      </Grid>




    </>
  )
}

export default PresentValueOfPeriodicalDeposit
