import React from 'react';
import { Typography } from '@material-ui/core';
import { Formik } from 'formik';
import { useSpring, animated } from 'react-spring';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { ConeAreaI } from '../../../../../../types';
import { calculateMath } from '../../../../../../services/AppCalculatorsApi';
import { cone } from '../../../../../../common/assets';
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  LATEX,
  SURFACEAREA_CALCULATORS,
  GEOMETRY_PLACEHOLDERS,
} from '../../../../../../common/shared';
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
} from '../../../../../custom';
const Latex = require('react-latex');

const ConeSurfArea = () => {
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
    radius: '',
    radius_unit: 'mm',
    height: '',
    height_unit: 'mm',
  })
  const [Result, setResult] = React.useState({
    lateralSurfaceArea: 0,
    baseSurfaceSrea: 0,
    totalConeSurfaceArea: 0,
    radius: '',
    height: '',
    unit: '',
  })

  const [resultTwo, setResultTwo] = React.useState({
    radiusUnit: '',
    heightUnit: '',
    radiusUnitBaseSurfaceArea: 0,
    radiusUnitlateralSurfaceArea: 0,
    radiusUnitTotalSurfaceArea: 0,
    heightUnitBaseSurfaceArea: 0,
    heightUnitlateralSurfaceArea: 0,
    heightUnitTotalSurfaceArea: 0,
    radius: '',
    height: '',
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
        placeHolder={GEOMETRY_PLACEHOLDERS.coneSurfArea}
      />
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.coneSurfArea}
        dropDown={true}
        opened={open}
        animation={formAnimation}
        onHandleOpen={handleClickOpen}
        calculatorList={SURFACEAREA_CALCULATORS}
      >
        <Image path={cone} />
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
                heightUnitTotalSurfaceArea,
                heightToRadiusUnit,
                radiusToHeightUnit
              } = coneArea

              if (typeof coneArea === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setResult({
                  lateralSurfaceArea: $lateralSurfaceArea,
                  baseSurfaceSrea: baseSurfaceSrea,
                  totalConeSurfaceArea: totalConeSurfaceArea,
                  radius,
                  height,
                  unit: units,
                })

              }

              // If the user selects diferrent units, display these results.
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
                  heightUnitTotalSurfaceArea: heightUnitTotalSurfaceArea,
                  radius,
                  height,
                  heightToRadiusUnit,
                  radiusToHeightUnit
                })
              }
              if (success === true) {
                setAnswer(success)
              }
              if (success === true) {
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
        <ResultTabsContainer tabTitle={'Result'} animation={resultAnimation}>
          <Typography variant="subtitle1">
            <Latex displayMode={false}>
              {LATEX.coneSurfArea_base}
            </Latex>
          </Typography>

          <Typography variant="subtitle1">
            <Latex displayMode={false}>
              {LATEX.coneSurfArea_lateral}
            </Latex>
          </Typography>

          <Typography variant="subtitle1">
            <Latex displayMode={false}>
              {LATEX.coneSurfArea_total}
            </Latex>
          </Typography>

          <Typography variant="subtitle2">
            <Latex displayMode={false}>
              {`$Taking \\ \\pi \\ as \\ 3.14159265$`}
            </Latex>
          </Typography>

          <Typography gutterBottom />

          <div>
            {selectedResult ? (
              <div>
                {/* Base surface area */}
                <Typography variant="subtitle1">
                  <Latex displayMode={false}>
                    {`$Base \\ SA = \\pi ${Result.radius}^{2}$`}
                  </Latex>
                </Typography>

                <Typography variant="subtitle1">
                  <Latex displayMode={false}>
                    {`$ = \\pi ${parseFloat(Result.radius) * parseFloat(Result.radius)}$`}
                  </Latex>
                </Typography>

                {/* Base answer */}
                <Typography variant="subtitle2" className='final-answer' gutterBottom>
                  <Latex displayMode={false}>
                    {`$= ${Result.baseSurfaceSrea}${Result.unit}^{2}$`}
                  </Latex>
                </Typography>

                {/* lateral surface area */}
                <Typography variant="subtitle1">
                  <Latex displayMode={false}>
                    {`$Lateral \\ SA = \\pi 3 \\sqrt{${Result.radius}^{2} + ${Result.height}^{2}}$`}
                  </Latex>
                </Typography>

                <Typography variant="subtitle1">
                  <Latex displayMode={false}>
                    {`$= \\pi 3 \\sqrt{${parseFloat(Result.radius) * parseFloat(Result.radius)} + ${parseFloat(Result.height) * parseFloat(Result.height)}}$`}
                  </Latex>
                </Typography>

                {/* lateral answer */}
                <Typography variant="subtitle2" className='final-answer' gutterBottom>
                  <Latex displayMode={false}>
                    {`$= ${Result.lateralSurfaceArea}${Result.unit}^{2}$`}
                  </Latex>
                </Typography>

                {/* Total surface area */}
                {/* <Typography variant="subtitle1">
                  <Latex displayMode={false}>
                    {`$Total \\ SA = ${Result.baseSurfaceSrea} + ${Result.lateralSurfaceArea}$`}
                  </Latex>
                </Typography> */}

                {/* Answer */}
                <Typography variant="subtitle1" className='final-answer'>
                  <Latex displayMode={false}>
                    {`$Total \\ SA = ${Result.totalConeSurfaceArea}${Result.unit}^{2}$`}
                  </Latex>
                </Typography>
              </div>

            ) : (

              <div>
                {/* Radius */}
                <Typography variant="subtitle1">
                  <Latex displayMode={false}>
                    {`$${resultTwo.height}${resultTwo.heightUnit} = ${resultTwo.heightToRadiusUnit}${resultTwo.radiusUnit}$`}
                  </Latex>
                </Typography>

                {/* Base surface area */}
                <Typography variant="subtitle1">
                  <Latex displayMode={false}>
                    {`$Base \\ SA = \\pi ${resultTwo.heightToRadiusUnit}^{2}$`}
                  </Latex>
                </Typography>

                <Typography variant="subtitle1">
                  <Latex displayMode={false}>
                    {`$ = \\pi ${parseFloat(resultTwo.heightToRadiusUnit) * parseFloat(resultTwo.heightToRadiusUnit)}$`}
                  </Latex>
                </Typography>

                {/* Base answer */}
                <Typography variant="subtitle2" className='final-answer' gutterBottom>
                  <Latex displayMode={false}>
                    {`$= ${resultTwo.radiusUnitBaseSurfaceArea}${resultTwo.radiusUnit}^{2}$`}
                  </Latex>
                </Typography>

                {/* lateral surface area */}
                <Typography variant="subtitle1">
                  <Latex displayMode={false}>
                    {`$Lateral \\ SA = \\pi 3 \\sqrt{${resultTwo.radius}^{2} + ${resultTwo.heightToRadiusUnit}^{2}}$`}
                  </Latex>
                </Typography>

                <Typography variant="subtitle1">
                  <Latex displayMode={false}>
                    {`$= \\pi 3 \\sqrt{${parseFloat(resultTwo.radius) * parseFloat(resultTwo.radius)} + ${parseFloat(resultTwo.heightToRadiusUnit) * parseFloat(resultTwo.heightToRadiusUnit)}}$`}
                  </Latex>
                </Typography>

                {/* lateral answer */}
                <Typography variant="subtitle2" className='final-answer' gutterBottom>
                  <Latex displayMode={false}>
                    {`$= ${resultTwo.radiusUnitlateralSurfaceArea}${resultTwo.radiusUnit}^{2}$`}
                  </Latex>
                </Typography>

                {/* Total surface area */}
                {/* <Typography variant="subtitle1">
                  <Latex displayMode={false}>
                    {`$Total \\ SA = ${resultTwo.radiusUnitBaseSurfaceArea} + ${resultTwo.radiusUnitlateralSurfaceArea}$`}
                  </Latex>
                </Typography> */}

                {/* Answer */}
                <Typography variant="subtitle1" className='final-answer'>
                  <Latex displayMode={false}>
                    {`$Total \\ SA = ${resultTwo.radiusUnitTotalSurfaceArea}${resultTwo.radiusUnit}^{2}$`}
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
                    {`$${resultTwo.radius}${resultTwo.radiusUnit} = ${resultTwo.radiusToHeightUnit}${resultTwo.heightUnit}$`}
                  </Latex>
                </Typography>

                {/* Base surface area */}
                <Typography variant="subtitle1">
                  <Latex displayMode={false}>
                    {`$Base \\ SA = \\pi ${resultTwo.radiusToHeightUnit}^{2}$`}
                  </Latex>
                </Typography>

                <Typography variant="subtitle1">
                  <Latex displayMode={false}>
                    {`$ = \\pi ${parseFloat(resultTwo.radiusToHeightUnit) * parseFloat(resultTwo.radiusToHeightUnit)}$`}
                  </Latex>
                </Typography>

                {/* Base answer */}
                <Typography variant="subtitle2" className='final-answer' gutterBottom>
                  <Latex displayMode={false}>
                    {`$= ${resultTwo.heightUnitBaseSurfaceArea}${resultTwo.heightUnit}^{2}$`}
                  </Latex>
                </Typography>

                {/* lateral surface area */}
                <Typography variant="subtitle1">
                  <Latex displayMode={false}>
                    {`$Lateral \\ SA = \\pi 3 \\sqrt{${resultTwo.radiusToHeightUnit}^{2} + ${resultTwo.height}^{2}}$`}
                  </Latex>
                </Typography>

                <Typography variant="subtitle1">
                  <Latex displayMode={false}>
                    {`$= \\pi 3 \\sqrt{${parseFloat(resultTwo.radiusToHeightUnit) * parseFloat(resultTwo.radiusToHeightUnit)} + ${parseFloat(resultTwo.height) * parseFloat(resultTwo.height)}}$`}
                  </Latex>
                </Typography>

                {/* lateral answer */}
                <Typography variant="subtitle2" className='final-answer' gutterBottom>
                  <Latex displayMode={false}>
                    {`$= ${resultTwo.heightUnitlateralSurfaceArea}${resultTwo.heightUnit}^{2}$`}
                  </Latex>
                </Typography>

                {/* Total surface area */}
                {/* <Typography variant="subtitle1">
                  <Latex displayMode={false}>
                    {`$Total \\ SA = ${resultTwo.heightUnitBaseSurfaceArea} + ${resultTwo.heightUnitlateralSurfaceArea}$`}
                  </Latex>
                </Typography> */}

                {/* Answer */}
                <Typography variant="subtitle1" className='final-answer'>
                  <Latex displayMode={false}>
                    {`$Total \\ SA = ${resultTwo.heightUnitTotalSurfaceArea}${resultTwo.heightUnit}^{2}$`}
                  </Latex>
                </Typography>
              </div>
            )}
          </div>
        </ResultTabsContainer>
      }
    </>
  )
}

export default ConeSurfArea
