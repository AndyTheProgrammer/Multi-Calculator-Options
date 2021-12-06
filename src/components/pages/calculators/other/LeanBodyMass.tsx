import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { LeanBodyMassI } from '../../../../types'
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

const LeanBodyMass = () => {

  const [initialFormValues] = React.useState({
    height: '',
    height_unit: '',
    weight: '',
    weight_unit: '',
    gender: ''
  })
  const [Result, setResult] = React.useState({
    leanBodyMass: 0
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle2={CALCULATORS.leanBodyMass} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            height,
            height_unit,
            weight,
            weight_unit,
            gender
          }, { setSubmitting }) => {
            const payload: LeanBodyMassI = {
              height,
              height_unit,
              weight,
              weight_unit,
              gender,
              method: 'LeanBodyMass'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: leanBodyMassFormula } = await calculateOthers(payload)
              console.log('=====>', leanBodyMassFormula)
              if (typeof leanBodyMassFormula === 'object') {
                const { leanBodyMass } = leanBodyMassFormula
                setResult({
                  leanBodyMass: leanBodyMass,
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
            Lean body mass: {Result.leanBodyMass}
          </Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default LeanBodyMass
