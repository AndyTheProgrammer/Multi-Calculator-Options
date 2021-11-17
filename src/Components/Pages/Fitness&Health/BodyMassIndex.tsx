import React from 'react'
import { Formik } from 'formik'
import { Button, Typography, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'

import { BodyMassIndexI } from '../../../Types'
import { RootState } from '../../../redux/store'
import { Units } from '../../../Common/MathUnits'
import useStyles from './../../../Styling/CustomStyles'
import { CALCULATORS, BUTTONS, LABELS, PLACEHOLDERS, IDS, INPUT_TYPE } from './../../../Common/shared'
import { CustomForm, CustomSelect } from '../../custom'
import { calculateHealth } from '../../../Services/AppCalculatorsApi'

const BodyMassIndex = () => {
  const classes = useStyles()
  const measures = useSelector((state: RootState) => state.unitMeasures)
  console.log(measures)
  const [initialFormValues] = React.useState({
    height: '',
    height_unit: '',
    weight: '',
    weight_unit: ''
  })
  const [Result, setResult] = React.useState({
    weightInKg: 0,
    heightToMeter: 0,
    bmi: 0,
    unit: ''
  })

  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.bodyMassIndex}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          height,
          height_unit,
          weight,
          weight_unit
        }, { setSubmitting, resetForm }) => {
          const payload: BodyMassIndexI = {
            height,
            height_unit,
            weight,
            weight_unit,
            method: 'bodyMassIndex'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: bodyMass } = await calculateHealth(payload)
            console.log('=====>', bodyMass)
            if (typeof bodyMass === 'object') {
              const { weightInKg, heightToMeter, bmi, unit } = bodyMass
              setResult({
                weightInKg: weightInKg,
                heightToMeter: heightToMeter,
                bmi: bmi,
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
              <CustomForm
                label={LABELS.height}
                type={INPUT_TYPE.number}
                id="height"
                placeholder={PLACEHOLDERS.number}
                value={values.height}
                onChange={handleChange}
              />

              <CustomSelect
                label={LABELS.unit}
                id="height_unit"
                value={values.height_unit}
                onChange={handleChange('height_unit')}
              />
            </div>

            <div className="form-row">
              <CustomForm
                label={LABELS.weight}
                type={INPUT_TYPE.number}
                id="weight"
                placeholder={PLACEHOLDERS.number}
                value={values.weight}
                onChange={handleChange}
              />

              <CustomSelect
                label={LABELS.unit}
                id="weight_unit"
                value={values.weight_unit}
                onChange={handleChange('weight_unit')}
              />
            </div>

            <div className="form mb-3">
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                className="btn btn-primary"
              >
                {BUTTONS.calculate}
              </Button>
            </div>
            <div className="text-center mb-3">
              <Typography variant="subtitle1">Bmi: {Result.bmi}</Typography>
              <Typography variant="subtitle1">Weight : {Result.weightInKg}</Typography>
              <Typography variant="subtitle1">Height : {Result.heightToMeter}</Typography>
              <Typography variant="subtitle1">Units : {Result.unit}</Typography>



            </div>

          </form>
        )}

      </Formik>

    </div>
  )
}

export default BodyMassIndex
