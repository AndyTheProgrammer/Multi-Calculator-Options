import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { BodyFatPercentageI } from '../../../../types'
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
    neck: '',
    neck_unit: '',
    height: '',
    height_unit: '',
    waist: '',
    waist_unit: '',
    gender: '',
    hip: '',
    hip_unit: ''
  })
  const [Result, setResult] = React.useState({
    BFP: 0,
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.bodyFatPercentageBmi} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            neck,
            neck_unit,
            height,
            height_unit,
            waist,
            waist_unit,
            gender,
            hip,
            hip_unit
          }, { setSubmitting, resetForm }) => {
            const payload: BodyFatPercentageI = {
              neck,
              neck_unit,
              height,
              height_unit,
              waist,
              waist_unit,
              gender,
              hip,
              hip_unit,
              method: 'BodyFatCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: bodyFatPercentage } = await calculateOthers(payload)
              console.log('=====>', bodyFatPercentage)
              if (typeof bodyFatPercentage === 'object') {
                const { BFP } = bodyFatPercentage
                setResult({
                  BFP: BFP
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
                <Label title={LABELS.waist} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="waist"
                  placeholder={PLACEHOLDERS.number}
                  value={values.waist}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="waist_unit"
                  measurement="length"
                  value={values.waist_unit}
                  onChange={handleChange('waist_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.neck} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="neck"
                  placeholder={PLACEHOLDERS.number}
                  value={values.neck}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="neck_unit"
                  measurement="length"
                  value={values.neck_unit}
                  onChange={handleChange('neck_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.hip} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="hip"
                  placeholder={PLACEHOLDERS.number}
                  value={values.hip}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="hip_unit"
                  measurement="length"
                  value={values.hip_unit}
                  onChange={handleChange('hip_unit')}
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
      <ResultTabsContainer tabTitle1={'Result'} sm={6}>
        <div className="text-center mb-3">
          <Typography variant="subtitle1">Body Fat Percentage: {Result.BFP}</Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default BodyFatPercentageBmi
