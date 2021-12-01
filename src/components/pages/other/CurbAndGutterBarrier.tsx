import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'

import { CurbAndGutterBarrierI } from '../../../types'
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

const CurbAndGutterBarrier = () => {
  const [initialFormValues] = React.useState({
    curb_depth: '',
    curb_depth_unit: '',
    curb_height: '',
    curb_height_unit: '',
    flag_thickness: '',
    flag_thickness_unit: '',
    gutter_width: '',
    gutter_width_unit: '',
    length: '',
    length_unit: '',
    quantity: '',
  })
  const [Result, setResult] = React.useState({
    concreteNeeded: 0,
    unit: ''
  })

  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.curbAndGutterBarrier}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          curb_depth,
          curb_depth_unit,
          curb_height,
          curb_height_unit,
          flag_thickness,
          flag_thickness_unit,
          gutter_width,
          gutter_width_unit,
          length,
          length_unit,
          quantity,
        }, { setSubmitting, resetForm }) => {
          const payload: CurbAndGutterBarrierI = {
            curb_depth,
            curb_depth_unit,
            curb_height,
            curb_height_unit,
            flag_thickness,
            flag_thickness_unit,
            gutter_width,
            gutter_width_unit,
            length,
            length_unit,
            quantity,
            method: 'CurbAndGutterBarrierConcreteCalculator'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: trapSpeedMethod } = await calculateOthers(payload)
            console.log('=====>', trapSpeedMethod)
            const { concreteNeeded, unit, } = trapSpeedMethod
            if (typeof trapSpeedMethod === 'object') {
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
              <Label title={LABELS.curbDepth} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="curb_depth"
                placeholder={PLACEHOLDERS.number}
                value={values.curb_depth}
                onChange={handleChange}
              />

              <CustomSelect
                id="curb_depth_unit"
                value={values.curb_depth_unit}
                onChange={handleChange('curb_depth_unit')}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.curbHeight} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="curb_height"
                placeholder={PLACEHOLDERS.number}
                value={values.curb_height}
                onChange={handleChange}
              />

              <CustomSelect
                id="curb_height_unit"
                value={values.curb_height_unit}
                onChange={handleChange('curb_height_unit')}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.flagThickness} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="flag_thickness"
                placeholder={PLACEHOLDERS.number}
                value={values.flag_thickness}
                onChange={handleChange}
              />

              <CustomSelect
                id="flag_thickness_unit"
                value={values.flag_thickness_unit}
                onChange={handleChange('flag_thickness_unit')}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.gutterWidth} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="gutter_width"
                placeholder={PLACEHOLDERS.number}
                value={values.gutter_width}
                onChange={handleChange}
              />

              <CustomSelect
                id="gutter_width_unit"
                value={values.gutter_width_unit}
                onChange={handleChange('gutter_width_unit')}
              />
            </div>

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

export default CurbAndGutterBarrier
