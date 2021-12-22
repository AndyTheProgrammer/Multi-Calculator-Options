import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { SquarePyramidVolumeI } from '../../../../../types'
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

const SquarePyramidVolume = (props: any) => {
  const { openDrop } = props
  const [initialFormValues] = React.useState({
    base: "",
    base_unit: "",
    height: "",
    height_unit: "",
  })
  const [Result, setResult] = React.useState({
    volume: 0,
    units: '',
  })
  const [resultTwo, setResultTwo] = React.useState({
    volumeInBaseUnit: 0,
    volumeInHeightUnit: 0,
  })
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.squarePyramidVol}
        sm={6}
        dropDown={true}
        openDrop={openDrop}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            base,
            base_unit,
            height,
            height_unit,
          }, { setSubmitting, resetForm }) => {
            const payload: SquarePyramidVolumeI = {
              base,
              base_unit,
              height,
              height_unit,
              method: 'ballSurfaceAreaCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: squarePyramidVolume } = await calculateMath(payload)
              console.log('=====>', squarePyramidVolume)
              const {
                volume,
                units,
                volumeInBaseUnit,
                volumeInHeightUnit,
                unitType,
              } = squarePyramidVolume

              if (typeof squarePyramidVolume === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setResult({
                  volume: volume,
                  units: units
                })
              }
              if (typeof squarePyramidVolume === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setResultTwo({
                  volumeInBaseUnit,
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
                <Label title={LABELS.base} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="base"
                  placeholder={PLACEHOLDERS.number}
                  value={values.base}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="base_unit"
                  measurement="length"
                  value={values.base_unit}
                  onChange={handleChange('base_unit')}
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
      <ResultTabsContainer tabTitle={'Result'} sm={6} latex={LATEX.squarePyramidVolume}>
        {selectedResult === true &&
          <div className="text-center mb-3">
            <Typography variant="subtitle1">
              Volume = {Result.volume}{Result.units}<sup>3</sup>
            </Typography>
          </div>
        }
        {selectedResult === false &&
          <div className="text-center mb-3">
            <Typography variant="subtitle1"> Volume = {resultTwo.volumeInBaseUnit}</Typography>
            <Typography variant="subtitle2"> or</Typography>
            <Typography variant="subtitle1"> = {resultTwo.volumeInHeightUnit}</Typography>
          </div>
        }
      </ResultTabsContainer>
    </>
  )
}

export default SquarePyramidVolume
