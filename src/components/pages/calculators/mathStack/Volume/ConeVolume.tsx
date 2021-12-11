import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { ConeVolumeCalculatorI } from '../../../../../types'
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

const ConeVolume = () => {
  const [initialFormValues] = React.useState({
    radius: "",
    radius_unit: "",
    height: "",
    height_unit: "",
  })
  const [Result, setResult] = React.useState({
    Volume: 0,
    radius: 0,
    height: 0,
    units: ''
  })

  const [resultTwo, setResultTwo] = React.useState({
    radiusUnit: "",
    radiusToHeightUnit: 0,
    height: 2,
    heightUnit: "",
    heightToRadiusUnit: 0,
    volumeInRadiusUnit: 0,
    volumeInHeightUnit: 0,
    submitedRadius: ''

  })
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.coneVol} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            radius,
            radius_unit,
            height,
            height_unit,
          }, { setSubmitting, resetForm }) => {
            const payload: ConeVolumeCalculatorI = {
              radius,
              radius_unit,
              height,
              height_unit,
              method: 'ConeVolumeCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: coneVolume } = await calculateMath(payload)
              const { volume, units, radius, height, unitType, submitedRadius,
                radiusUnit,
                radiusToHeightUnit,
                heightUnit,
                heightToRadiusUnit,
                volumeInRadiusUnit,
                volumeInHeightUnit, } = coneVolume
              console.log('=====>', coneVolume)
              if (typeof coneVolume === 'object' && unitType === true) {
                setResultTwo(unitType)
                setResult({
                  Volume: volume,
                  radius: radius,
                  height: height,
                  units: units
                })
              }
              if (typeof coneVolume === 'object' && unitType === false) {
                setResultTwo(unitType)
                setResultTwo({
                  submitedRadius,
                  radiusUnit,
                  radiusToHeightUnit,
                  height,
                  heightUnit,
                  heightToRadiusUnit,
                  volumeInRadiusUnit,
                  volumeInHeightUnit,
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
          <Typography variant="subtitle1"> Volume: {Result.Volume}</Typography>
          <Typography variant="subtitle1"> Radius: {Result.radius}</Typography>
          <Typography variant="subtitle1"> Height: {Result.height}</Typography>
          <Typography variant="subtitle1"> Units: {Result.units}</Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default ConeVolume
