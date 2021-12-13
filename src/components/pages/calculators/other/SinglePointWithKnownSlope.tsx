import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'

import { SinglePointWithKnownSlopeI } from '../../../../types'
import { calculateMath } from '../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomBtn,
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../custom'

const SinglePointWithKnownSlope = () => {
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)
  const [initialFormValues] = React.useState({
    x_1: '',
    y_1: '',
    slope: '',
    distance: ''
  })
  const [Result, setResult] = React.useState({
    x_2: 0,
    y_2: 0,
    Δx: 0,
    Δy: 0,
    angle: 0,
    left_x_2: 0,
    left_y_2: 0,
    left_Δx: 0,
    left_Δy: 0,
    angle_left: 0,
    angle_unit: '',
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.singlePointWithKnownSlope} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            x_1,
            y_1,
            slope,
            distance
          }, { setSubmitting }) => {
            const payload: SinglePointWithKnownSlopeI = {
              x_1,
              y_1,
              slope,
              distance,
              method: 'If1PointAndTheSlopeAreKnown'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: singlePointWithKnowPoint } = await calculateMath(payload)
              console.log('=====>', singlePointWithKnowPoint)
              if (typeof singlePointWithKnowPoint === 'object') {
                const {
                  x_2,
                  y_2,
                  Δx,
                  Δy,
                  angel,
                  left_x_2,
                  left_y_2,
                  left_Δx,
                  left_Δy,
                  angle_left,
                } = singlePointWithKnowPoint
                setResult({
                  x_2: x_2,
                  y_2: y_2,
                  Δx: Δx,
                  Δy: Δy,
                  angle: angel,
                  left_x_2: left_x_2,
                  left_y_2: left_y_2,
                  left_Δx: left_Δx,
                  left_Δy: left_Δy,
                  angle_left: angle_left,
                  angle_unit: '°'
                })
              }
            } catch (err) {
              console.log('====>', err)
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, resetForm }) => (
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
                <Label title={LABELS.distance} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="distance"
                  placeholder={PLACEHOLDERS.number}
                  value={values.distance}
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

              <div
                className="form-row"
                style={{ alignItems: 'center', justifyContent: 'space-between' }}
              >
                <CustomBtn />
                <CustomResetBtn
                  onHandleClick={() => resetForm()}
                />
              </div>
            </form>
          )}
        </Formik>
      </FormTabsContainer>

      {/* Results grid */}
      <ResultTabsContainer tabTitle1={'Result'} sm={6}>
        <div className="text-center mb-3">
          <Typography variant="subtitle1">X2: {Result.x_2}</Typography>
          <Typography variant="subtitle1">Y2: {Result.y_2}</Typography>
          <Typography variant="subtitle1">ΔX: {Result.Δx}</Typography>
          <Typography variant="subtitle1">ΔY: {Result.Δy}</Typography>
          <Typography variant="subtitle1" gutterBottom>θ: {Result.angle}{Result.angle_unit}</Typography>

          <Typography variant="subtitle1" component='h6' gutterBottom>OR</Typography>

          <Typography variant="subtitle1">X2: {Result.left_x_2}</Typography>
          <Typography variant="subtitle1">Y2: {Result.left_y_2}</Typography>
          <Typography variant="subtitle1">ΔX: {Result.left_Δx}</Typography>
          <Typography variant="subtitle1">ΔY: {Result.left_Δy}</Typography>
          <Typography variant="subtitle1">θ: {Result.angle_left}{Result.angle_unit}</Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default SinglePointWithKnownSlope
