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

const Latex = require('react-latex');

const CylindricalTankSurfArea = (props: any) => {
  const { openDrop } = props
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [initialFormValues] = React.useState({
    radius: "",
    radius_unit: "",
    height: "",
    height_unit: "",
  })
  const [Result, setResult] = React.useState({
    baseSurfaceArea: 0,
    lateralSurfaceArea: 0,
    totalSurfaceArea: 0,
    units: ''
  })
  const [resultTwo, setResultTwo] = React.useState({
    heightUnitBaseSurfaceArea: 0,
    heightUnitLateralSurfaceArea: 0,
    heightUnitTotalArea: 0,
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
              const { success, payload: cylindricalTank } = await calculateMath(payload)
              console.log('=====>', cylindricalTank)
              const {
                base_surface_area,
                lateral_surface_area,
                cylindricalTankSurfaceArea,
                units,
                unitType,
                heightUnitBaseSurfaceArea,
                heightUnitLateralSurfaceArea,
                heightUnitTotalArea,
                radiusUnitBaseSurfaceArea,
                radiusUnitLateralSurfaceArea,
                radiusUnitTotalArea,
              } = cylindricalTank
              if (typeof cylindricalTank === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setResult({
                  baseSurfaceArea: base_surface_area,
                  lateralSurfaceArea: lateral_surface_area,
                  totalSurfaceArea: cylindricalTankSurfaceArea,
                  units: units
                })
              }

              if (typeof cylindricalTank === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setResultTwo({
                  heightUnitBaseSurfaceArea,
                  heightUnitLateralSurfaceArea,
                  heightUnitTotalArea,
                  radiusUnitBaseSurfaceArea,
                  radiusUnitLateralSurfaceArea,
                  radiusUnitTotalArea,
                })
              }
              if (success === true) {
                setAnswer(success)
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
      <ResultTabsContainer tabTitle={'Result'} sm={6}>
        {answer === true &&
          <div>
            {selectedResult ? (
              <div className="text-wrap">
                <Latex displayMode={true}>{LATEX.cylinderSurfArea_base}</Latex>
                <Latex displayMode={true}>{LATEX.cylinderSurfArea_lateral}</Latex>
                <Latex displayMode={true}>{LATEX.cylinderSurfArea_total}</Latex>

                <Typography variant="subtitle1">
                  Base SA = {Result.baseSurfaceArea}{Result.units}<sup>2</sup>
                </Typography>
                <Typography variant="subtitle1">
                  Lateral SA = {Result.lateralSurfaceArea}{Result.units}<sup>2</sup>
                </Typography>
                <Typography variant="subtitle1">
                  Total SA = {Result.totalSurfaceArea}{Result.units}<sup>2</sup>
                </Typography>
              </div>

            ) : (

              <div className="text-wrap">
                <Latex displayMode={true}>{LATEX.cylinderSurfArea_base}</Latex>
                <Latex displayMode={true}>{LATEX.cylinderSurfArea_lateral}</Latex>
                <Latex displayMode={true}>{LATEX.cylinderSurfArea_total}</Latex>

                <Typography variant="subtitle1">
                  Base SA = {resultTwo.radiusUnitBaseSurfaceArea}
                </Typography>
                <Typography variant="subtitle1">
                  Lateral SA = {resultTwo.radiusUnitLateralSurfaceArea}
                </Typography>
                <Typography variant="subtitle1">
                  Total SA = {resultTwo.radiusUnitTotalArea}
                </Typography>

                <Typography variant="subtitle1">
                  Base SA = {resultTwo.heightUnitBaseSurfaceArea}
                </Typography>
                <Typography variant="subtitle1">
                  Lateral SA = {resultTwo.heightUnitLateralSurfaceArea}
                </Typography>
                <Typography variant="subtitle1">
                  Total SA = {resultTwo.heightUnitTotalArea}
                </Typography>
              </div>
            )}
          </div>
        }

      </ResultTabsContainer>

    </>
  )
}

export default CylindricalTankSurfArea
