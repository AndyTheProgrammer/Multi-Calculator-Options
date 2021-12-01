import React from 'react'
import { Button, Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'
import { useSelector } from 'react-redux'

import { SquarePyramidVolumeI } from '../../../../types'
import { calculateMath } from '../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  COLORS
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  CustomBtn,
  CustomResetBtn,
  Label,
  StyledTabs,
  NoIndexTabPanel,
} from '../../../custom'

const SquarePyramidVolume = () => {
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
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.squarePyramidVol}
        </Typography>
      </Grid>

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
            resetForm()
          } catch (err) {
            console.log('====>', err)
          }
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
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
                value={values.height_unit}
                onChange={handleChange('height_unit')}
              />
            </div>

            <CustomBtn />

            <div className="text-center mb-3">
              <Typography variant="subtitle1"> Volume: {Result.Volume}</Typography>
              <Typography variant="subtitle1"> Base: {Result.base}</Typography>
              <Typography variant="subtitle1"> Height: {Result.height}</Typography>
              <Typography variant="subtitle1"> Units: {Result.units}</Typography>
            </div>

          </form>
        )}

      </Formik>
    </div>
  )
}

export default SquarePyramidVolume
