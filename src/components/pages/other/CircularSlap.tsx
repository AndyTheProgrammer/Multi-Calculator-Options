import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'

import { CircularSlapI } from '../../../types'
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

const CircularSlap = () => {
  const [initialFormValues] = React.useState({
    length: "",
    length_unit: "",
    outer_diameter: "",
    outer_diameter_unit: "",
    inner_diameter: "",
    inner_diameter_unit: "",
    quantity: ""
  })
  const [Result, setResult] = React.useState({
    concreteNeeded: 0,
    unit: ''
  })

  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.circularSlap}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          length,
          length_unit,
          outer_diameter,
          outer_diameter_unit,
          inner_diameter,
          inner_diameter_unit,
          quantity,
        }, { setSubmitting, resetForm }) => {
          const payload: CircularSlapI = {
            length,
            length_unit,
            outer_diameter,
            outer_diameter_unit,
            inner_diameter,
            inner_diameter_unit,
            quantity,
            method: 'CircularSlabOrTubeConcreteCalculator'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: circularSlabOrTubeConcrete } = await calculateOthers(payload)
            console.log('=====>', circularSlabOrTubeConcrete)
            const { concreteNeeded, unit } = circularSlabOrTubeConcrete
            if (typeof circularSlabOrTubeConcrete === 'object') {
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
              <Label title={LABELS.outerDiameter} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="outer_diameter"
                placeholder={PLACEHOLDERS.number}
                value={values.outer_diameter}
                onChange={handleChange}
              />

              <CustomSelect
                id="outer_diameter_unit"
                value={values.outer_diameter_unit}
                onChange={handleChange('outer_diameter_unit')}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.innerDiameter} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="inner_diameter"
                placeholder={PLACEHOLDERS.number}
                value={values.inner_diameter}
                onChange={handleChange}
              />

              <CustomSelect
                id="inner_diameter_unit"
                value={values.inner_diameter_unit}
                onChange={handleChange('inner_diameter_unit')}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.quantity} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="quantity"
                placeholder={PLACEHOLDERS.number}
                value={values.quantity}
                onChange={handleChange}
              />
            </div>

            <CustomBtn />

            <div className="text-center mb-3">
              <Typography variant="subtitle1"> Amount of concrete needed: {Result.concreteNeeded}{Result.unit}</Typography>
            </div>

          </form>
        )}

      </Formik>
    </div>
  )
}

export default CircularSlap
