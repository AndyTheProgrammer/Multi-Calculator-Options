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

const CapsuleVolume = (props: any) => {
  const { openDrop } = props
  const [initialFormValues] = React.useState({
    radius: "",
    radius_unit: "",
    height: "",
    height_unit: "",
  })
  const [Result, setResult] = React.useState({
    volume: 0,
    radius: 0,
    height: 0,
    units: ''
  })

  const [resultTwo, setResultTwo] = React.useState({
    volumeInRadiusUnit: 0,
    volumeInHeightUnit: 0,
    radiusInheightUnit: 0,
    heightInradiusUnit: 0,
    submittedradius: 0,
    submitted_height: 0,
  })
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.capsuleVol}
        sm={6}
        dropDown={true}
        openDrop={openDrop}
      >
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
              const { volumeInRadiusUnit,
                volumeInHeightUnit,
                radiusInheightUnit,
                heightInradiusUnit,
                submittedradius,
                submitted_height,
                volume,
                radius,
                height,
                units,
                unitType,
              } = capsuleVolume
              if (typeof capsuleVolume === 'object' && unitType === true) {
                //For now only working if you use different units
                setSelectedResult(unitType)
                setResult({
                  volume,
                  radius,
                  height,
                  units,
                })
              }
              if (typeof capsuleVolume === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setResultTwo({
                  volumeInRadiusUnit,
                  volumeInHeightUnit,
                  radiusInheightUnit,
                  heightInradiusUnit,
                  submittedradius,
                  submitted_height,
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
      <ResultTabsContainer tabTitle2={'Result'} sm={6}>
        {selectedResult ? (
          <div className="text-center mb-3">
            <Typography variant="subtitle1"> Volume : {Result.volume}</Typography>
            <Typography variant="subtitle1"> Radius {Result.radius}</Typography>
            <Typography variant="subtitle1"> Height: {Result.height}</Typography>
            <Typography variant="subtitle1"> Units: {Result.units}</Typography>
          </div>
        ) : (
          <div className="text-center mb-3">
            <Typography variant="subtitle1"> Volume in Radius: {resultTwo.volumeInRadiusUnit}</Typography>
            <Typography variant="subtitle1"> Volume in Height: {resultTwo.volumeInHeightUnit}</Typography>
            <Typography variant="subtitle1"> Submitted Radius: {resultTwo.submittedradius}</Typography>
            <Typography variant="subtitle1"> Submitted Height: {resultTwo.submitted_height}</Typography>
            <Typography variant="subtitle1"> Radius in Height: {resultTwo.radiusInheightUnit}</Typography>
            <Typography variant="subtitle1"> Height in Radius: {resultTwo.heightInradiusUnit}</Typography>
          </div>
        )}

      </ResultTabsContainer>
    </>
  )
}

export default CapsuleVolume
