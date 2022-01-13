import React from 'react'
import { Typography, Grid } from '@mui/material'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../../navbar/navbar2'
import AddLayout from '../../../../layouts/AddLayout'
import { RegularCycleOvulationI } from '../../../../../types'
import { calculateOthers } from '../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  HEALTH_PLACEHOLDERS,
} from '../../../../../common/shared'
import {
  CustomTextInput,
  Label,
  FormRow,
  FormTabsContainer,
  ResultTabsContainer,
  PlaceHolder,
} from '../../../../custom'
import {
  other_icon,
  health_calc_icon,
} from "../../../../../common/assets"

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
      <NavBar2
        pageimage={other_icon}
        categoryname="Health Calculators"
        pagename={CALCULATORS.regularCycleOvulation}
      />
      <AddLayout
        categorykey='health'
        searchname='Health Calculators'
        searchimage={health_calc_icon}
      >
        <Grid
          container
          justifyContent="center"
        >
          <PlaceHolder placeHolder={HEALTH_PLACEHOLDERS.regularCycleOvulation} />
          {/* Form grid */}
          <FormTabsContainer
            animation={formAnimation}
          >
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
                  const { success, payload: regularOvulationCycle } = await calculateOthers(payload)
                  console.log('=====>', regularOvulationCycle)
                  if (typeof regularOvulationCycle === 'object') {
                    const {
                      ovulationDay,
                      ovulationPeriod,
                      pregnancyTestDate,
                      NextPeriodStarts,
                      DueDate
                    } = regularOvulationCycle
                    setResult({
                      ovulationDay: ovulationDay,
                      ovulationPeriod: ovulationPeriod,
                      pregnancyTestDate: pregnancyTestDate,
                      nextPeriodStarts: NextPeriodStarts,
                      dueDate: DueDate
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
                  <FormRow>
                    <Label title={LABELS.previousCycleStartDate} />
                    <CustomTextInput
                      col
                      type={INPUT_TYPE.date}
                      id="previous_cycle_start_date"
                      placeholder={PLACEHOLDERS.number}
                      value={values.previous_cycle_start_date}
                      onChange={handleChange}
                    />
                  </FormRow>

                  <FormRow>
                    <Label title={LABELS.cycleDays} />
                    <CustomTextInput
                      col
                      type={INPUT_TYPE.text}
                      id="cycle_days"
                      placeholder={PLACEHOLDERS.number}
                      value={values.cycle_days}
                      onChange={handleChange}
                    />
                  </FormRow>

                  <FormRow buttons reset={() => resetForm()} />
                </form>
              )}
            </Formik>
          </FormTabsContainer>

          {/* Results grid */}
          {answer === true &&
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
          }

        </Grid>
      </AddLayout>
    </>
  )
}

export default RegularCycleOvulation
