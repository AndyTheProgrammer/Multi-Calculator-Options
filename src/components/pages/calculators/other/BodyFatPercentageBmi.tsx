import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { BodyFatPercentageBmiI } from '../../../../types'
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

const BodyFatPercentageBmi = () => {

  const [initialFormValues] = React.useState({
    height: '',
    height_unit: '',
    weight: '',
    weight_unit: '',
    gender: '',
    age: '',
  })
  const [Result, setResult] = React.useState({
    BFI: 0,
    BMI: 0
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle2={CALCULATORS.bodyFatPercentageBmi} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            height,
            height_unit,
            weight,
            weight_unit,
            gender,
            age,
          }, { setSubmitting, resetForm }) => {
            const payload: BodyFatPercentageBmiI = {
              height,
              height_unit,
              weight,
              weight_unit,
              gender,
              age,
              method: 'BodyMassIndexBFP'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: BodyFatPercentage } = await calculateOthers(payload)
              console.log('=====>', BodyFatPercentage)
              if (typeof BodyFatPercentage === 'object') {
                const { BMI, BFI } = BodyFatPercentage
                setResult({
                  BMI: BMI,
                  BFI: BFI
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

              <div className="form-row">
                <Label title={LABELS.gender} />
                <CustomSelect
                  id="gender"
                  measurement="gender"
                  value={values.gender}
                  onChange={handleChange('gender')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.age} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="age"
                  placeholder={PLACEHOLDERS.number}
                  value={values.age}
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
          <Typography variant="subtitle1">BFI: {Result.BFI}</Typography>
          <Typography variant="subtitle1">BMI: {Result.BMI}</Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default BodyFatPercentageBmi
