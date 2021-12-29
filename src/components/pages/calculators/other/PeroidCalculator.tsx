import React from 'react'
import { Typography, Grid } from '@mui/material'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../navbar/navbar2'
import AddLayout from '../../../layouts/AddLayout'
import { PeroidCalculatorI } from '../../../../types'
import { calculateOthers } from '../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomBtn,
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../custom'

const PeroidCalculator = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [formAnimation, formApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(100px)' : 'translateX(0px)',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [resultAnimation, resultApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [initialFormValues] = React.useState({
    start_date_of_last_cycle: '',
    cycle_length: '',
    last_period_days: ''
  })
  const [Result, setResult] = React.useState({
    startdateForNextPeriod: '',
    endDateForNextPeriod: ''
  })

  return (
    <>
      <NavBar2 pagename={CALCULATORS.peroidCalculator} />
      <AddLayout>
        <Grid
          container
          justifyContent="center"
        >
          {/* Form grid */}
          <FormTabsContainer
            animation={formAnimation}
          >
            <Formik
              initialValues={initialFormValues}
              onSubmit={async ({
                start_date_of_last_cycle,
                cycle_length,
                last_period_days,
              }, { setSubmitting }) => {
                const payload: PeroidCalculatorI = {
                  start_date_of_last_cycle,
                  cycle_length,
                  last_period_days,
                  method: 'PeriodCalculator'
                }
                console.log(JSON.stringify(payload))
                try {
                  const { success, payload: periodCalculator } = await calculateOthers(payload)
                  console.log('=====>', periodCalculator)
                  if (typeof periodCalculator === 'object') {
                    const { startDateForNextperid, endDateForNextPerid } = periodCalculator
                    setResult({
                      startdateForNextPeriod: startDateForNextperid,
                      endDateForNextPeriod: endDateForNextPerid
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
                    <Label title={LABELS.previousCycleStartDate} />
                    <CustomTextInput
                      type={INPUT_TYPE.date}
                      id="start_date_of_last_cycle"
                      placeholder={PLACEHOLDERS.number}
                      value={values.start_date_of_last_cycle}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-row">
                    <Label title={LABELS.cycleLength} />
                    <CustomTextInput
                      type={INPUT_TYPE.number}
                      id="cycle_length"
                      placeholder={PLACEHOLDERS.number}
                      value={values.cycle_length}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-row">
                    <Label title={LABELS.lastPeriodDays} />
                    <CustomTextInput
                      type={INPUT_TYPE.number}
                      id="last_period_days"
                      placeholder={PLACEHOLDERS.number}
                      value={values.last_period_days}
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
          </FormTabsContainer>

          {/* Results grid */}
          {answer === true &&
            <ResultTabsContainer tabTitle={'Result'} animation={resultAnimation}>
              <div className="mb-3">
                <Typography variant="subtitle1">
                  Start date for next peroid: {Result.startdateForNextPeriod}
                </Typography>

                <Typography variant="subtitle1">
                  End date for next peroid: {Result.endDateForNextPeriod}
                </Typography>
              </div>
            </ResultTabsContainer>
          }
        </Grid>
      </AddLayout>
    </>
  )
}

export default PeroidCalculator
