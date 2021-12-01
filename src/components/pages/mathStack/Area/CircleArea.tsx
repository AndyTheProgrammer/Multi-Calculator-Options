import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'

import { CircleAreaI } from '../../../../types'
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

const CircleArea = () => {

  const [initialFormValues] = React.useState({
    radius: "",
    radius_unit: "",
  })
  const [Result, setResult] = React.useState({
    Area: 0,
    units: '',
    Submitted_radius: '',
    Submitted_unit: ''
  })

  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.circleArea}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          radius,
          radius_unit
        }, { setSubmitting, resetForm }) => {
          const payload: CircleAreaI = {
            radius,
            radius_unit,
            method: 'circleArea'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: circleArea } = await calculateMath(payload)
            console.log('=====>', circleArea)
            if (typeof circleArea === 'object') {
              const { area, units, submittedradius, submittedunit } = circleArea
              setResult({
                Area: area,
                units: units,
                Submitted_radius: submittedradius,
                Submitted_unit: submittedunit
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

            <CustomBtn />

            <div className="text-center mb-3">
              <Typography variant="subtitle1"> Area: {Result.Area}</Typography>
              <Typography variant="subtitle1"> Submitted Radius: {Result.Submitted_radius}</Typography>
              <Typography variant="subtitle1"> Submitted Unit: {Result.Submitted_unit}</Typography>
              <Typography variant="subtitle1"> Units: {Result.units}</Typography>
            </div>

          </form>
        )}

      </Formik>
    </div>
  )
}

export default CircleArea
