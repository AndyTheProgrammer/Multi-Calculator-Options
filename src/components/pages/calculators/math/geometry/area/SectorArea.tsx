import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { Formik } from 'formik'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSpring } from 'react-spring'

import { SectorAreaI } from '../../../../../../types'
import { calculateMath } from '../../../../../../services/AppCalculatorsApi'
import { sector } from '../../../../../../common/assets';
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  LATEX,
  AREA_CALCULATORS,
  GEOMETRY_PLACEHOLDERS
} from '../../../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  Label,
  FormRow,
  ResultTabsContainer,
  FormTabsContainer,
  PlaceHolder,
  Image,
  FieldContainer,
} from '../../../../../custom'

const Latex = require('react-latex');

const SectorArea = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [formAnimation, formApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(100px)' : 'translateX(0px)',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [resultAnimation, resultApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [sectorInitialValues] = React.useState({
    radius: "",
    radius_unit: "cm",
    angle: "",
    angle_unit: "rad",
  })
  const [sectorResult, setSectorResult] = React.useState({
    area: 0,
    radiusUnits: '',
    angleUnit: '',
    submittedradius: '',
    submitted_angle: '',
    unit: ''
  })
  const pi = 3.14159265;

  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <PlaceHolder
        placeHolder={GEOMETRY_PLACEHOLDERS.sectorArea}
      />
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.sectorArea}
        dropDown={true}
        opened={open}
        animation={formAnimation}
        onHandleOpen={handleClickOpen}
        calculatorList={AREA_CALCULATORS}
      >
        <Image path={sector} />
        <Formik
          initialValues={sectorInitialValues}
          onSubmit={async ({
            radius,
            radius_unit,
            angle,
            angle_unit,
          }, { setSubmitting, resetForm }) => {
            const payload: SectorAreaI = {
              radius,
              radius_unit,
              angle,
              angle_unit,
              method: 'sectorArea'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: sectorArea } = await calculateMath(payload)
              console.log('=====>', sectorArea)
              const {
                area,
                unitType,
                radiusUnits,
                angleUnit,
                submittedradius,
                submitted_angle,
                unit
              } = sectorArea
              if (typeof sectorArea === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setSectorResult({
                  area: area,
                  radiusUnits: radiusUnits,
                  angleUnit: angleUnit,
                  submitted_angle: submitted_angle,
                  submittedradius: submittedradius,
                  unit: unit,
                })
              }
              if (success === true) {
                setAnswer(success)
                formApi.start({
                  transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
                });
                resultApi.start({
                  transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
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
                  <Label title={LABELS.angle} />
                  <CustomTextInput
                    type={INPUT_TYPE.text}
                    id="angle"
                    placeholder={PLACEHOLDERS.number}
                    value={values.angle}
                    onChange={handleChange}
                  />

                  <CustomSelect
                    id="angle_unit"
                    measurement="angle"
                    value={values.angle_unit}
                    onChange={handleChange('angle_unit')}
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
          tabTitle={"Result"}
          // latex={LATEX.sectorArea}
          animation={resultAnimation}
        >
          {sectorResult.angleUnit === 'degrees' &&
            <Box>
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = \\frac{{\\theta}}{360} *  \\pi r^2 $`}
                </Latex>
              </Typography>

              <Typography variant="subtitle2">
                <Latex displayMode={false}>
                  {`$Taking \\ \\pi \\ as \\ 3.14159265$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = \\frac{${sectorResult.submitted_angle}}{360} * \\pi ${sectorResult.submittedradius}^{2}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = ${parseInt(sectorResult.submitted_angle) / 360} * \\pi ${parseInt(sectorResult.submittedradius) * parseInt(sectorResult.submittedradius)}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = ${parseInt(sectorResult.submitted_angle) / 360} * ${pi * parseInt(sectorResult.submittedradius) * parseInt(sectorResult.submittedradius)}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = ${sectorResult.area} ${sectorResult.radiusUnits}^{2}$`}
                </Latex>
              </Typography>
            </Box>
          }

          {sectorResult.angleUnit === 'radians' &&
            <Box>
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = \\frac{{\\theta}}{2\\pi} * \\pi r^2 $`}
                </Latex>
              </Typography>

              <Typography variant="subtitle2">
                <Latex displayMode={false}>
                  {`$Taking \\ \\pi \\ as \\ 3.14159265$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = \\frac{${sectorResult.submitted_angle}}{2\\pi} * \\pi ${sectorResult.submittedradius}^{2}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = \\frac{${sectorResult.submitted_angle}}{6.283185307} * \\pi ${parseInt(sectorResult.submittedradius) * parseInt(sectorResult.submittedradius)}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = \\frac{${sectorResult.submitted_angle}}{6.283185307} * ${pi * parseInt(sectorResult.submittedradius) * parseInt(sectorResult.submittedradius)}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = ${parseInt(sectorResult.submitted_angle) / 6.283185307} * ${pi * parseInt(sectorResult.submittedradius) * parseInt(sectorResult.submittedradius)}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = ${sectorResult.area} ${sectorResult.radiusUnits}^{2}$`}
                </Latex>
              </Typography>
            </Box>
          }



        </ResultTabsContainer>
      }

    </>
  )
}

export default SectorArea
