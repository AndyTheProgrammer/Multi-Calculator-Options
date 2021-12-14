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
    Volume: 0,
    base: 0,
    height: 0,
    units: '',
  })

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
              const { payload: squarePyramidVolume } = await calculateMath(payload)
              console.log('=====>', squarePyramidVolume)
              const { volume, units, height, base } = squarePyramidVolume
              if (typeof squarePyramidVolume === 'object') {
                setResult({
                  Volume: volume,
                  base: base,
                  height: height,
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
      <ResultTabsContainer tabTitle1={'Result'} sm={6}>
        <div className="text-center mb-3">
          <Typography variant="subtitle1"> Volume: {Result.Volume}</Typography>
          <Typography variant="subtitle1"> Base: {Result.base}</Typography>
          <Typography variant="subtitle1"> Height: {Result.height}</Typography>
          <Typography variant="subtitle1"> Units: {Result.units}</Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default SquarePyramidVolume
