import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { SlopeCalculatorForTwoKnownPointsI } from '../../../../types'
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

const SlopeCalculatorForTwoKnownPoints = () => {
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)
  const [initialFormValues] = React.useState({
    y_1: '',
    y_2: '',
    x_1: '',
    x_2: '',
  })
  const [Result, setResult] = React.useState({
    slope: 0,
    distance: 0,
    angle: 0,
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.slopeCalculatorForTwoKnownPoints} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            y_1,
            y_2,
            x_1,
            x_2,
          }, { setSubmitting }) => {
            const payload: SlopeCalculatorForTwoKnownPointsI = {
              y_1,
              y_2,
              x_1,
              x_2,
              method: 'IfThe2PointsAreKnownSlopeCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: slopeWithTwoKnownPoints } = await calculateMath(payload)
              console.log('=====>', slopeWithTwoKnownPoints)
              const { d, m, angle, } = slopeWithTwoKnownPoints
              if (typeof slopeWithTwoKnownPoints === 'object') {
                setResult({
                  slope: m,
                  distance: d,
                  angle: angle,
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
          <Typography variant="subtitle1">
            Slope: {Result.slope}
          </Typography>

          <Typography variant="subtitle1">
            Distance: {Result.distance}
          </Typography>

          <Typography variant="subtitle1">
            Angle: {Result.angle}
          </Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default SlopeCalculatorForTwoKnownPoints
