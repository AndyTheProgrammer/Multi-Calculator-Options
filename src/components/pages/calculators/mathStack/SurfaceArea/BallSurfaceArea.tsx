// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'

import { SurfaceAreaI } from '../../../../../types'
import { calculateMath } from '../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  LATEX,
} from '../../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  CustomBtn,
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../../custom'

const BallSurfaceArea = (props: any) => {
  const { openDrop } = props
  const [initialFormValues] = React.useState({
    radius: '',
    radius_unit: ''
  })
  const [Result, setResult] = React.useState({
    surfaceArea: 0,
    area: 0,
    unit: '',
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.ballSurfArea}
        dropDown={true}
        openDrop={openDrop}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            radius,
            radius_unit
          }, { setSubmitting }) => {
            const payload: SurfaceAreaI = {
              radius,
              radius_unit,
              method: 'ballSurfaceAreaCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: ballSurfaceArea } = await calculateMath(payload)
              console.log('=====>', ballSurfaceArea)
              if (typeof ballSurfaceArea === 'object') {
                const { surfaceArea, area, unit } = ballSurfaceArea
                console.log(ballSurfaceArea)
                setResult({
                  surfaceArea: surfaceArea,
                  area: area,
                  unit: unit
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
                <Label title={LABELS.radius} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="radius"
                  placeholder={PLACEHOLDERS.number}
                  value={values.radius}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="radius_unit"
                  measurement="length"
                  value={values.radius_unit}
                  onChange={handleChange('radius_unit')}
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
      <ResultTabsContainer
        tabTitle={'Result'}
        sm={6}
        latex={LATEX.ballSurfArea}
      >
        <div className="text-wrap">
          <Typography variant="subtitle1">
            = {Result.surfaceArea}{Result.unit}<sup>2</sup>
          </Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default BallSurfaceArea
