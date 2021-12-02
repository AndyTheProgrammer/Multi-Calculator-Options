import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Grid, Paper } from '@material-ui/core'
import { Formik } from 'formik'

import { RegularCycleOvulationI } from '../../../types'
import { calculateHealth } from '../../../services/AppCalculatorsApi'
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

const RegularCycleOvulation = () => {

  const [initialFormValues] = React.useState({
    cycle_days: '',
    previous_cycle_start_date: ''
  })
  const [Result, setResult] = React.useState({
    importantDatesForCurrentCycle: "",
    importantDatesNextSixCycles: ""
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
                  {CALCULATORS.regularCycleOvulation}
                </Typography>
              </div>
            </StyledTabs>

            <NoIndexTabPanel>
              <Formik
                initialValues={initialFormValues}
                onSubmit={async ({
                  cycle_days,
                  previous_cycle_start_date
                }, { setSubmitting }) => {
                  const payload: RegularCycleOvulationI = {
                    cycle_days,
                    previous_cycle_start_date,
                    method: 'regularCycleOvulationCalculator'
                  }
                  console.log(JSON.stringify(payload))
                  try {
                    const { payload: regularOvulationCycle } = await calculateHealth(payload)
                    console.log('=====>', regularOvulationCycle)
                    if (typeof regularOvulationCycle === 'object') {
                      const { importantDatesForCurrentCycle, importantDatesNextSixCycles } = regularOvulationCycle
                      setResult({
                        importantDatesForCurrentCycle: importantDatesForCurrentCycle,
                        importantDatesNextSixCycles: importantDatesNextSixCycles
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
                      <Label title={LABELS.previousCycleStartDate} />
                      <CustomTextInput
                        type={INPUT_TYPE.date}
                        id="previous_cycle_start_date"
                        placeholder={PLACEHOLDERS.number}
                        value={values.previous_cycle_start_date}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-row">
                      <Label title={LABELS.cycleDays} />
                      <CustomTextInput
                        type={INPUT_TYPE.number}
                        id="cycle_days"
                        placeholder={PLACEHOLDERS.number}
                        value={values.cycle_days}
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
                  Important dates for current cycle: {Result.importantDatesForCurrentCycle}
                </Typography>
                <Typography variant="subtitle1">
                  Important dates for next 6 cycles: {Result.importantDatesNextSixCycles}
                </Typography>
              </div>
            </NoIndexTabPanel>
          </div>
        </Paper>
      </Grid>
    </>
  )
}

export default RegularCycleOvulation
