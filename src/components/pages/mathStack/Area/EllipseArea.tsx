import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'

import { EllipseAreaI } from '../../../../types'
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

const EllipseArea = () => {
  const [initialFormValues] = React.useState({
    semi_major_axes_a: "",
    semi_major_axes_a_unit: "",
    semi_major_axes_b: "",
    semi_major_axes_b_unit: "",
  })
  const [Result, setResult] = React.useState({
    semi_major_axes_a: 0,
    semi_major_axes_b: 0,
    area: 0,
    unit: ''
  })

  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.ellipseArea}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          semi_major_axes_a,
          semi_major_axes_a_unit,
          semi_major_axes_b,
          semi_major_axes_b_unit,
        }, { setSubmitting, resetForm }) => {
          const payload: EllipseAreaI = {
            semi_major_axes_a,
            semi_major_axes_a_unit,
            semi_major_axes_b,
            semi_major_axes_b_unit,
            method: 'ellipseArea'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: ellipseArea } = await calculateMath(payload)
            console.log('=====>', ellipseArea)
            const { area, unit, semi_major_axes_a, semi_major_axes_b, height
            } = ellipseArea
            if (typeof ellipseArea === 'object') {
              setResult({
                area: area,
                semi_major_axes_a: semi_major_axes_a,
                semi_major_axes_b: semi_major_axes_b,
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
              <Label title={LABELS.semiMajorAxesA} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="semi_major_axes_a"
                placeholder={PLACEHOLDERS.number}
                value={values.semi_major_axes_a}
                onChange={handleChange}
              />

              <CustomSelect
                id="semi_major_axes_a_unit"
                value={values.semi_major_axes_a_unit}
                onChange={handleChange('semi_major_axes_a_unit')}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.semiMajorAxesB} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="semi_major_axes_b"
                placeholder={PLACEHOLDERS.number}
                value={values.semi_major_axes_b}
                onChange={handleChange}
              />

              <CustomSelect
                id="semi_major_axes_b_unit"
                value={values.semi_major_axes_b_unit}
                onChange={handleChange('semi_major_axes_b_unit')}
              />
            </div>

            <CustomBtn />

            <div className="text-center mb-3">
              <Typography variant="subtitle1">Area: {Result.area}</Typography>
              <Typography variant="subtitle1">Semi major axes A: {Result.semi_major_axes_a}</Typography>
              <Typography variant="subtitle1">Semi major axes B: {Result.semi_major_axes_b}</Typography>
              <Typography variant="subtitle1">Units: {Result.unit}</Typography>

            </div>

          </form>
        )}

      </Formik>
    </div>
  )
}

export default EllipseArea
