import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'
import { useSelector } from 'react-redux'

import { ParrallelResitorI } from '../../../Types'
import { RootState } from '../../../redux/store'
import useStyles from '../../../Styling/CustomStyles'
import { CALCULATORS, LABELS, PLACEHOLDERS, INPUT_TYPE } from '../../../Common/shared'
import { CustomBtn, CustomTextInput, CustomSelect, Label } from '../../custom'
import { calculateOthers } from '../../../Services/AppCalculatorsApi'

const ParrallelResitor = () => {
  const classes = useStyles()
  const [initialFormValues] = React.useState({
    resistance_values: "",
  })
  const [Result, setResult] = React.useState({
    totalResistance: 0,
    unit: ''
  })

  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.parrallelResitor}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          resistance_values,
        }, { setSubmitting, resetForm }) => {
          const payload: ParrallelResitorI = {
            resistance_values,
            method: 'ParallelResistorCalculator'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: parallelResistorCalculator } = await calculateOthers(payload)
            console.log('=====>', parallelResistorCalculator)
            const { totalResistance, unit,
            } = parallelResistorCalculator
            if (typeof parallelResistorCalculator === 'object') {
              setResult({
                totalResistance: totalResistance,
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
              <Label title={LABELS.resistanceValues} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="resistance_values"
                placeholder={PLACEHOLDERS.number}
              />
            </div>

            <CustomBtn />

            <div className="text-center mb-3">
              <Typography variant="subtitle1"> Total resistance: {Result.totalResistance}{Result.unit}</Typography>
            </div>

          </form>
        )}

      </Formik>
    </div>
  )
}

export default ParrallelResitor
