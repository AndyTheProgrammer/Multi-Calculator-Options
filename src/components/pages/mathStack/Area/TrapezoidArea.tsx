import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'

import { TrapezoidAreaI } from '../../../../types'
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

const TrapezoidArea = () => {
  const [initialFormValues] = React.useState({
    base1: "",
    base1_unit: "",
    base2: "",
    base2_unit: "",
    height: "",
    height_unit: "",
  })
  const [Result, setResult] = React.useState({
    area: 0,
    base1: 0,
    base2: 0,
    height: 0,
    unit: ''
  })

  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.trapezoidArea}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          base1,
          base1_unit,
          base2,
          base2_unit,
          height,
          height_unit,
        }, { setSubmitting, resetForm }) => {
          const payload: TrapezoidAreaI = {
            base1,
            base1_unit,
            base2,
            base2_unit,
            height,
            height_unit,
            method: 'TrapezoidArea'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: TrapezoidArea } = await calculateMath(payload)
            console.log('=====>', TrapezoidArea)
            const { area, unit, base1, base2, height
            } = TrapezoidArea
            if (typeof TrapezoidArea === 'object') {
              setResult({
                area: area,
                base1: base1,
                base2: base2,
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
              <Label title={LABELS.base1} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="base1"
                placeholder={PLACEHOLDERS.number}
                value={values.base1}
                onChange={handleChange}
              />

              <CustomSelect
                id="base1_unit"
                value={values.base1_unit}
                onChange={handleChange('base1_unit')}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.base2} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="base2"
                placeholder={PLACEHOLDERS.number}
                value={values.base2}
                onChange={handleChange}
              />

              <CustomSelect
                id="base2_unit"
                value={values.base2_unit}
                onChange={handleChange('base2_unit')}
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
              <Typography variant="subtitle1"> Base 1: {Result.base1}</Typography>
              <Typography variant="subtitle1"> Base 2: {Result.base2}</Typography>
              <Typography variant="subtitle1"> Height: {Result.height}</Typography>
              <Typography variant="subtitle1"> Unit: {Result.unit}</Typography>

            </div>

          </form>
        )}

      </Formik>
    </div>
  )
}

export default TrapezoidArea
