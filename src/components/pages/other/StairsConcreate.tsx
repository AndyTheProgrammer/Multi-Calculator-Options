import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'

import { StairsConcreateI } from '../../../types'
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

const StairsConcreate = () => {
  const [initialFormValues] = React.useState({
    run: '',
    run_unit: '',
    rise: '',
    rise_unit: '',
    width: '',
    width_unit: '',
    platform_depth: '',
    platform_depth_unit: '',
    steps: '',
  })
  const [Result, setResult] = React.useState({
    concreteNeeded: 0,
    unit: ''
  })

  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.stairsConcrete}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          run,
          run_unit,
          rise,
          rise_unit,
          width,
          width_unit,
          platform_depth,
          platform_depth_unit,
          steps,
        }, { setSubmitting, resetForm }) => {
          const payload: StairsConcreateI = {
            run,
            run_unit,
            rise,
            rise_unit,
            width,
            width_unit,
            platform_depth,
            platform_depth_unit,
            steps,
            method: 'StairsConcreteCalculator'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: stairsConcreteMethod } = await calculateOthers(payload)
            console.log('=====>', stairsConcreteMethod)
            const { concreteNeeded, unit, run, rise, width, platform_depth, steps
            } = stairsConcreteMethod
            if (typeof stairsConcreteMethod === 'object') {
              setResult({
                concreteNeeded: concreteNeeded,
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
              <Label title={LABELS.run} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="run"
                placeholder={PLACEHOLDERS.number}
                value={values.run}
                onChange={handleChange}
              />

              <CustomSelect
                id="run_unit"
                value={values.run_unit}
                onChange={handleChange('run_unit')}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.rise} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="rise"
                placeholder={PLACEHOLDERS.number}
                value={values.rise}
                onChange={handleChange}
              />

              <CustomSelect
                id="rise_unit"
                value={values.rise_unit}
                onChange={handleChange('rise_unit')}
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
              <Label title={LABELS.platformDepth} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="platform_depth"
                placeholder={PLACEHOLDERS.number}
                value={values.platform_depth}
                onChange={handleChange}
              />

              <CustomSelect
                id="platform_depth_unit"
                value={values.platform_depth_unit}
                onChange={handleChange('platform_depth_unit')}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.steps} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="steps"
                placeholder={PLACEHOLDERS.number}
                value={values.steps}
                onChange={handleChange}
              />
            </div>

            <CustomBtn />

            <div className="text-center mb-3">
              <Typography variant="subtitle1">
                Amount of concrete needed: {Result.concreteNeeded}{Result.unit}
              </Typography>
            </div>

          </form>
        )}

      </Formik>
    </div>
  )
}

export default StairsConcreate
