import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { ElapsedTimeMethodI } from '../../../../types'
import { calculateOthers } from '../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  CustomBtn,
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../custom'

const ElapsedTimeMethod = () => {
  const [initialFormValues] = React.useState({
    weight: "",
    weight_unit: "",
    time: "",
    time_unit: "",
  })
  const [Result, setResult] = React.useState({
    elapsedTime: 0,
    unit: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle2={CALCULATORS.elapsedTimeMethod} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            weight,
            weight_unit,
            time,
            time_unit,
          }, { setSubmitting, resetForm }) => {
            const payload: ElapsedTimeMethodI = {
              weight,
              weight_unit,
              time,
              time_unit,
              method: 'TheElapsedTimeMethod'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: elapsedTimeMethod } = await calculateOthers(payload)
              console.log('=====>', elapsedTimeMethod)
              const { elapsedTime, unit,
              } = elapsedTimeMethod
              if (typeof elapsedTimeMethod === 'object') {
                setResult({
                  elapsedTime: elapsedTime,
                  unit: unit
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
                <Label title={LABELS.weight} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="weight"
                  placeholder={PLACEHOLDERS.number}
                  value={values.weight}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="weight_unit"
                  value={values.weight_unit}
                  onChange={handleChange('weight_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.time} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="time"
                  placeholder={PLACEHOLDERS.number}
                  value={values.time}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="time_unit"
                  value={values.time_unit}
                  onChange={handleChange('time_unit')}
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
          <Typography variant="subtitle1"> Elapsed Time: {Result.elapsedTime}{Result.unit}</Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default ElapsedTimeMethod
