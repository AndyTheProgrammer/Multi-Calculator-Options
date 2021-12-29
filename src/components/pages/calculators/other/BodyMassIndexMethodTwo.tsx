import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { BodyMassIndexMethodTwoI } from '../../../../types'
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

const BodyMassIndexMethodTwo = () => {
  const [methodTwoInitialValues] = React.useState({
    height: '',
    height_unit: '',
    weight: '',
    weight_unit: ''
  })
  const [methodTwoResult, setMethodTwoResult] = React.useState({
    weightInlbs: 0,
    heightToIn: 0,
    bmi: 0,
    unit: ''
  })
  const [methodTwoResult2, setMethodTwoResult2] = React.useState({
    weightInlbs: 0,
    heightToIn: 0,
    bmi: 0,
    unit: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.bodyMassIndexMethodTwo}>
        <Formik
          initialValues={methodTwoInitialValues}
          onSubmit={async ({
            height,
            height_unit,
            weight,
            weight_unit
          }, { setSubmitting }) => {
            const payload: BodyMassIndexMethodTwoI = {
              height,
              height_unit,
              weight,
              weight_unit,
              method: 'bodyMassIndexTwo'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: bodyMassTwo } = await calculateOthers(payload)
              console.log('=====>', bodyMassTwo)
              if (typeof bodyMassTwo === 'object') {
                const { bmi, unit, heightToIn, weightInlbs } = bodyMassTwo
                setMethodTwoResult({
                  bmi: bmi,
                  heightToIn: heightToIn,
                  weightInlbs: weightInlbs,
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

                <CustomResetBtn
                  onHandleClick={() => resetForm()}
                />
                <CustomBtn />
              </div>
            </form>
          )}
        </Formik>
      </FormTabsContainer>

      {/* Results grid */}
      <ResultTabsContainer tabTitle={'Result'} >
        <div className="mb-3">
          <Typography variant="subtitle1">
            BMI:{methodTwoResult.bmi}{methodTwoResult.unit}<sup>2</sup>
          </Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default BodyMassIndexMethodTwo
