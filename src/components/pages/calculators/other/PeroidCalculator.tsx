import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

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
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.peroidCalculator} sm={6}>
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
              const { payload: periodCalculator } = await calculateOthers(payload)
              console.log('=====>', periodCalculator)
              if (typeof periodCalculator === 'object') {
                const { startDateForNextperid, endDateForNextPerid } = periodCalculator
                setResult({
                  startdateForNextPeriod: startDateForNextperid,
                  endDateForNextPeriod: endDateForNextPerid
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
      <ResultTabsContainer tabTitle1={'Result'} sm={6}>
        <div className="text-center mb-3">
          <Typography variant="subtitle1">
            Start date for next peroid: {Result.startdateForNextPeriod}
          </Typography>

          <Typography variant="subtitle1">
            End date for next peroid: {Result.endDateForNextPeriod}
          </Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default PeroidCalculator
