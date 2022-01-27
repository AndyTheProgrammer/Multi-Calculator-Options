import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { CapsuleSurfaceAreaI } from '../../../../../../types'
import { calculateMath } from '../../../../../../services/AppCalculatorsApi'
import { capsule } from '../../../../../../common/assets';
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

const CapsuleSurfaceArea = () => {
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
  const [answer, setAnswer] = React.useState<boolean>(false);
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true);
  const [initialFormValues] = React.useState({
    radius: '',
    radius_unit: 'mm',
    height: "",
    height_unit: 'mm'
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
    heightInradiusUnit: 0,
    submittedradius: '',
    submitted_height: '',
    radius_unit: '',
    height_unit: ''
  })

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Do not forget to add placeHolder components on all other calculators */}
      <PlaceHolder
        placeHolder={GEOMETRY_PLACEHOLDERS.capsuleSurfArea}
      />
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.capsuleSurfArea}
        dropDown={true}
        opened={open}
        animation={formAnimation}
        onHandleOpen={handleClickOpen}
        calculatorList={SURFACEAREA_CALCULATORS}
      >
        <Image path={capsule} />
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
              const { success, payload: CapsuleSurfaceArea } = await calculateMath(payload)
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
                  heightInradiusUnit: $heightInradiusUnit,
                  submitted_height: submitted_height,
                  submittedradius: submittedradius,
                  radius_unit,
                  height_unit,
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
                  <Label title={LABELS.baseRadius} />
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
          // latex={LATEX.capsuleSurfArea}
          animation={resultAnimation}
        >
          <Typography variant="subtitle1">
            <Latex displayMode={false}>
              {`$ Top \\ SA = 2  \\pi  r^{2}$`}
            </Latex>
          </Typography>

          <Typography variant="subtitle1">
            <Latex displayMode={false}>
              {`$ Bottom \\ SA = 2  \\pi r^{2}$`}
            </Latex>
          </Typography>

          <Typography variant="subtitle1">
            <Latex displayMode={false}>
              {`$Lateral \\ SA = 2\\pi  r  h$`}
            </Latex>
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            <Latex displayMode={false}>
              {LATEX.capsuleSurfArea}
            </Latex>
          </Typography>

          <Typography variant="subtitle2">
            <Latex displayMode={false}>
              {`$Taking \\ \\pi \\ as \\ 3.14159265$`}
            </Latex>
          </Typography>

          <Typography gutterBottom />

          {selectedResult ? (
            <div>
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ Total \\ SA = 4 \\pi ${Result.submittedradius}^{2} + 2\\pi*${Result.submittedradius}*${Result.submitted_height}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle2">
                <Latex displayMode={false}>
                  {`$ Total \\ SA = ${4 * 3.14159265 * (Result.submittedradius * Result.submittedradius)} + ${2 * 3.14159265 * Result.submittedradius * Result.submitted_height}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1" className='final-answer'>
                <Latex displayMode={false}>
                  {`$ Total \\ SA = ${Result.surfaceArea}${Result.units}^{2}$`}
                </Latex>
              </Typography>
            </div>

          ) : (

            <div>
              {/* Base radius */}
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$${resultTwo.submitted_height}${resultTwo.height_unit} = ${resultTwo.heightInradiusUnit}${resultTwo.radius_unit}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ Total \\ SA = 4 \\pi ${resultTwo.submittedradius}^{2} + 2\\pi*${resultTwo.submittedradius}*${resultTwo.heightInradiusUnit}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle2">
                <Latex displayMode={false}>
                  {`$ Total \\ SA = ${4 * 3.14159265 * (parseFloat(resultTwo.submittedradius) * parseFloat(resultTwo.submittedradius))} + ${2 * 3.14159265 * parseFloat(resultTwo.submittedradius) * resultTwo.heightInradiusUnit}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1" className='final-answer'>
                <Latex displayMode={false}>
                  {`$ Total \\ SA = ${resultTwo.surfaceAreaInradiusUnit}${resultTwo.radius_unit}^{2}$`}
                </Latex>
              </Typography>


              <Typography variant="subtitle1">
                <Latex displayMode={true}>
                  {`$ or $`}
                </Latex>
              </Typography>


              {/* Height */}
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$${resultTwo.submittedradius}${resultTwo.radius_unit} = ${resultTwo.radiusInheightUnit}${resultTwo.height_unit}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ Total \\ SA = 4 \\pi ${resultTwo.radiusInheightUnit}^{2} + 2\\pi*${resultTwo.radiusInheightUnit}*${resultTwo.submitted_height}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle2">
                <Latex displayMode={false}>
                  {`$ Total \\ SA = ${4 * 3.14159265 * (resultTwo.radiusInheightUnit * resultTwo.radiusInheightUnit)} + ${2 * 3.14159265 * resultTwo.radiusInheightUnit * parseFloat(resultTwo.submitted_height)}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1" className='final-answer'>
                <Latex displayMode={false}>
                  {`$ Total \\ SA = ${resultTwo.surfaceAreaInheightUnit}${resultTwo.height_unit}^{2}$`}
                </Latex>
              </Typography>
            </div>
          )}
        </ResultTabsContainer>
      }

    </>
  )
}

export default CapsuleSurfaceArea
