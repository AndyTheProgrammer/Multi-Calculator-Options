import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { BodyMassIndexI } from '../../../../types'
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

const BodyMassIndex = () => {

  const [initialFormValues] = React.useState({
    height: '',
    height_unit: '',
    weight: '',
    weight_unit: ''
  })
  const [Result, setResult] = React.useState({
    weightInKg: 0,
    heightToMeter: 0,
    bmi: 0,
    unit: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.bodyMassIndex} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            height,
            height_unit,
            weight,
            weight_unit
          }, { setSubmitting, resetForm }) => {
            const payload: BodyMassIndexI = {
              height,
              height_unit,
              weight,
              weight_unit,
              method: 'bodyMassIndex'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: bodyMass } = await calculateOthers(payload)
              console.log('=====>', bodyMass)
              if (typeof bodyMass === 'object') {
                const { weightInKg, heightToMeter, bmi, unit } = bodyMass
                setResult({
                  weightInKg: weightInKg,
                  heightToMeter: heightToMeter,
                  bmi: bmi,
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
                <Label title={LABELS.height} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="height"
                  placeholder={PLACEHOLDERS.number}
                  value={values.height}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="height_unit"
                  measurement="length"
                  value={values.height_unit}
                  onChange={handleChange('height_unit')}
                />
              </div>

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
                  measurement="weight"
                  value={values.weight_unit}
                  onChange={handleChange('weight_unit')}
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
          <Typography variant="subtitle1">BMI: {Result.bmi}{Result.unit}</Typography>
          <Typography variant="subtitle1">Weight : {Result.weightInKg}</Typography>
          <Typography variant="subtitle1">Height : {Result.heightToMeter}</Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default BodyMassIndex
