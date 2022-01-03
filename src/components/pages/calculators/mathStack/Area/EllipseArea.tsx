import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSpring, animated } from 'react-spring'

import { EllipseAreaI } from '../../../../../types'
import { calculateMath } from '../../../../../services/AppCalculatorsApi'
import useStyles from '../../../../../styling/CustomStyles'
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
  ResultTabsContainer,
  FormTabsContainer
} from '../../../../custom'

const EllipseArea = (props: any) => {
  const { openDrop } = props
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
    semi_major_axes_a_unit: "",
    semi_major_axes_b: "",
    semi_major_axes_b_unit: "",
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
  const {
    formDisplay
  }: any = useStyles()
  const [selectedResult, setSelectedResult] = React.useState<boolean>(false)

  React.useEffect(() => {


    return () => { }
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.ellipseArea}
        dropDown={true}
        openDrop={openDrop}
        animation={formAnimation}
      >
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
                  semi_major_axes_a: semi_major_axes_a,
                  semi_major_axes_b: semi_major_axes_b,
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
              }
            } catch (err) {
              console.log('====>', err)
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, resetForm }) => (
            <form onSubmit={handleSubmit} className="form-container">
              <div className="form-row">
                <Label title={LABELS.semiMajorAxesA} />
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
              </div>

              <div className="form-row">
                <Label title={LABELS.semiMajorAxesB} />
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
              </div>

              <div
                className="form-row"
                style={{ alignItems: 'center', justifyContent: 'space-between' }}
              >

                <CustomResetBtn
                  onHandleClick={() => resetForm()}
                />
                <CustomBtn />
              </div>
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
