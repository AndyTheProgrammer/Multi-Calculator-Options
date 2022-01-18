import React from 'react'
import { Typography } from '@material-ui/core'
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
                semi_major_axes_b, unitType,
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
                  submittedsemi_major_axes_a: submittedsemi_major_axes_a
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
            <div className="text-wrap text-center">
              <Typography variant="subtitle1">
                =π * {ellipseResult.semi_major_axes_a} * {ellipseResult.semi_major_axes_b}
              </Typography>

              <Typography variant="subtitle1">
                = {ellipseResult.area}{ellipseResult.unit}<sup>2</sup>
              </Typography>
            </div>
          }
          {selectedResult === false &&
            <div className="text-wrap text-center">
              <Typography variant="subtitle1">
                = {ellipseResultTwo.areaInsemi_major_axes_aUnit}<sup>2</sup>
              </Typography>
              <Typography variant="subtitle1">
                = {ellipseResultTwo.areaInsemi_major_axes_bUnit}<sup>2</sup>
              </Typography>
            </div>
          }
        </ResultTabsContainer>
      }
    </>
  )
}

export default EllipseArea
