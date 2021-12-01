import React from 'react'
import { Button, Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'

import { TrapSpeedMethodI } from '../../../types'
import { calculateOthers } from '../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  COLORS
} from '../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  CustomBtn,
  CustomResetBtn,
  Label,
  StyledTabs,
  NoIndexTabPanel,
} from '../../custom'

const TrapSpeedMethod = () => {
  const [initialFormValues] = React.useState({
    weight: "",
    weight_unit: "",
    speed: "",
    speed_unit: "",
  })
  const [Result, setResult] = React.useState({
    trap_speed: 0,
    weight: 0,
    speed: 0,
    unit: '',
  })

  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.trapSpeedMethod}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          weight,
          weight_unit,
          speed,
          speed_unit,
        }, { setSubmitting, resetForm }) => {
          const payload: TrapSpeedMethodI = {
            weight,
            weight_unit,
            speed,
            speed_unit,
            method: 'TheTrapSpeedMethod'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: trapSpeedMethod } = await calculateOthers(payload)
            console.log('=====>', trapSpeedMethod)
            const { trap_speed, unit, weight, speed,
            } = trapSpeedMethod
            if (typeof trapSpeedMethod === 'object') {
              setResult({
                trap_speed: trap_speed,
                weight: weight,
                speed: speed,
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
              <Label title={LABELS.weight} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="weight"
                placeholder={PLACEHOLDERS.number}
                value={values.weight}
                onChange={handleChange}
              />

              <CustomSelect
                id="weight_unit"
                value={values.weight_unit}
                onChange={handleChange('weight_unit')}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.speed} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="speed"
                placeholder={PLACEHOLDERS.number}
                value={values.speed}
                onChange={handleChange}
              />

              <CustomSelect
                id="speed_unit"
                value={values.speed_unit}
                onChange={handleChange('speed_unit')}
              />
            </div>

            <CustomBtn />

            <div className="text-center mb-3">
              <Typography variant="subtitle1"> Trap speed: {Result.trap_speed}</Typography>
              <Typography variant="subtitle1"> Weight: {Result.weight}</Typography>
              <Typography variant="subtitle1"> Speed: {Result.speed}</Typography>
              <Typography variant="subtitle1"> Unit: {Result.unit}</Typography>
            </div>

          </form>
        )}

      </Formik>
    </div>
  )
}

export default TrapSpeedMethod
