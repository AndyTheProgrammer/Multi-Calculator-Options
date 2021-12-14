import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'

import { CylindricalTankAreaI } from '../../../../../types'
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

const CylindricalTankSurfArea = (props: any) => {
  const { openDrop } = props
  const [initialFormValues] = React.useState({
    radius: "",
    radius_unit: "",
    height: "",
    height_unit: "",
  })
  const [Result, setResult] = React.useState({
    baseSurfaceArea: 0,
    lateralSurfaceArea: 0,
    cylindricalTankSurfaceArea: 0,
    units: ''
  })
  const [resultTwo, setResultTwo] = React.useState({
    submitedRadius: 0,
    radiusUnit: '',
    radiusToHeightUnit: 0,
    height: 0,
    heightUnit: '',
    heightToRadiusUnit: 0,
    radiusUnitBaseSurfaceArea: 0,
    radiusUnitLateralSurfaceArea: 0,
    radiusUnitTotalArea: 0
  })

  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.cylindricalTankSurfArea}
        sm={6}
        dropDown={true}
        openDrop={openDrop}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            radius,
            radius_unit,
            height,
            height_unit,
          }, { setSubmitting }) => {
            const payload: CylindricalTankAreaI = {
              radius,
              radius_unit,
              height,
              height_unit,
              method: 'cylindricalTankSurfaceAreaCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: cylindricalTank } = await calculateMath(payload)
              console.log('=====>', cylindricalTank)
              const {
                base_surface_area,
                lateral_surface_area,
                cylindricalTankSurfaceArea,
                units,
                unitType,
                submitedRadius,
                radiusUnit,
                radiusToHeightUnit,
                height,
                heightUnit,
                heightToRadiusUnit,
                radiusUnitBaseSurfaceArea,
                radiusUnitLateralSurfaceArea,
                radiusUnitTotalArea,
              } = cylindricalTank
              if (typeof cylindricalTank === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setResult({
                  baseSurfaceArea: base_surface_area,
                  lateralSurfaceArea: lateral_surface_area,
                  cylindricalTankSurfaceArea,
                  units
                })
              }

              if (typeof cylindricalTank === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setResultTwo({
                  submitedRadius,
                  radiusUnit,
                  radiusToHeightUnit,
                  height,
                  heightUnit,
                  heightToRadiusUnit,
                  radiusUnitBaseSurfaceArea,
                  radiusUnitLateralSurfaceArea,
                  radiusUnitTotalArea,
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
      {selectedResult ? (<ResultTabsContainer tabTitle1={'Result'} sm={6}>
        <div className="text-wrap">
          <Typography variant="subtitle1"> Top Surface Area = π x r<sup>2</sup></Typography>
          <Typography variant="subtitle1"> Bottom Surface Area = π x r<sup>2</sup></Typography>
          <Typography variant="subtitle1"> Lateral Surface Area = 2 x π x 2 x 3</Typography>

          <Typography variant="subtitle1">Base Surface Area: {Result.baseSurfaceArea}</Typography>
          <Typography variant="subtitle1">Lateral Surface Area: {Result.lateralSurfaceArea}</Typography>
          <Typography variant="subtitle1">cylindricalTankSurfaceArea: {Result.cylindricalTankSurfaceArea}</Typography>
          <Typography variant="subtitle1">Unit: {Result.units}</Typography>
        </div>
      </ResultTabsContainer>) : (
        <ResultTabsContainer tabTitle1={'Result'} sm={6}>
          <div className="text-wrap">
            <Typography variant="subtitle1">Base Surface Area: {resultTwo.radiusUnitBaseSurfaceArea}</Typography>
            <Typography variant="subtitle1">Lateral Surface Area: {resultTwo.radiusUnitLateralSurfaceArea}</Typography>
            <Typography variant="subtitle1">radiusUnitTotalArea: {resultTwo.radiusUnitTotalArea}</Typography>
            <Typography variant="subtitle1">submitedRadius: {resultTwo.submitedRadius}</Typography>
            <Typography variant="subtitle1">radiusUnit: {resultTwo.radiusUnit}</Typography>
            <Typography variant="subtitle1">radiusToHeightUnit: {resultTwo.radiusToHeightUnit}</Typography>
            <Typography variant="subtitle1">heightUnit: {resultTwo.heightUnit}</Typography>
            <Typography variant="subtitle1">heightToRadiusUnit: {resultTwo.heightToRadiusUnit}</Typography>
            <Typography variant="subtitle1">height: {resultTwo.height}</Typography>

          </div>
        </ResultTabsContainer>
      )}



    </>
  )
}

export default CylindricalTankSurfArea
