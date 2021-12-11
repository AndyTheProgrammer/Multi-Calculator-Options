import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'

import { SinglePointWithKnownSlopeI } from '../../../../types'
import { calculateOthers } from '../../../../services/AppCalculatorsApi'
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
              const { payload: singlePointWithKnowPoint } = await calculateOthers(payload)
              console.log('=====>', singlePointWithKnowPoint)
              if (typeof singlePointWithKnowPoint === 'object') {
                const { equation } = singlePointWithKnowPoint
                setResult({
                  equation: equation,
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
          <Typography variant="subtitle1">Equation: {Result.equation}</Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default SinglePointWithKnownSlope
