import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Grid, Container, Paper } from '@material-ui/core'
import { Formik } from 'formik'

import { PresentValueI } from '../../../types'
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

const PresentValue = () => {
  const [value, setValue] = React.useState(0);
  const [initialFormValues] = React.useState({
    interest_rate: "",
    predetermined_amount: "",
    number_of_months: "",
    number_of_years: "",
  })
  const [Result, setResult] = React.useState({
    PV: 0,
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
                  {CALCULATORS.presentValue}
                </Typography>
              </div>
            </StyledTabs>

            <NoIndexTabPanel>
              <Formik
                initialValues={initialFormValues}
                onSubmit={async ({
                  interest_rate,
                  predetermined_amount,
                  number_of_months,
                  number_of_years,
                }, { setSubmitting, resetForm }) => {
                  const payload: PresentValueI = {
                    interest_rate,
                    predetermined_amount,
                    number_of_months,
                    number_of_years,
                    method: 'presentValue'
                  }
                  console.log(JSON.stringify(payload))
                  try {
                    const { payload: presentValueOfFutureMoney } = await calculateFinances(payload)
                    console.log('=====>', presentValueOfFutureMoney)
                    const { PV, totalInterest, currency } = presentValueOfFutureMoney
                    if (typeof presentValueOfFutureMoney === 'object') {
                      setResult({
                        PV: PV,
                        totalInterest: totalInterest,
                        currency: currency
                      })
                    }
                    resetForm()
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
                      <Label title={LABELS.predeterminedAmount} />
                      <CustomTextInput
                        type={INPUT_TYPE.number}
                        id="predetermined_amount"
                        placeholder={PLACEHOLDERS.number}
                        value={values.predetermined_amount}
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
                <Typography variant="subtitle1"> Present value: {Result.currency}{Result.PV}</Typography>
                <Typography variant="subtitle1"> Total interest: {Result.currency}{Result.totalInterest}</Typography>
              </div>
            </NoIndexTabPanel>
          </div>
        </Paper>
      </Grid>
    </>
  )
}

export default PresentValue
