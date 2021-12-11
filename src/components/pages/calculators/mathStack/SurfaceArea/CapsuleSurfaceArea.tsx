import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'

import { CapsuleSurfaceAreaI } from '../../../../../types'
import { calculateMath } from '../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
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

const CapsuleSurfaceArea = () => {

  const [initialFormValues] = React.useState({
    radius: '',
    radius_unit: '',
    height: "",
    height_unit: ''
  })
  const [Result, setResult] = React.useState({
    surfaceArea: 0,
    submittedradius: 0,
    submitted_height: 0,
    units: ''
  })

  const [resultTwo, setResultTwo] = React.useState({
    surfaceAreaInradiusUnit: 0,
    surfaceAreaInheightUnit: 0,
    radiusInheightUnit: 0,
    $heightInradiusUnit: 0,
    submittedradius: '',
    submitted_height: '',
  })

  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)


  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.capsuleSurfArea} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            radius,
            radius_unit,
            height,
            height_unit
          }, { setSubmitting }) => {
            const payload: CapsuleSurfaceAreaI = {
              radius,
              radius_unit,
              height,
              height_unit,
              method: 'CapsuleSurfaceArea'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: CapsuleSurfaceArea } = await calculateMath(payload)
              console.log('=====>', CapsuleSurfaceArea)
              const {
                surfaceArea,
                submittedradius,
                submitted_height,
                units,
                unitType,
                surfaceAreaInradiusUnit,
                surfaceAreaInheightUnit,
                radiusInheightUnit,
                $heightInradiusUnit,
              } = CapsuleSurfaceArea
              if (typeof CapsuleSurfaceArea === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setResult({
                  surfaceArea: surfaceArea,
                  submittedradius: submittedradius,
                  submitted_height: submitted_height,
                  units: units,
                })
              }

              if (typeof CapsuleSurfaceArea === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setResultTwo({
                  surfaceAreaInheightUnit: surfaceAreaInheightUnit,
                  surfaceAreaInradiusUnit: surfaceAreaInradiusUnit,
                  radiusInheightUnit: radiusInheightUnit,
                  $heightInradiusUnit: $heightInradiusUnit,
                  submitted_height: submitted_height,
                  submittedradius: submittedradius
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
                <Label title={LABELS.baseRadius} />
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

              <div className="form-row">
                <Label title={LABELS.height} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="height"
                  placeholder={PLACEHOLDERS.number}
                  value={values.height}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="height_unit"
                  measurement="length"
                  value={values.height_unit}
                  onChange={handleChange('height_unit')}
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
        {selectedResult ? (
          <div className="text-center mb-3">
            <Typography variant="subtitle1">Surface Area: {Result.surfaceArea}</Typography>
            <Typography variant="subtitle1"> Radius: {Result.submitted_height} </Typography>
            <Typography variant="subtitle1"> Height: {Result.submittedradius} </Typography>
            <Typography variant="subtitle1"> Unit: {Result.units} </Typography>
          </div>
        ) : (
          <div className="text-center mb-3">
            <Typography variant="subtitle1">surfaceAreaInradiusUnit: {resultTwo.surfaceAreaInradiusUnit}</Typography>
            <Typography variant="subtitle1"> surfaceAreaInheightUnit: {resultTwo.surfaceAreaInheightUnit} </Typography>
            <Typography variant="subtitle1"> submittedradius: {resultTwo.submittedradius} </Typography>
            <Typography variant="subtitle1"> submitted_height: {resultTwo.submitted_height} </Typography>
            <Typography variant="subtitle1"> submitted_height: {resultTwo.radiusInheightUnit} </Typography>
            <Typography variant="subtitle1"> submitted_height: {resultTwo.$heightInradiusUnit} </Typography>

          </div>
        )}
      </ResultTabsContainer>


    </>
  )
}

export default CapsuleSurfaceArea
