import React from 'react'
import { Formik } from 'formik'
import { Typography, Grid } from '@material-ui/core'

import { SinglePointWithKnownSlopeI } from '../../../types'
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

const SinglePointWithKnownSlope = () => {
  const [initialFormValues] = React.useState({
    x_1: '',
    y_1: '',
    slope: '',
    distance: ''
  })
  const [Result, setResult] = React.useState({
    equation: 0,
  })

  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.singlePointWithKnownSlope}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          x_1,
          y_1,
          slope,
          distance
        }, { setSubmitting, resetForm }) => {
          const payload: SinglePointWithKnownSlopeI = {
            x_1,
            y_1,
            slope,
            distance,
            method: 'If1PointAndTheSlopeAreKnown'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: singlePointWithKnowPoint } = await calculateOthers(payload)
            console.log('=====>', singlePointWithKnowPoint)
            if (typeof singlePointWithKnowPoint === 'object') {
              const { equation } = singlePointWithKnowPoint
              setResult({
                equation: equation,
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
              <Label title={LABELS.slope} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="slope"
                placeholder={PLACEHOLDERS.number}
                value={values.slope}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <Label title={LABELS.distance} />
              <CustomTextInput
                type={INPUT_TYPE.number}
                id="distance"
                placeholder={PLACEHOLDERS.number}
                value={values.distance}
                onChange={handleChange}
              />
            </div>

            <CustomBtn />

            <div className="text-center mb-3">
              <Typography variant="subtitle1">Equation: {Result.equation}</Typography>
            </div>

          </form>
        )}

      </Formik>

    </div>
  )
}

export default SinglePointWithKnownSlope
