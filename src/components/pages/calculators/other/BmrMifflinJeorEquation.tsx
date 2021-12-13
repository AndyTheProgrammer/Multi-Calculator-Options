import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { BmrMifflinJeorEquationI } from '../../../../types'
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

const BmrMifflinJeorEquation = () => {
  const [initialFormValues] = React.useState({
    height: '',
    height_unit: '',
    weight: '',
    weight_unit: '',
    gender: '',
    age: 0
  })
  const [Result, setResult] = React.useState({
    step1: 0,
    step2: 0,
    step3: 0,
    BMR: 0,
    unit: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.bmrMifflinJeorEquation} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            height,
            height_unit,
            weight,
            weight_unit,
            gender,
            age
          }, { setSubmitting, resetForm }) => {
            const payload: BmrMifflinJeorEquationI = {
              height,
              height_unit,
              weight,
              weight_unit,
              gender,
              age,
              method: 'BMRMifflinStJeor'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: MifflinJeor } = await calculateOthers(payload)
              console.log('=====>', MifflinJeor)
              if (typeof MifflinJeor === 'object') {
                const { step1, step2, step3, BMR, unit } = MifflinJeor
                setResult({
                  step1: step1,
                  step2: step2,
                  step3: step3,
                  BMR: BMR,
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
      <ResultTabsContainer tabTitle1={'Result'} sm={6}>
        <div className="text-center mb-3">
          <Typography variant="subtitle1">step1:{Result.step1} </Typography>
          <Typography variant="subtitle1">step2: {Result.step2}</Typography>
          <Typography variant="subtitle1">step3: {Result.step3}</Typography>
          <Typography variant="subtitle1">BMR: {Result.BMR}{Result.unit}</Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default BmrMifflinJeorEquation
