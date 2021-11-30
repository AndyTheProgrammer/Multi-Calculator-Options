import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'
import { useSelector } from 'react-redux'

import { CurbAndGutterBarrierI } from '../../../Types'
import { RootState } from '../../../redux/store'
import useStyles from '../../../Styling/CustomStyles'
import { CALCULATORS, LABELS, PLACEHOLDERS, INPUT_TYPE } from '../../../Common/shared'
import { CustomTextInput, CustomSelect, Label, CustomBtn } from '../../custom'
import { calculateOthers } from '../../../Services/AppCalculatorsApi'

const CurbAndGutterBarrier = () => {
  const classes = useStyles()
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
              />

              <CustomSelect
                measurement="length"
                id="curb_depth_unit"
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.curbHeight} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="curb_height"
                placeholder={PLACEHOLDERS.number}
              />

              <CustomSelect
                measurement="length"
                id="curb_height_unit"
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.flagThickness} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="flag_thickness"
                placeholder={PLACEHOLDERS.number}
              />

              <CustomSelect
                measurement="length"
                id="flag_thickness_unit"
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.gutterWidth} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="gutter_width"
                placeholder={PLACEHOLDERS.number}
              />

              <CustomSelect
                measurement="length"
                id="gutter_width_unit"
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.length} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="length"
                placeholder={PLACEHOLDERS.number}
              />

              <CustomSelect
                measurement="length"
                id="length_unit"
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.quantity} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="quantity"
                placeholder={PLACEHOLDERS.number}
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
