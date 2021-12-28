import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { RegularCycleOvulationI } from '../../../../types'
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

const RegularCycleOvulation = () => {
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
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)
  const [initialFormValues] = React.useState({
    cycle_days: '',
    previous_cycle_start_date: ''
  })
  const [Result, setResult] = React.useState({
    ovulationDay: "",
    ovulationPeriod: "",
    pregnancyTestDate: '',
    nextPeriodStarts: '',
    dueDate: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.regularCycleOvulation} animation={formAnimation}>
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
              const { payload: regularOvulationCycle } = await calculateOthers(payload)
              console.log('=====>', regularOvulationCycle)
              if (typeof regularOvulationCycle === 'object') {
                const {
                  ovulationDay,
                  ovulationPeriod,
                  pregnancyTestDate,
                  NextPeriodStarts,
                  dueDate } = regularOvulationCycle
                setResult({
                  ovulationDay: ovulationDay,
                  ovulationPeriod: ovulationPeriod,
                  pregnancyTestDate: pregnancyTestDate,
                  nextPeriodStarts: NextPeriodStarts,
                  dueDate: dueDate
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
      </FormTabsContainer>

      {/* Results grid */}
      <ResultTabsContainer tabTitle={'Result'} animation={resultAnimation}>
        <div className="mb-3">
          <Typography variant="subtitle1">
            Ovulation day: {Result.ovulationDay}
          </Typography>

          <Typography variant="subtitle1">
            Ovulation period: {Result.ovulationPeriod}
          </Typography>

          <Typography variant="subtitle1">
            Pregnancy test date: {Result.pregnancyTestDate}
          </Typography>

          <Typography variant="subtitle1">
            Next period starts: {Result.nextPeriodStarts}
          </Typography>

          <Typography variant="subtitle1">
            Due date: {Result.dueDate}
          </Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default RegularCycleOvulation
