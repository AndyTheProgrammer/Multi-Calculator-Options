import React from 'react'
import { Typography } from '@material-ui/core'
import { FastField, Formik } from 'formik'

import { SphericalCapVolumeI } from '../../../../../types'
import { calculateMath } from '../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  LATEX,
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

const SphericalCapVolume = (props: any) => {
  const { openDrop } = props
  const [initialFormValues] = React.useState({
    radius: "",
    radius_unit: "",
    height: "",
    height_unit: "",
  })
  const [Result, setResult] = React.useState({
    volume: 0,
    units: '',
  })
  const [resultTwo, setResultTwo] = React.useState({
    volumeInRadiusUnit: 0,
    volumeInHeightUnit: 0,
  })
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)
  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.sphericalCapVol}
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
            const payload: SphericalCapVolumeI = {
              radius,
              radius_unit,
              height,
              height_unit,
              method: 'ballSurfaceAreaCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: sphericalCapVolume } = await calculateMath(payload)
              console.log('=====>', sphericalCapVolume)
              const {
                volume,
                units,
                unitType,
                volumeInRadiusUnit,
                volumeInHeightUnit,
              } = sphericalCapVolume

              if (typeof sphericalCapVolume === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setResult({
                  volume: volume,
                  units: units
                })
              }
              if (typeof sphericalCapVolume === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setResultTwo({
                  volumeInRadiusUnit: volumeInRadiusUnit,
                  volumeInHeightUnit: volumeInHeightUnit,
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
      <ResultTabsContainer tabTitle={'Result'} sm={6} latex={LATEX.sphericalCapVolume}>
        {selectedResult === true &&
          <div className="text-wrap">
            <Typography variant="subtitle1">
              Volume = {Result.volume}{Result.units}<sup>3</sup>
            </Typography>
          </div>
        }
        {selectedResult === false &&
          <div className="text-wrap">
            <Typography variant="subtitle1"> Volume = {resultTwo.volumeInHeightUnit}</Typography>
            <Typography variant="subtitle2"> or</Typography>
            <Typography variant="subtitle1"> = {resultTwo.volumeInRadiusUnit}</Typography>
          </div>
        }
      </ResultTabsContainer>
    </>
  )
}

export default SphericalCapVolume
