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

          <div className='text-center'>
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
        </ResultTabsContainer>
      }
    </>
  )
}

export default CylindricalTankSurfArea
