import React from 'react'
import { Formik } from 'formik'
import { Typography, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'

import { ConicalFrustrumSurfaceAreaI } from '../../../../types'
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

const ConicalFrustrumSurfaceArea = () => {
  const [initialFormValues] = React.useState({
    top_radius: '',
    top_radius_unit: '',
    bottom_radius: '',
    bottom_radius_unit: '',
    height: '',
    height_unit: ''
  })
  const [Result, setResult] = React.useState({
    surfaceArea: 0,
    top_radius: 0,
    bottom_radius: 0,
    height: 0,
    unit: ''
  })

  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.conicalFrustrumSurfArea}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          top_radius,
          top_radius_unit,
          bottom_radius,
          bottom_radius_unit,
          height,
          height_unit,
        }, { setSubmitting, resetForm }) => {
          const payload: ConicalFrustrumSurfaceAreaI = {
            top_radius,
            top_radius_unit,
            bottom_radius,
            bottom_radius_unit,
            height,
            height_unit,
            method: 'ConicalFrustumSurfaceArea'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: ConicalFrustumSurfaceArea } = await calculateMath(payload)
            console.log('=====>', ConicalFrustumSurfaceArea)
            const { surfaceArea, top_radius, bottom_radius, height, unit
            } = ConicalFrustumSurfaceArea
            if (typeof ConicalFrustumSurfaceArea === 'object') {
              setResult({
                surfaceArea: surfaceArea,
                top_radius: top_radius,
                bottom_radius: bottom_radius,
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
              <Label title={LABELS.topRadius} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="top_radius"
                placeholder={PLACEHOLDERS.number}
                value={values.top_radius}
                onChange={handleChange}
              />

              <CustomSelect
                id="top_radius_unit"
                value={values.top_radius_unit}
                onChange={handleChange('top_radius_unit')}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.bottomRadius} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="bottom_radius"
                placeholder={PLACEHOLDERS.number}
                value={values.bottom_radius}
                onChange={handleChange}
              />

              <CustomSelect
                id="bottom_radius_unit"
                value={values.bottom_radius_unit}
                onChange={handleChange('bottom_radius_unit')}
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
              <Typography variant="subtitle1"> Top Radius: {Result.top_radius}</Typography>
              <Typography variant="subtitle1"> Bottom Radius: {Result.bottom_radius}</Typography>
              <Typography variant="subtitle1"> Height: {Result.height}</Typography>
              <Typography variant="subtitle1"> Unit: {Result.unit}</Typography>

            </div>

          </form>
        )}

      </Formik>

    </div>
  )
}

export default ConicalFrustrumSurfaceArea
