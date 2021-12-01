import React from 'react'
import { Button, Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'
import { useSelector } from 'react-redux'

import { RectangularTankVolumeI } from '../../../../types'
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

const RectangularTankVolume = () => {
  const [initialFormValues] = React.useState({
    length: "",
    length_unit: "",
    width: "",
    width_unit: "",
    height: "",
    height_unit: "",
  })
  const [Result, setResult] = React.useState({
    Volume: 0,
    length: 0,
    width: 0,
    height: 0,
    units: ''
  })

  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.rectangleVol}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          length,
          length_unit,
          width,
          width_unit,
          height,
          height_unit,
        }, { setSubmitting, resetForm }) => {
          const payload: RectangularTankVolumeI = {
            length,
            length_unit,
            width,
            width_unit,
            height,
            height_unit,
            method: 'RectangularTankVolumeCalculator'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: rectangularTankVolume } = await calculateMath(payload)
            console.log('=====>', rectangularTankVolume)
            const { volume, units, length, width, height
            } = rectangularTankVolume
            if (typeof rectangularTankVolume === 'object') {
              setResult({
                Volume: volume,
                length: length,
                width: width,
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
              <Label title={LABELS.length} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="length"
                placeholder={PLACEHOLDERS.number}
                value={values.length}
                onChange={handleChange}
              />

              <CustomSelect
                id="length_unit"
                value={values.length_unit}
                onChange={handleChange('length_unit')}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.width} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="width"
                placeholder={PLACEHOLDERS.number}
                value={values.width}
                onChange={handleChange}
              />

              <CustomSelect
                id="width_unit"
                value={values.width_unit}
                onChange={handleChange('width_unit')}
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
              <Typography variant="subtitle1"> Length: {Result.length}</Typography>
              <Typography variant="subtitle1"> Width: {Result.width}</Typography>
              <Typography variant="subtitle1"> Height: {Result.height}</Typography>
              <Typography variant="subtitle1"> Units: {Result.units}</Typography>
            </div>

          </form>
        )}

      </Formik>
    </div>
  )
}

export default RectangularTankVolume
