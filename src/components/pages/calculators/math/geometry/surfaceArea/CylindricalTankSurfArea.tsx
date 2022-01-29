import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { CylindricalTankAreaI } from '../../../../../../types'
import { calculateMath } from '../../../../../../services/AppCalculatorsApi'
import { cylinder } from '../../../../../../common/assets';
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  LATEX,
  SURFACEAREA_CALCULATORS,
  GEOMETRY_PLACEHOLDERS,
} from '../../../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  Label,
  FormRow,
  FormTabsContainer,
  ResultTabsContainer,
  PlaceHolder,
  Image,
  FieldContainer,
} from '../../../../../custom'

const Latex = require('react-latex');

const CylindricalTankSurfArea = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [formAnimation, formApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(0px)' : 'translateX(0px)',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [resultAnimation, resultApi] = useSpring(() => ({
    transform: matches === true ? 'translateY(-200px)' : 'translateX(-210px)',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [initialFormValues] = React.useState({
    radius: "",
    radius_unit: "mm",
    height: "",
    height_unit: "mm",
  })

  const [Result, setResult] = React.useState({
    baseSurfaceArea: 0,
    lateralSurfaceArea: 0,
    totalSurfaceArea: 0,
    unit: '',
    radius: '',
    radius_unit: '',
    height: '',
    height_unit: '',
  })

  const [resultTwo, setResultTwo] = React.useState({
    heightUnitBaseSurfaceArea: 0,
    heightUnitLateralSurfaceArea: 0,
    heightUnitTotalArea: 0,
    radiusUnitBaseSurfaceArea: 0,
    radiusUnitLateralSurfaceArea: 0,
    radiusUnitTotalArea: 0,
    radius: '',
    radius_unit: '',
    height: '',
    height_unit: '',
    heightToRadiusUnit: '',
    radiusToHeightUnit: '',
  })

  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Do not forget to add placeHolder components on all other calculators */}
      <PlaceHolder
        placeHolder={GEOMETRY_PLACEHOLDERS.cylindricalTankSurfArea}
      />
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.cylindricalTankSurfArea}
        dropDown={true}
        opened={open}
        animation={formAnimation}
        onHandleOpen={handleClickOpen}
        calculatorList={SURFACEAREA_CALCULATORS}
      >
        <Image path={cylinder} />
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
                heightToRadiusUnit,
                radiusToHeightUnit,
              } = cylindricalTank
              if (typeof cylindricalTank === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setResult({
                  baseSurfaceArea: base_surface_area,
                  lateralSurfaceArea: lateral_surface_area,
                  totalSurfaceArea: cylindricalTankSurfaceArea,
                  unit: units,
                  radius,
                  radius_unit,
                  height,
                  height_unit,
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
                  radius,
                  radius_unit,
                  height,
                  height_unit,
                  heightToRadiusUnit,
                  radiusToHeightUnit,
                })
              }
              if (success === true) {
                setAnswer(success)
                formApi.start({
                  transform: matches === true ? 'translateX(0px)' : 'translateY(0px)', alignItems: 'center', justifyContent: 'flex-start',
                });
                resultApi.start({
                  transform: matches === true ? 'translateX(0px)' : 'translateY(0px)', alignItems: 'center', justifyContent: 'flex-end',
                })
              }
            } catch (err) {
              console.log('====>', err)
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, resetForm }) => (
            <form onSubmit={handleSubmit} className="form-container">
              <FieldContainer>
                <FormRow>
                  <Label title={LABELS.radius} />
                  <CustomTextInput
                    type={INPUT_TYPE.text}
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
                </FormRow>

                <FormRow>
                  <Label title={LABELS.height} />
                  <CustomTextInput
                    type={INPUT_TYPE.text}
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
                </FormRow>
              </FieldContainer>

              <FormRow buttons reset={() => resetForm()} />
            </form>
          )}
        </Formik>
      </FormTabsContainer>

      {/* Results grid */}
      {answer === true &&
        <ResultTabsContainer
          tabTitle={'Result'}
          animation={resultAnimation}
        >
          <Typography variant="subtitle1">
            <Latex displayMode={false}>{LATEX.cylinderSurfArea_base}</Latex>
          </Typography>

          <Typography variant="subtitle1">
            <Latex displayMode={false}>{LATEX.cylinderSurfArea_lateral}</Latex>
          </Typography>

          <Typography variant="subtitle1">
            <Latex displayMode={false}>{LATEX.cylinderSurfArea_total}</Latex>
          </Typography>

          <Typography variant="subtitle2">
            <Latex displayMode={false}>
              {`$Taking \\ \\pi \\ as \\ 3.14159265$`}
            </Latex>
          </Typography>

          <Typography gutterBottom />

          {selectedResult ? (
            <div>
              {/* Base surface area */}
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$Base \\ SA = 2\\pi ${Result.radius}^{2}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ = \\pi ${2 * parseFloat(Result.radius) * parseFloat(Result.radius)}$`}
                </Latex>
              </Typography>

              {/* Base answer */}
              <Typography variant="subtitle2" className='final-answer' gutterBottom>
                <Latex displayMode={false}>
                  {`$= ${Result.baseSurfaceArea}${Result.unit}^{2}$`}
                </Latex>
              </Typography>

              {/* lateral surface area */}
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$Lateral \\ SA = 2 \\pi ${Result.height}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$= \\pi ${parseFloat(Result.height) * 2}$`}
                </Latex>
              </Typography>

              {/* lateral answer */}
              <Typography variant="subtitle2" className='final-answer' gutterBottom>
                <Latex displayMode={false}>
                  {`$= ${Result.lateralSurfaceArea}${Result.unit}^{2}$`}
                </Latex>
              </Typography>

              {/* Answer */}
              <Typography variant="subtitle1" className='final-answer'>
                <Latex displayMode={false}>
                  {`$Total \\ SA = ${Result.totalSurfaceArea}${Result.unit}^{2}$`}
                </Latex>
              </Typography>
            </div>

          ) : (

            <div >
              {/* Radius */}
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$${resultTwo.height}${resultTwo.height_unit} = ${resultTwo.heightToRadiusUnit}${resultTwo.radius_unit}$`}
                </Latex>
              </Typography>

              {/* Base surface area */}
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$Base \\ SA = 2 \\pi ${resultTwo.heightToRadiusUnit}^{2}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ = \\pi ${2 * parseFloat(resultTwo.heightToRadiusUnit) * parseFloat(resultTwo.heightToRadiusUnit)}$`}
                </Latex>
              </Typography>

              {/* Base answer */}
              <Typography variant="subtitle2" className='final-answer' gutterBottom>
                <Latex displayMode={false}>
                  {`$= ${resultTwo.radiusUnitBaseSurfaceArea}${resultTwo.radius_unit}^{2}$`}
                </Latex>
              </Typography>

              {/* lateral surface area */}
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$Lateral \\ SA = 2\\pi ${resultTwo.heightToRadiusUnit}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$= \\pi ${parseFloat(resultTwo.heightToRadiusUnit) * 2}$`}
                </Latex>
              </Typography>

              {/* lateral answer */}
              <Typography variant="subtitle2" className='final-answer' gutterBottom>
                <Latex displayMode={false}>
                  {`$= ${resultTwo.radiusUnitLateralSurfaceArea}${resultTwo.radius_unit}^{2}$`}
                </Latex>
              </Typography>

              {/* Answer */}
              <Typography variant="subtitle1" className='final-answer'>
                <Latex displayMode={false}>
                  {`$Total \\ SA = ${resultTwo.radiusUnitTotalArea}${resultTwo.radius_unit}^{2}$`}
                </Latex>
              </Typography>


              <Typography variant="subtitle1">
                <Latex displayMode={true}>
                  {`$or$`}
                </Latex>
              </Typography>


              {/* Height */}
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$${resultTwo.radius}${resultTwo.radius_unit} = ${resultTwo.radiusToHeightUnit}${resultTwo.height_unit}$`}
                </Latex>
              </Typography>

              {/* Base surface area */}
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$Base \\ SA = 2 \\pi ${resultTwo.radiusToHeightUnit}^{2}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ = \\pi ${2 * parseFloat(resultTwo.radiusToHeightUnit) * parseFloat(resultTwo.radiusToHeightUnit)}$`}
                </Latex>
              </Typography>

              {/* Base answer */}
              <Typography variant="subtitle2" className='final-answer' gutterBottom>
                <Latex displayMode={false}>
                  {`$= ${resultTwo.heightUnitBaseSurfaceArea}${resultTwo.height_unit}^{2}$`}
                </Latex>
              </Typography>

              {/* lateral surface area */}
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$Lateral \\ SA = 2 \\pi ${resultTwo.height}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$= 2 \\pi ${parseFloat(resultTwo.height) * 2}$`}
                </Latex>
              </Typography>

              {/* lateral answer */}
              <Typography variant="subtitle2" className='final-answer' gutterBottom>
                <Latex displayMode={false}>
                  {`$= ${resultTwo.heightUnitLateralSurfaceArea}${resultTwo.height_unit}^{2}$`}
                </Latex>
              </Typography>

              {/* Answer */}
              <Typography variant="subtitle1" className='final-answer'>
                <Latex displayMode={false}>
                  {`$Total \\ SA = ${resultTwo.heightUnitTotalArea}${resultTwo.height_unit}^{2}$`}
                </Latex>
              </Typography>
            </div>
          )}

        </ResultTabsContainer>
      }
    </>
  )
}

export default CylindricalTankSurfArea
