import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'

import { ConeAreaI } from '../../../../types'
import { calculateMath } from '../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  COLORS
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  CustomBtn,
  CustomResetBtn,
  Label,
  StyledTabs,
  NoIndexTabPanel,
} from '../../../custom'

const ConeSurfArea = () => {
  const [initialFormValues] = React.useState({
    radius: "",
    radius_unit: "",
    height: "",
    height_unit: "",
  })
  const [Result, setResult] = React.useState({
    $lateralSurfaceArea: 0,
    baseSurfaceSrea: 0,
    totalConeSurfaceArea: 0,
    units: ''
  })

  const [resultTwo, setResultTwo] = React.useState({
    submitedRadius: '',
    radiusUnit: '',
    radiusToHeightUnit: 0,
    height: '',
    heightUnit: '',
    heightToRadiusUnit: 0,
    radiusUnitBaseSurfaceArea: 0,
    radiusUnitlateralSurfaceArea: 0,
    radiusUnitTotalSurfaceArea: 0,
    heightUnitBaseSurfaceArea: 0,
    heightUnitlateralSurfaceArea: 0,
    heightUnitTotalSurfaceArea: 0
  })

  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)


  return (
    <div>
      <Grid item xs={12}>
        <Typography className="text-center" variant="h5" gutterBottom>
          {CALCULATORS.coneSurfArea}
        </Typography>
      </Grid>

      <Formik
        initialValues={initialFormValues}
        onSubmit={async ({
          radius,
          radius_unit,
          height,
          height_unit,
        }, { setSubmitting, resetForm }) => {
          const payload: ConeAreaI = {
            radius,
            radius_unit,
            height,
            height_unit,
            method: 'coneSurfaceAreaCalculator'
          }
          console.log(JSON.stringify(payload))
          try {
            const { payload: coneArea } = await calculateMath(payload)
            console.log('=====>', coneArea)
            const {
              $lateralSurfaceArea,
              totalConeSurfaceArea,
              baseSurfaceSrea,
              units,
              unitType,
              submitedRadius,
              radiusUnit,
              radiusToHeightUnit,
              height,
              heightUnit,
              heightToRadiusUnit,
              radiusUnitBaseSurfaceArea,
              radiusUnitlateralSurfaceArea,
              radiusUnitTotalSurfaceArea,
              heightUnitBaseSurfaceArea,
              heightUnitlateralSurfaceArea,
              heightUnitTotalSurfaceArea
            } = coneArea

            if (typeof coneArea === 'object' && unitType === true) {
              setSelectedResult(unitType)
              setResult({
                $lateralSurfaceArea: $lateralSurfaceArea,
                baseSurfaceSrea: baseSurfaceSrea,
                totalConeSurfaceArea: totalConeSurfaceArea,
                units: units
              })

            }

            if (typeof coneArea === 'object' && unitType === false) {
              setSelectedResult(unitType)
              setResultTwo({
                submitedRadius: submitedRadius,
                radiusUnit: radiusUnit,
                radiusToHeightUnit: radiusToHeightUnit,
                height: height,
                heightUnit: heightUnit,
                heightToRadiusUnit: heightToRadiusUnit,
                radiusUnitBaseSurfaceArea: radiusUnitBaseSurfaceArea,
                radiusUnitlateralSurfaceArea: radiusUnitlateralSurfaceArea,
                radiusUnitTotalSurfaceArea: radiusUnitTotalSurfaceArea,
                heightUnitBaseSurfaceArea: heightUnitBaseSurfaceArea,
                heightUnitlateralSurfaceArea: heightUnitlateralSurfaceArea,
                heightUnitTotalSurfaceArea: heightUnitTotalSurfaceArea
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
                value={values.height_unit}
                onChange={handleChange('height_unit')}
              />
            </div>

            <CustomBtn />
            {selectedResult ? (<div className="text-center mb-3">
              <Typography variant="subtitle1">LateralSurfaceArea: {Result.$lateralSurfaceArea} </Typography>
              <Typography variant="subtitle1">BaseSurfaceArea: {Result.baseSurfaceSrea} </Typography>
              <Typography variant="subtitle1">TotalConeSurfaceArea: {Result.totalConeSurfaceArea} </Typography>
              <Typography variant="subtitle1">Units: {Result.units} </Typography>
            </div>) : (<div className="text-center mb-3">
              <Typography variant="subtitle1">radiusUnitlateralSurfaceArea: {resultTwo.radiusUnitlateralSurfaceArea} </Typography>
              <Typography variant="subtitle1">radiusUnitTotalSurfaceArea: {resultTwo.radiusUnitTotalSurfaceArea} </Typography>
              <Typography variant="subtitle1">radiusUnitBaseSurfaceArea: {resultTwo.radiusUnitBaseSurfaceArea} </Typography>
              <Typography variant="subtitle1">radiusUnit: {resultTwo.radiusUnit} </Typography>
              <Typography variant="subtitle1">radiusUnit: {resultTwo.radiusToHeightUnit} </Typography>
              <Typography variant="subtitle1">heightUnitlateralSurfaceArea: {resultTwo.heightUnitlateralSurfaceArea} </Typography>
              <Typography variant="subtitle1">heightUnitTotalSurfaceArea: {resultTwo.heightUnitTotalSurfaceArea} </Typography>
              <Typography variant="subtitle1">heightUnitBaseSurfaceArea: {resultTwo.heightUnitBaseSurfaceArea} </Typography>
              <Typography variant="subtitle1">heightUnit: {resultTwo.heightUnit} </Typography>
              <Typography variant="subtitle1">heightUnit: {resultTwo.heightToRadiusUnit} </Typography>
              <Typography variant="subtitle1">heightUnit: {resultTwo.height} </Typography>




            </div>)}


          </form>
        )}

      </Formik>
    </div>
  )
}

export default ConeSurfArea
