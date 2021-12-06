import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

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

  const [initialFormValues] = React.useState({
    cycle_days: '',
    previous_cycle_start_date: ''
  })
  const [Result, setResult] = React.useState({
    importantDatesForCurrentCycle: "",
    importantDatesNextSixCycles: ""
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle2={CALCULATORS.regularCycleOvulation} sm={6}>
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
      </FormTabsContainer>

      {/* Results grid */}
      <ResultTabsContainer tabTitle2={'Result'} sm={6}>
        <div className="text-center mb-3">
          <Typography variant="subtitle1">
            Important dates for current cycle: {Result.importantDatesForCurrentCycle}
          </Typography>
          <Typography variant="subtitle1">
            Important dates for next 6 cycles: {Result.importantDatesNextSixCycles}
          </Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default RegularCycleOvulation
