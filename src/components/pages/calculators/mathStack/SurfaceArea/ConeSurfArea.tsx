import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { ConeAreaI } from '../../../../../types'
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

const ConeSurfArea = (props: any) => {
  const { openDrop } = props;
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [initialFormValues] = React.useState({
    radius: "",
    radius_unit: "",
    height: "",
    height_unit: "",
  })
  const [Result, setResult] = React.useState({
    lateralSurfaceArea: 0,
    baseSurfaceSrea: 0,
    totalConeSurfaceArea: 0,
    units: ''
  })

  const [resultTwo, setResultTwo] = React.useState({
    radiusUnit: '',
    heightUnit: '',
    radiusUnitBaseSurfaceArea: 0,
    radiusUnitlateralSurfaceArea: 0,
    radiusUnitTotalSurfaceArea: 0,
    heightUnitBaseSurfaceArea: 0,
    heightUnitlateralSurfaceArea: 0,
    heightUnitTotalSurfaceArea: 0
  })

  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.coneSurfArea}
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
              const { success, payload: coneArea } = await calculateMath(payload)
              console.log('=====>', coneArea)
              const {
                $lateralSurfaceArea,
                totalConeSurfaceArea,
                baseSurfaceSrea,
                units,
                unitType,
                radiusUnit,
                heightUnit,
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
                  lateralSurfaceArea: $lateralSurfaceArea,
                  baseSurfaceSrea: baseSurfaceSrea,
                  totalConeSurfaceArea: totalConeSurfaceArea,
                  units: units
                })

              }

              if (typeof coneArea === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setResultTwo({
                  radiusUnit: radiusUnit,
                  heightUnit: heightUnit,
                  radiusUnitBaseSurfaceArea: radiusUnitBaseSurfaceArea,
                  radiusUnitlateralSurfaceArea: radiusUnitlateralSurfaceArea,
                  radiusUnitTotalSurfaceArea: radiusUnitTotalSurfaceArea,
                  heightUnitBaseSurfaceArea: heightUnitBaseSurfaceArea,
                  heightUnitlateralSurfaceArea: heightUnitlateralSurfaceArea,
                  heightUnitTotalSurfaceArea: heightUnitTotalSurfaceArea
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
                <Latex displayMode={true}>{LATEX.conicalFrustrumSurfArea_circular}</Latex>
                <Latex displayMode={true}>{LATEX.conicalFrustrumSurfArea_lateral}</Latex>
                <Latex displayMode={true}>{LATEX.conicalFrustrumSurfArea_total}</Latex>

                <Typography variant="subtitle1">
                  Lateral SA = {Result.lateralSurfaceArea}{Result.units}<sup>2</sup>
                </Typography>
                <Typography variant="subtitle1">
                  Base SA = {Result.baseSurfaceSrea}{Result.units}<sup>2</sup>
                </Typography>
                <Typography variant="subtitle1">
                  Total SA = {Result.totalConeSurfaceArea}{Result.units}<sup>2</sup>
                </Typography>
              </div>
            ) : (
              <div className="text-wrap">
                <Latex displayMode={true}>{LATEX.conicalFrustrumSurfArea_circular}</Latex>
                <Latex displayMode={true}>{LATEX.conicalFrustrumSurfArea_lateral}</Latex>
                <Latex displayMode={true}>{LATEX.conicalFrustrumSurfArea_total}</Latex>

                <Typography variant="subtitle1">
                  Base SA = {resultTwo.radiusUnitBaseSurfaceArea}{resultTwo.radiusUnit}<sup>2</sup>
                </Typography>
                <Typography variant="subtitle1">
                  Lateral SA =  {resultTwo.radiusUnitlateralSurfaceArea}{resultTwo.radiusUnit}<sup>2</sup>
                </Typography>
                <Typography variant="subtitle1">
                  Total SA = {resultTwo.radiusUnitTotalSurfaceArea}{resultTwo.radiusUnit}<sup>2</sup>
                </Typography>

                <Typography variant="subtitle2">
                  or
                </Typography>

                <Typography variant="subtitle1">
                  Base SA = {resultTwo.heightUnitBaseSurfaceArea}{resultTwo.heightUnit}<sup>2</sup>
                </Typography>
                <Typography variant="subtitle1">
                  Lateral SA = {resultTwo.heightUnitlateralSurfaceArea}{resultTwo.heightUnit}<sup>2</sup>
                </Typography>
                <Typography variant="subtitle1">
                  Total SA = {resultTwo.heightUnitTotalSurfaceArea}{resultTwo.heightUnit}<sup>2</sup>
                </Typography>
              </div>
            )}
          </div>
        }

      </ResultTabsContainer>



    </>
  )
}

export default ConeSurfArea
