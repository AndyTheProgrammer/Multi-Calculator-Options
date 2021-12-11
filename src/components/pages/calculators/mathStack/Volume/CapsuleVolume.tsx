import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { CapsuleVolumeCalculatorI } from '../../../../../types'
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

const CapsuleVolume = () => {
  const [initialFormValues] = React.useState({
    radius: "",
    radius_unit: "",
    height: "",
    height_unit: "",
  })
  const [Result, setResult] = React.useState({
    volumeInRadiusUnit: 0,
    volumeInHeightUnit: 0,
    radiusInheightUnit: 0,
    heightInradiusUnit: 0,
    submittedradius: 0,
    submitted_height: 0,
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.capsuleVol} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            radius,
            radius_unit,
            height,
            height_unit,
          }, { setSubmitting, resetForm }) => {
            const payload: CapsuleVolumeCalculatorI = {
              radius,
              radius_unit,
              height,
              height_unit,
              method: 'CapsuleVolumeCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: capsuleVolume } = await calculateMath(payload)
              console.log('=====>', capsuleVolume)
              if (typeof capsuleVolume === 'object') {
                //For now only working if you use different units
                const { volumeInRadiusUnit,
                  volumeInHeightUnit,
                  radiusInheightUnit,
                  heightInradiusUnit,
                  submittedradius,
                  submitted_height } = capsuleVolume
                setResult({
                  volumeInHeightUnit: volumeInHeightUnit,
                  volumeInRadiusUnit: volumeInRadiusUnit,
                  radiusInheightUnit: radiusInheightUnit,
                  submitted_height: submitted_height,
                  submittedradius: submittedradius,
                  heightInradiusUnit: heightInradiusUnit
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

                <Label title={LABELS.radius} />

                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="radius"
                  placeholder={PLACEHOLDERS.number}
                  value={values.radius}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="radius_unit"
                  measurement="length"
                  value={values.radius_unit}
                  onChange={handleChange('radius_unit')}
                />
              </div>

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
          <Typography variant="subtitle1"> Volume in Radius: {Result.volumeInRadiusUnit}</Typography>
          <Typography variant="subtitle1"> Volume in Height: {Result.volumeInHeightUnit}</Typography>
          <Typography variant="subtitle1"> Submitted Radius: {Result.submittedradius}</Typography>
          <Typography variant="subtitle1"> Submitted Height: {Result.submitted_height}</Typography>
          <Typography variant="subtitle1"> Radius in Height: {Result.radiusInheightUnit}</Typography>
          <Typography variant="subtitle1"> Height in Radius: {Result.heightInradiusUnit}</Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default CapsuleVolume
