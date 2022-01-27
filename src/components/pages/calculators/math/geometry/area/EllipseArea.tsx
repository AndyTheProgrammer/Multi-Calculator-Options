import React from 'react'
import { Typography, Box } from '@mui/material'
import { Formik } from 'formik'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSpring, } from 'react-spring'

import { EllipseAreaI } from '../../../../../../types'
import { calculateMath } from '../../../../../../services/AppCalculatorsApi'
import { ellipse } from '../../../../../../common/assets';
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  LATEX,
  AREA_CALCULATORS,
  GEOMETRY_PLACEHOLDERS,
  COLORS,
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

const EllipseArea = () => {
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
  const [ellipseInitialValues] = React.useState({
    semi_major_axes_a: "",
    semi_major_axes_a_unit: "mm",
    semi_major_axes_b: "",
    semi_major_axes_b_unit: "mm",
  })
  const [ellipseResult, setEllipseResult] = React.useState({
    semi_major_axes_a: 0,
    semi_major_axes_b: 0,
    area: 0,
    unit: ''
  })
  const [ellipseResultTwo, setEllipseResultTwo] = React.useState({
    areaInsemi_major_axes_aUnit: 0,
    areaInsemi_major_axes_bUnit: 0,
    semi_major_axes_aInsemi_major_axes_bUnit: 0,
    $semi_major_axes_bInsemi_major_axes_aUnit: 0,
    submittedsemi_major_axes_a: 0,
    submitted_semi_major_axes_b: 0,
    semi_major_axes_a_unit: '',
    semi_major_axes_b_unit: '',
  })

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const [selectedResult, setSelectedResult] = React.useState<boolean>(false)

  return (
    <>
      <PlaceHolder
        placeHolder={GEOMETRY_PLACEHOLDERS.ellipseArea}
      />
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.ellipseArea}
        dropDown={true}
        opened={open}
        animation={formAnimation}
        onHandleOpen={handleClickOpen}
        calculatorList={AREA_CALCULATORS}
      >
        <Image path={ellipse} />
        <Formik
          initialValues={ellipseInitialValues}
          onSubmit={async ({
            semi_major_axes_a,
            semi_major_axes_a_unit,
            semi_major_axes_b,
            semi_major_axes_b_unit,
          }, { setSubmitting, resetForm }) => {
            const payload: EllipseAreaI = {
              semi_major_axes_a,
              semi_major_axes_a_unit,
              semi_major_axes_b,
              semi_major_axes_b_unit,
              method: 'ellipseArea'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: ellipseArea } = await calculateMath(payload)
              console.log('=====>', ellipseArea)
              const {
                area,
                units,
                semi_major_axes_a,
                semi_major_axes_b,
                unitType,
                areaInsemi_major_axes_aUnit,
                areaInsemi_major_axes_bUnit,
                semi_major_axes_aInsemi_major_axes_bUnit,
                $semi_major_axes_bInsemi_major_axes_aUnit,
                submittedsemi_major_axes_a,
                submitted_semi_major_axes_b,

              } = ellipseArea
              if (typeof ellipseArea === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setEllipseResult({
                  area: area,
                  semi_major_axes_a: submittedsemi_major_axes_a,
                  semi_major_axes_b: submitted_semi_major_axes_b,
                  unit: units
                })
              }
              if (typeof ellipseArea === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setEllipseResultTwo({
                  areaInsemi_major_axes_aUnit: areaInsemi_major_axes_aUnit,
                  areaInsemi_major_axes_bUnit: areaInsemi_major_axes_bUnit,
                  semi_major_axes_aInsemi_major_axes_bUnit: semi_major_axes_aInsemi_major_axes_bUnit,
                  $semi_major_axes_bInsemi_major_axes_aUnit: $semi_major_axes_bInsemi_major_axes_aUnit,
                  submitted_semi_major_axes_b: submitted_semi_major_axes_b,
                  submittedsemi_major_axes_a: submittedsemi_major_axes_a,
                  semi_major_axes_a_unit,
                  semi_major_axes_b_unit,
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
                  <Label title={LABELS.semiMajorAxes} />
                  <CustomTextInput
                    type={INPUT_TYPE.text}
                    id="semi_major_axes_a"
                    placeholder={PLACEHOLDERS.number}
                    value={values.semi_major_axes_a}
                    onChange={handleChange}
                  />

                  <CustomSelect
                    id="semi_major_axes_a_unit"
                    measurement="length"
                    value={values.semi_major_axes_a_unit}
                    onChange={handleChange('semi_major_axes_a_unit')}
                  />
                </FormRow>

                <FormRow>
                  <Label title={LABELS.semiMinorAxes} />
                  <CustomTextInput
                    type={INPUT_TYPE.text}
                    id="semi_major_axes_b"
                    placeholder={PLACEHOLDERS.number}
                    value={values.semi_major_axes_b}
                    onChange={handleChange}
                  />

                  <CustomSelect
                    id="semi_major_axes_b_unit"
                    measurement="length"
                    value={values.semi_major_axes_b_unit}
                    onChange={handleChange('semi_major_axes_b_unit')}
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
          latex={LATEX.ellipseArea}
          animation={resultAnimation}
        >

          {selectedResult === true &&
            <Box>
              <Typography variant="subtitle2">
                <Latex displayMode={false}>
                  {`$Taking \\ \\pi \\ as \\ 3.14159265$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = \\pi * ${ellipseResult.semi_major_axes_a} * ${ellipseResult.semi_major_axes_b}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = \\pi * ${ellipseResult.semi_major_axes_a * ellipseResult.semi_major_axes_b}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = ${ellipseResult.area} ${ellipseResult.unit}^{2}$`}
                </Latex>
              </Typography>
            </Box>
          }

          {selectedResult === false &&
            <Box>
              <Typography variant="subtitle2">
                <Latex displayMode={false}>
                  {`$Taking \\ \\pi \\ as \\ 3.14159265$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ ${ellipseResultTwo.submitted_semi_major_axes_b} ${ellipseResultTwo.semi_major_axes_b_unit} = ${ellipseResultTwo.$semi_major_axes_bInsemi_major_axes_aUnit} ${ellipseResultTwo.semi_major_axes_a_unit} $`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = \\pi * ${ellipseResultTwo.submittedsemi_major_axes_a} * ${ellipseResultTwo.$semi_major_axes_bInsemi_major_axes_aUnit}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = \\pi * ${ellipseResultTwo.submittedsemi_major_axes_a * ellipseResultTwo.$semi_major_axes_bInsemi_major_axes_aUnit}$`}
                </Latex>
              </Typography>

              <Typography
                variant="subtitle1"
                className='final-answer'
              >
                <Latex displayMode={false}>
                  {`$A = ${ellipseResultTwo.areaInsemi_major_axes_aUnit}${ellipseResult.unit}^{2}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ or $`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$ ${ellipseResultTwo.submittedsemi_major_axes_a} ${ellipseResultTwo.semi_major_axes_a_unit} = ${ellipseResultTwo.semi_major_axes_aInsemi_major_axes_bUnit} ${ellipseResultTwo.semi_major_axes_b_unit} $`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = \\pi * ${ellipseResultTwo.semi_major_axes_aInsemi_major_axes_bUnit} * ${ellipseResultTwo.submitted_semi_major_axes_b}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = \\pi * ${ellipseResultTwo.semi_major_axes_aInsemi_major_axes_bUnit * ellipseResultTwo.submitted_semi_major_axes_b}$`}
                </Latex>
              </Typography>

              <Typography
                variant="subtitle1"
                className='final-answer'
              >
                <Latex displayMode={false}>
                  {`$A = ${ellipseResultTwo.areaInsemi_major_axes_bUnit}${ellipseResult.unit}^{2}$`}
                </Latex>
              </Typography>
            </Box>
          }
        </ResultTabsContainer>
      }
    </>
  )
}

export default EllipseArea
