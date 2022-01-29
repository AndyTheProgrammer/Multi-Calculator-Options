import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { SphericalCapSurfaceAreaI } from '../../../../../../types'
import { calculateMath } from '../../../../../../services/AppCalculatorsApi'
import { spherical_cap } from '../../../../../../common/assets';
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

const SphericalCapSurfaceArea = () => {
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
    height_unit: 'mm'
  })
  const [Result, setResult] = React.useState({
    surfaceArea: 0,
    baseSurfaceArea: 0,
    totalSolidSphereSurfaceArea: 0,
    unit: '',
    submittedradius: '',
    submitted_height: '',
  })

  const [resultTwo, setResultTwo] = React.useState({
    surfaceAreaInradiusUnit: 0,
    surfaceAreaInheightUnit: 0,
    radiusInheightUnit: '',
    heightInradiusUnit: '',
    submittedradius: '',
    submitted_height: '',
    radius_unit: '',
    height_unit: ''
  })

  // Ball radius
  const ballRadius = (parseFloat(Result.submitted_height) * parseFloat(Result.submitted_height)
    +
    parseFloat(Result.submittedradius) * parseFloat(Result.submittedradius))
    /
    (2 * parseFloat(Result.submitted_height));

  // In radius unit
  const ballRadiusInRadiusUnit = (parseFloat(resultTwo.heightInradiusUnit) * parseFloat(resultTwo.heightInradiusUnit)
    +
    parseFloat(resultTwo.submittedradius) * parseFloat(resultTwo.submittedradius))
    /
    (2 * parseFloat(resultTwo.heightInradiusUnit));

  // in height unit
  const ballRadiusInHeightUnit = (parseFloat(resultTwo.submitted_height) * parseFloat(resultTwo.submitted_height)
    +
    parseFloat(resultTwo.radiusInheightUnit) * parseFloat(resultTwo.radiusInheightUnit))
    /
    (2 * parseFloat(resultTwo.submitted_height));

  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Do not forget to add placeHolder components on all other calculators */}
      <PlaceHolder
        placeHolder={GEOMETRY_PLACEHOLDERS.sphericalCapSurfArea}
      />
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.sphericalCapSurfArea}
        dropDown={true}
        opened={open}
        animation={formAnimation}
        onHandleOpen={handleClickOpen}
        calculatorList={SURFACEAREA_CALCULATORS}
      >
        <Image path={spherical_cap} />
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            radius,
            radius_unit,
            height,
            height_unit,
          }, { setSubmitting, resetForm }) => {
            const payload: SphericalCapSurfaceAreaI = {
              radius,
              radius_unit,
              height,
              height_unit,
              method: 'CapSurfaceArea'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: CapSurfaceArea } = await calculateMath(payload)
              console.log('=====>', CapSurfaceArea)
              const {
                surfaceArea,
                units,
                surfaceAreaInradiusUnit,
                surfaceAreaInheightUnit,
                radiusInheightUnit,
                $heightInradiusUnit,
                submittedradius,
                submitted_height,
                unitType
              } = CapSurfaceArea
              if (typeof CapSurfaceArea === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setResult({
                  surfaceArea: surfaceArea,
                  baseSurfaceArea: surfaceArea,
                  totalSolidSphereSurfaceArea: surfaceArea,
                  unit: units,
                  submittedradius,
                  submitted_height,
                })
              }

              if (typeof CapSurfaceArea === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setResultTwo({
                  surfaceAreaInradiusUnit: surfaceAreaInradiusUnit,
                  surfaceAreaInheightUnit: surfaceAreaInheightUnit,
                  radiusInheightUnit,
                  heightInradiusUnit: $heightInradiusUnit,
                  submittedradius,
                  submitted_height,
                  radius_unit,
                  height_unit,
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
          animation={resultAnimation}
        >
          <Typography variant="subtitle1">
            <Latex displayMode={true}>
              {LATEX.sphericalCapSurfArea_totalSolidSphere}
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
              {/* Solve for R */}
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ Ball \\ radius \\ (R) = \\frac{h^{2} + r^{2}} {2h}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ = \\frac{${Result.submitted_height}^{2} + ${Result.submittedradius}^{2}} {2* ${Result.submitted_height}}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ = \\frac{${parseFloat(Result.submitted_height) * parseFloat(Result.submitted_height)} + ${parseFloat(Result.submittedradius) * parseFloat(Result.submittedradius)}} {${2 * parseFloat(Result.submitted_height)}}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ = \\frac{${parseFloat(Result.submitted_height) * parseFloat(Result.submitted_height) + parseFloat(Result.submittedradius) * parseFloat(Result.submittedradius)}} {${2 * parseFloat(Result.submitted_height)}}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                <Latex displayMode={false}>
                  {`$ = 
                  ${(parseFloat(Result.submitted_height) * parseFloat(Result.submitted_height)
                      +
                      parseFloat(Result.submittedradius) * parseFloat(Result.submittedradius))
                    /
                    (2 * parseFloat(Result.submitted_height))}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={true}>
                  {`$then$`}
                </Latex>
              </Typography>

              {/* Total solid sphere */}
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$= 2\\pi ${ballRadius}*${Result.submitted_height} + \\pi ${Result.submittedradius}^{2}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1" >
                <Latex displayMode={false}>
                  {`$= 2\\pi ${ballRadius * parseFloat(Result.submitted_height)} + \\pi ${parseFloat(Result.submittedradius) * parseFloat(Result.submittedradius)}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$= \\pi ${2 * ballRadius * parseFloat(Result.submitted_height)} + \\pi ${parseFloat(Result.submittedradius) * parseFloat(Result.submittedradius)}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$= ${3.14159265 * 2 * ballRadius * parseFloat(Result.submitted_height)} + ${3.14159265 * parseFloat(Result.submittedradius) * parseFloat(Result.submittedradius)}$`}
                </Latex>
              </Typography>

              {/* Answer */}
              {/* <Typography variant="subtitle1" className='final-answer'>
                <Latex displayMode={false}>
                  {`$Total \\ solid \\ sphere \\ SA = 
                  ${Result.totalSolidSphereSurfaceArea}${Result.unit}^{2}$`}
                </Latex>
              </Typography> */}

              <Typography variant="subtitle1" className='final-answer'>
                <Latex displayMode={false}>
                  {`$Total \\ solid \\ sphere \\ SA = 
                  ${(3.14159265 * 2 * ballRadius * parseFloat(Result.submitted_height)) + (3.14159265 * parseFloat(Result.submittedradius) * parseFloat(Result.submittedradius))}$`}
                </Latex>
              </Typography>
            </div>

          ) : (

            <div >
              {/* Radius */}
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ ${resultTwo.submitted_height}${resultTwo.height_unit} = ${resultTwo.heightInradiusUnit}${resultTwo.radius_unit}$`}
                </Latex>
              </Typography>

              {/* Solve for R */}
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ Ball \\ radius \\ (R) = \\frac{h^{2} + r^{2}} {2h}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ = \\frac{${resultTwo.heightInradiusUnit}^{2} + ${resultTwo.submittedradius}^{2}} {2* ${resultTwo.heightInradiusUnit}}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ = \\frac{${parseFloat(resultTwo.heightInradiusUnit) * parseFloat(resultTwo.heightInradiusUnit)} + ${parseFloat(resultTwo.submittedradius) * parseFloat(resultTwo.submittedradius)}} {${2 * parseFloat(resultTwo.heightInradiusUnit)}}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ = \\frac{${parseFloat(resultTwo.heightInradiusUnit) * parseFloat(resultTwo.heightInradiusUnit) + parseFloat(resultTwo.submittedradius) * parseFloat(resultTwo.submittedradius)}} {${2 * parseFloat(resultTwo.heightInradiusUnit)}}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                <Latex displayMode={false}>
                  {`$ = 
                  ${(parseFloat(resultTwo.heightInradiusUnit) * parseFloat(resultTwo.heightInradiusUnit)
                      +
                      parseFloat(resultTwo.submittedradius) * parseFloat(resultTwo.submittedradius))
                    /
                    (2 * parseFloat(resultTwo.heightInradiusUnit))}${resultTwo.radius_unit}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={true}>
                  {`$then$`}
                </Latex>
              </Typography>

              {/* Total solid sphere */}
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$= 2\\pi ${ballRadiusInRadiusUnit}*${resultTwo.heightInradiusUnit} + \\pi ${resultTwo.submittedradius}^{2}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1" >
                <Latex displayMode={false}>
                  {`$= 2\\pi ${ballRadiusInRadiusUnit * parseFloat(resultTwo.heightInradiusUnit)} + \\pi ${parseFloat(resultTwo.submittedradius) * parseFloat(resultTwo.submittedradius)}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$= \\pi ${2 * ballRadiusInRadiusUnit * parseFloat(resultTwo.heightInradiusUnit)} + \\pi ${parseFloat(resultTwo.submittedradius) * parseFloat(resultTwo.submittedradius)}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$= ${3.14159265 * 2 * ballRadiusInRadiusUnit * parseFloat(resultTwo.heightInradiusUnit)} + ${3.14159265 * parseFloat(resultTwo.submittedradius) * parseFloat(resultTwo.submittedradius)}$`}
                </Latex>
              </Typography>

              {/* Answer */}
              <Typography variant="subtitle1" className='final-answer'>
                <Latex displayMode={false}>
                  {`$Total \\ SA = 
                  ${(3.14159265 * 2 * ballRadiusInRadiusUnit * parseFloat(resultTwo.heightInradiusUnit)) + (3.14159265 * parseFloat(resultTwo.submittedradius) * parseFloat(resultTwo.submittedradius))}${resultTwo.radius_unit}^{2}$`}
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
                  {`$ ${resultTwo.submittedradius}${resultTwo.radius_unit} = ${resultTwo.radiusInheightUnit}${resultTwo.height_unit}$`}
                </Latex>
              </Typography>

              {/* Solve for R */}
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ Ball \\ radius \\ (R) = \\frac{h^{2} + r^{2}} {2h}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ = \\frac{${resultTwo.submitted_height}^{2} + ${resultTwo.radiusInheightUnit}^{2}} {2* ${resultTwo.submitted_height}}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ = \\frac{${parseFloat(resultTwo.submitted_height) * parseFloat(resultTwo.submitted_height)} + ${parseFloat(resultTwo.radiusInheightUnit) * parseFloat(resultTwo.radiusInheightUnit)}} {${2 * parseFloat(resultTwo.submitted_height)}}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ = \\frac{${parseFloat(resultTwo.submitted_height) * parseFloat(resultTwo.submitted_height) + parseFloat(resultTwo.radiusInheightUnit) * parseFloat(resultTwo.radiusInheightUnit)}} {${2 * parseFloat(resultTwo.submitted_height)}}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                <Latex displayMode={false}>
                  {`$ = 
                  ${(parseFloat(resultTwo.submitted_height) * parseFloat(resultTwo.submitted_height)
                      +
                      parseFloat(resultTwo.radiusInheightUnit) * parseFloat(resultTwo.radiusInheightUnit))
                    /
                    (2 * parseFloat(resultTwo.submitted_height))}${resultTwo.height_unit}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={true}>
                  {`$then$`}
                </Latex>
              </Typography>

              {/* Total solid sphere */}
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$= 2\\pi ${ballRadiusInHeightUnit}*${resultTwo.submitted_height} + \\pi ${resultTwo.radiusInheightUnit}^{2}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1" >
                <Latex displayMode={false}>
                  {`$= 2\\pi ${ballRadiusInHeightUnit * parseFloat(resultTwo.submitted_height)} + \\pi ${parseFloat(resultTwo.radiusInheightUnit) * parseFloat(resultTwo.radiusInheightUnit)}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$= \\pi ${2 * ballRadiusInHeightUnit * parseFloat(resultTwo.submitted_height)} + \\pi ${parseFloat(resultTwo.radiusInheightUnit) * parseFloat(resultTwo.radiusInheightUnit)}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$= ${3.14159265 * 2 * ballRadiusInHeightUnit * parseFloat(resultTwo.submitted_height)} + ${3.14159265 * parseFloat(resultTwo.radiusInheightUnit) * parseFloat(resultTwo.radiusInheightUnit)}$`}
                </Latex>
              </Typography>

              {/* Answer */}
              <Typography variant="subtitle1" className='final-answer'>
                <Latex displayMode={false}>
                  {`$Total \\ SA = 
                  ${(3.14159265 * 2 * ballRadiusInHeightUnit * parseFloat(resultTwo.submitted_height)) + (3.14159265 * parseFloat(resultTwo.radiusInheightUnit) * parseFloat(resultTwo.radiusInheightUnit))}${resultTwo.height_unit}^{2}$`}
                </Latex>
              </Typography>
            </div>
          )}
        </ResultTabsContainer>
      }
    </>
  )
}

export default SphericalCapSurfaceArea
