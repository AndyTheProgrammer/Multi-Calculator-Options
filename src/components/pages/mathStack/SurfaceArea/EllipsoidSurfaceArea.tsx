import React from 'react'
import { Formik } from 'formik'
import { Typography, Grid } from '@material-ui/core'

import { EllipsoidSurfaceAreaI } from '../../../../types'
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

const EllipsoidSurfaceArea = () => {
  const [initialFormValues] = React.useState({
    axis1: '',
    axis1_unit: '',
    axis2: '',
    axis2_unit: '',
    axis3: '',
    axis3_unit: ''
  })
  const [Result, setResult] = React.useState({
    surfaceArea: 0,
    axis1: 0,
    axis2: 0,
    axis3: 0,
    unit: ''
  })

  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.ellipsoidSurfArea}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          axis1,
          axis1_unit,
          axis2,
          axis2_unit,
          axis3,
          axis3_unit
        }, { setSubmitting, resetForm }) => {
          const payload: EllipsoidSurfaceAreaI = {
            axis1,
            axis1_unit,
            axis2,
            axis2_unit,
            axis3,
            axis3_unit,
            method: 'EllipsoidSurfaceArea'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: EllipsoidSurfaceArea } = await calculateMath(payload)
            console.log('=====>', EllipsoidSurfaceArea)
            const { surfaceArea, axis1, axis2, axis3, unit
            } = EllipsoidSurfaceArea
            if (typeof EllipsoidSurfaceArea === 'object') {
              setResult({
                surfaceArea: surfaceArea,
                axis1: axis1,
                axis2: axis2,
                axis3: axis3,
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
              <Label title={LABELS.axis1} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="axis1"
                placeholder={PLACEHOLDERS.number}
                value={values.axis1}
                onChange={handleChange}
              />

              <CustomSelect
                id="axis1_unit"
                value={values.axis1_unit}
                onChange={handleChange('axis1_unit')}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.axis2} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="axis2"
                placeholder={PLACEHOLDERS.number}
                value={values.axis2}
                onChange={handleChange}
              />

              <CustomSelect
                id="axis2_unit"
                value={values.axis2_unit}
                onChange={handleChange('axis2_unit')}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.axis3} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="axis3"
                placeholder={PLACEHOLDERS.number}
                value={values.axis3}
                onChange={handleChange}
              />

              <CustomSelect
                id="axis3_unit"
                value={values.axis3_unit}
                onChange={handleChange('axis3_unit')}
              />
            </div>

            <CustomBtn />

            <div className="text-center mb-3">
              <Typography variant="subtitle1">Surface Area: {Result.surfaceArea}</Typography>
              <Typography variant="subtitle1"> Axis 1: {Result.axis1}</Typography>
              <Typography variant="subtitle1"> Axis 2: {Result.axis2}</Typography>
              <Typography variant="subtitle1"> Axis 3: {Result.axis3}</Typography>
              <Typography variant="subtitle1"> Unit: {Result.unit}</Typography>
            </div>

          </form>
        )}

      </Formik>

    </div>
  )
}

export default EllipsoidSurfaceArea
