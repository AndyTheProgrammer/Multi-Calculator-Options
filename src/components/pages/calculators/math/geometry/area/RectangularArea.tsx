import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSpring } from 'react-spring'

import { RectangleAreaI } from '../../../../../../types'
import { calculateMath } from '../../../../../../services/AppCalculatorsApi'
import { rectangle } from '../../../../../../common/assets';
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

const RectangularArea = () => {
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
  const [rectInitialValues] = React.useState({
    length: '',
    length_unit: 'mm',
    width: '',
    width_unit: 'mm',
  })
  const [rectResult, setRectResult] = React.useState({
    area: 0,
    submittedLength: 0,
    submitted_width: 0,
    unit: ''
  })

  const [rectResultTwo, setRectResultTwo] = React.useState({
    areaInLengthUnit: 0,
    areaInWidthUnit: 0,
    lengthInWidthUnit: 0,
    $widthInlengthUnit: 0,
    submittedLength: '',
    submitted_width: '',
    length_unit: '',
    width_unit: '',
  })

  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <PlaceHolder
        placeHolder={GEOMETRY_PLACEHOLDERS.rectangleArea}
      />

      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.rectangleArea}
        dropDown={true}
        opened={open}
        animation={formAnimation}
        onHandleOpen={handleClickOpen}
        calculatorList={AREA_CALCULATORS}
      >
        <Image path={rectangle} />
        <Formik
          initialValues={rectInitialValues}
          onSubmit={async ({
            length,
            length_unit,
            width,
            width_unit,
          }, { setSubmitting, resetForm }) => {
            const payload: RectangleAreaI = {
              length,
              length_unit,
              width,
              width_unit,
              method: 'rectangleArea'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: rectangleArea } = await calculateMath(payload)
              console.log('=====>', rectangleArea)
              const {
                area,
                units,
                submittedLength,
                submitted_width,
                unitType,
                areaInLengthUnit,
                areaInWidthUnit,
                lengthInWidthUnit,
                $widthInlengthUnit,
              } = rectangleArea
              if (typeof rectangleArea === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setRectResult({
                  area: area,
                  submittedLength: submittedLength,
                  submitted_width: submitted_width,
                  unit: units
                })
              }

              if (typeof rectangleArea === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setRectResultTwo({
                  areaInLengthUnit: areaInLengthUnit,
                  areaInWidthUnit: areaInWidthUnit,
                  lengthInWidthUnit: lengthInWidthUnit,
                  $widthInlengthUnit: $widthInlengthUnit,
                  submittedLength: submittedLength,
                  submitted_width: submitted_width,
                  length_unit,
                  width_unit,
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
                  <Label title={LABELS.length} />
                  <CustomTextInput
                    type={INPUT_TYPE.text}
                    id="length"
                    placeholder={PLACEHOLDERS.number}
                    value={values.length}
                    onChange={handleChange}
                  />

                  <CustomSelect
                    id="length_unit"
                    measurement="length"
                    value={values.length_unit}
                    onChange={handleChange('length_unit')}
                  />
                </FormRow>


                <FormRow>
                  <Label title={LABELS.width} />
                  <CustomTextInput
                    type={INPUT_TYPE.text}
                    id="width"
                    placeholder={PLACEHOLDERS.number}
                    value={values.width}
                    onChange={handleChange}
                  />

                  <CustomSelect
                    id="width_unit"
                    measurement="length"
                    value={values.width_unit}
                    onChange={handleChange('width_unit')}
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
          latex={LATEX.rectangleArea}
          animation={resultAnimation}
        >
          {selectedResult === true &&
            <div className="text-wrap">
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = ${rectResult.submittedLength} * ${rectResult.submitted_width}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1" className='final-answer'>
                <Latex displayMode={false}>
                  {`$A = ${rectResult.area} ${rectResult.unit}^{2}$`}
                </Latex>
              </Typography>
            </div>
          }
          {selectedResult === false &&
            <div className="text-wrap">
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$${rectResultTwo.submitted_width}${rectResultTwo.width_unit} = ${rectResultTwo.$widthInlengthUnit}${rectResultTwo.length_unit}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = ${rectResultTwo.submittedLength} * ${rectResultTwo.$widthInlengthUnit}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1" className='final-answer'>
                <Latex displayMode={false}>
                  {`$A = ${rectResultTwo.areaInLengthUnit} ${rectResultTwo.length_unit}^{2}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ or $`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$${rectResultTwo.submittedLength}${rectResultTwo.length_unit} = ${rectResultTwo.lengthInWidthUnit}${rectResultTwo.width_unit}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = ${rectResultTwo.lengthInWidthUnit} * ${rectResultTwo.submitted_width}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1" className='final-answer'>
                <Latex displayMode={false}>
                  {`$A = ${rectResultTwo.areaInWidthUnit} ${rectResultTwo.width_unit}^{2}$`}
                </Latex>
              </Typography>
            </div>
          }
        </ResultTabsContainer>
      }
    </>
  )
}

export default RectangularArea
