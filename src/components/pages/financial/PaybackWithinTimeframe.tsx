import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Grid, Container, Paper } from '@material-ui/core'
import { Formik } from 'formik'

import { PaybackWithinTimeframeI } from '../../../types'
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

const PaybackWithinTimeframe = () => {
  const [value, setValue] = React.useState(0);
  const [initialFormValues] = React.useState({
    interest_rate: "",
    credit_card_balance: "",
    months: "",
    year: "",
  })
  const [Result, setResult] = React.useState({
    paybackPeriod: 0,
    duration: ''
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
                  {CALCULATORS.paybackWithinTimeFrame}
                </Typography>
              </div>
            </StyledTabs>

            <NoIndexTabPanel>
              <Formik
                initialValues={initialFormValues}
                onSubmit={async ({
                  interest_rate,
                  credit_card_balance,
                  months,
                  year,
                }, { setSubmitting }) => {
                  const payload: PaybackWithinTimeframeI = {
                    interest_rate,
                    credit_card_balance,
                    months,
                    year,
                    method: 'PaybackWithinCertainTimeframe'
                  }
                  console.log(JSON.stringify(payload))
                  try {
                    const { payload: paybackWithinACertainTimeframe } = await calculateFinances(payload)
                    console.log('=====>', paybackWithinACertainTimeframe)
                    const { paybackPeriod, duration } = paybackWithinACertainTimeframe
                    if (typeof paybackWithinACertainTimeframe === 'object') {
                      setResult({
                        paybackPeriod: paybackPeriod,
                        duration: duration
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
                      <Label title={LABELS.months} />
                      <CustomTextInput
                        type={INPUT_TYPE.number}
                        id="months"
                        placeholder={PLACEHOLDERS.number}
                        value={values.months}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-row">
                      <Label title={LABELS.creditCardBalance} />
                      <CustomTextInput
                        type={INPUT_TYPE.number}
                        id="credit_card_balance"
                        placeholder={PLACEHOLDERS.number}
                        value={values.credit_card_balance}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-row">
                      <Label title={LABELS.year} />
                      <CustomTextInput
                        type={INPUT_TYPE.number}
                        id="year"
                        placeholder={PLACEHOLDERS.number}
                        value={values.year}
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
                  Payback period: {Result.paybackPeriod}{Result.duration}
                </Typography>
              </div>
            </NoIndexTabPanel>
          </div>
        </Paper>
      </Grid>

    </>
  )
}

export default PaybackWithinTimeframe
