import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { BmrMifflinHarrisBenedictI } from '../../../../types'
import { calculateHealth } from '../../../../services/AppCalculatorsApi'
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

const BmrMifflinHarrisBenedict = () => {

  const [initialFormValues] = React.useState({
    height: '',
    height_unit: '',
    weight: '',
    weight_unit: '',
    gender: '',
    age: 0
  })
  const [Result, setResult] = React.useState({
    BMR: 0,
    unit: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle2={CALCULATORS.bmrMifflinHarrisBenedict} sm={6}>
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
            const payload: BmrMifflinHarrisBenedictI = {
              height,
              height_unit,
              weight,
              weight_unit,
              gender,
              age,
              method: 'BMRHarrisBenedict'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: MifflinHarris } = await calculateHealth(payload)
              console.log('=====>', MifflinHarris)
              if (typeof MifflinHarris === 'object') {
                const { BMR, unit } = MifflinHarris
                setResult({
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
          <Typography variant="subtitle1">
            BMR: {Result.BMR}{Result.unit}
          </Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default BmrMifflinHarrisBenedict
