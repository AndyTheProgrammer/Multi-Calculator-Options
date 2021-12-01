import React from 'react'
import { Formik } from 'formik'
import { Typography, Grid } from '@material-ui/core'

import { SphericalCapSurfaceAreaI } from '../../../../types'
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

const SphericalCapSurfaceArea = () => {
  const [initialFormValues] = React.useState({
    radius: '',
    radius_unit: '',
    height: '',
    height_unit: ''
  })
  const [Result, setResult] = React.useState({
    surfaceArea: 0,
    radius: 0,
    height: 0,
    unit: '',
  })

  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.sphericalCapSurfArea}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          radius,
          radius_unit,
          height,
          height_unit,
        }, { setSubmitting, resetForm }) => {
          const payload: SphericalCapSurfaceAreaI = {
            radius,
            radius_unit,
            height,
            height_unit,
            method: 'CapSurfaceArea'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: CapSurfaceArea } = await calculateMath(payload)
            console.log('=====>', CapSurfaceArea)
            const { surfaceArea, radius, height, unit
            } = CapSurfaceArea
            if (typeof CapSurfaceArea === 'object') {
              setResult({
                surfaceArea: surfaceArea,
                radius: radius,
                height: height,
                unit: unit
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
                value={values.height_unit}
                onChange={handleChange('height_unit')}
              />
            </div>

            <CustomBtn />

            <div className="text-center mb-3">
              <Typography variant="subtitle1">Surface Area: {Result.surfaceArea}</Typography>
              <Typography variant="subtitle1"> Radius: {Result.radius}</Typography>
              <Typography variant="subtitle1"> Height: {Result.height}</Typography>
              <Typography variant="subtitle1"> Unit: {Result.unit}</Typography>
            </div>

          </form>
        )}

      </Formik>

    </div>
  )
}

export default SphericalCapSurfaceArea
