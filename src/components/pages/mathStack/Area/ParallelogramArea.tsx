import React from 'react'
import { Formik } from 'formik'
import { Typography, Grid } from '@material-ui/core'

import { ParallelogramAreaI } from '../../../../types'
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

const ParallelogramArea = () => {
  const [initialFormValues] = React.useState({
    breadth: '',
    breadth_unit: '',
    height: '',
    height_unit: ''
  })
  const [Result, setResult] = React.useState({
    area: 0,
    breadth: 0,
    height: 0,
    unit: ''
  })

  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.capsuleSurfArea}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          breadth,
          breadth_unit,
          height,
          height_unit
        }, { setSubmitting, resetForm }) => {
          const payload: ParallelogramAreaI = {
            breadth,
            breadth_unit,
            height,
            height_unit,
            method: 'parallelogramArea'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: parallelogramArea } = await calculateMath(payload)
            console.log('=====>', parallelogramArea)
            const { area, unit, breadth, height
            } = parallelogramArea
            if (typeof parallelogramArea === 'object') {
              setResult({
                area: area,
                breadth: breadth,
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
              <Label title={LABELS.breadth} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="breadth"
                placeholder={PLACEHOLDERS.number}
                value={values.breadth}
                onChange={handleChange}
              />

              <CustomSelect
                id="breadth_unit"
                value={values.breadth_unit}
                onChange={handleChange('breadth_unit')}
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
              <Typography variant="subtitle1"> Area: {Result.area}</Typography>
              <Typography variant="subtitle1"> Breadth: {Result.breadth}</Typography>
              <Typography variant="subtitle1"> Height: {Result.height}</Typography>
              <Typography variant="subtitle1"> Unit: {Result.unit}</Typography>

            </div>

          </form>
        )}
      </Formik>
    </div>
  )
}

export default ParallelogramArea
