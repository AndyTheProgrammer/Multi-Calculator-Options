import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { EllipsoidVolumeCalculatorI } from '../../../../../types'
import { calculateMath } from '../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
} from '../../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  CustomBtn,
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../../custom'

const EllipsoidVolume = () => {
  const [initialFormValues] = React.useState({
    axis1: "",
    axis1_unit: "",
    axis2: "",
    axis2_unit: "",
    axis3: "",
    axis3_unit: "",
  })
  const [Result, setResult] = React.useState({
    Volume: 0,
    submitted_axis3: 0,
    submitted_axis2: 0,
    submitted_axis1: 0,
    units: '',
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle2={CALCULATORS.ellipsoidVol} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            axis1,
            axis1_unit,
            axis2,
            axis2_unit,
            axis3,
            axis3_unit,
          }, { setSubmitting, resetForm }) => {
            const payload: EllipsoidVolumeCalculatorI = {
              axis1,
              axis1_unit,
              axis2,
              axis2_unit,
              axis3,
              axis3_unit,
              method: 'EllipsoidVolumeCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: ellipsoidVolume } = await calculateMath(payload)
              console.log('=====>', ellipsoidVolume)
              const { volume, units, submittedaxis1, submitted_axis2, submitted_axis3 } = ellipsoidVolume
              if (typeof ellipsoidVolume === 'object') {
                setResult({
                  Volume: volume,
                  submitted_axis1: submittedaxis1,
                  submitted_axis2: submitted_axis2,
                  submitted_axis3: submitted_axis3,
                  units: units
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
                <Label title={LABELS.axis1} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="axis1"
                  placeholder={PLACEHOLDERS.number}
                  value={values.axis1}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="axis1_unit"
                  value={values.axis1_unit}
                  onChange={handleChange('axis1_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.axis2} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="axis2"
                  placeholder={PLACEHOLDERS.number}
                  value={values.axis2}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="axis2_unit"
                  value={values.axis2_unit}
                  onChange={handleChange('axis2_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.axis3} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="axis3"
                  placeholder={PLACEHOLDERS.number}
                  value={values.axis3}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="axis3_unit"
                  value={values.axis3_unit}
                  onChange={handleChange('axis3_unit')}
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
          <Typography variant="subtitle1"> Volume: {Result.Volume}</Typography>
          <Typography variant="subtitle1"> Submitted axis 1: {Result.submitted_axis1}</Typography>
          <Typography variant="subtitle1"> Submitted axis 2: {Result.submitted_axis2}</Typography>
          <Typography variant="subtitle1"> Submitted axis 3: {Result.submitted_axis3}</Typography>
          <Typography variant="subtitle1"> units: {Result.units}</Typography>
        </div>
      </ResultTabsContainer>


    </>
  )
}

export default EllipsoidVolume
