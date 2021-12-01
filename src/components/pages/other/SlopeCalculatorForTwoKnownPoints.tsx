import React from 'react'
import { Button, Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'

import { SlopeCalculatorForTwoKnownPointsI } from '../../../types'
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

const SlopeCalculatorForTwoKnownPoints = () => {
  const [initialFormValues] = React.useState({
    y_1: '',
    y_2: '',
    x_1: '',
    x_2: '',
  })
  const [Result, setResult] = React.useState({
    slope: 0,
    unit: ''
  })

  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.slopeCalculatorForTwoKnownPoints}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          y_1,
          y_2,
          x_1,
          x_2,
        }, { setSubmitting, resetForm }) => {
          const payload: SlopeCalculatorForTwoKnownPointsI = {
            y_1,
            y_2,
            x_1,
            x_2,
            method: 'IfThe2PointsAreKnownSlopeCalculator'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: slopeWithTwoKnownPoints } = await calculateOthers(payload)
            console.log('=====>', slopeWithTwoKnownPoints)
            const { slope, unit } = slopeWithTwoKnownPoints
            if (typeof slopeWithTwoKnownPoints === 'object') {
              setResult({
                slope: slope,
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
              <Label title={LABELS.x1} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="x_1"
                placeholder={PLACEHOLDERS.number}
                value={values.x_1}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.y1} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="y_1"
                placeholder={PLACEHOLDERS.number}
                value={values.y_1}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.x2} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="x_2"
                placeholder={PLACEHOLDERS.number}
                value={values.x_2}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.y2} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="y_2"
                placeholder={PLACEHOLDERS.number}
                value={values.y_2}
                onChange={handleChange}
              />
            </div>

            <CustomBtn />

            <div className="text-center mb-3">
              <Typography variant="subtitle1"> Slope: {Result.slope}{Result.unit}</Typography>
            </div>

          </form>
        )}

      </Formik>
    </div>
  )
}

export default SlopeCalculatorForTwoKnownPoints
