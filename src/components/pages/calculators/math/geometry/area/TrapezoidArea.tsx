import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSpring, animated } from 'react-spring'

import { TrapezoidAreaI } from '../../../../../../types'
import { calculateMath } from '../../../../../../services/AppCalculatorsApi'
import useStyles from '../../../../../../styling/CustomStyles'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  COLORS,
  LATEX
} from '../../../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  Label,
  FormRow,
  ResultTabsContainer,
  FormTabsContainer
} from '../../../../../custom'

const TrapezoidArea = (props: any) => {
  const { openDrop, opened, onHandleClose, calcs } = props
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
  const [trapezoidInitialValues] = React.useState({
    base1: "",
    base1_unit: "",
    base2: "",
    base2_unit: "",
    height: "",
    height_unit: "",
  })
  const [trapezoidResult, setTrapezoidResult] = React.useState({
    area: 0,
    base1: 0,
    base2: 0,
    height: 0,
    unit: ''
  })
  const [trapezoidResultTwo, setTrapezoidResultTwo] = React.useState({
    areaInm: 0,
    base1tom: 0,
    base2tom: 0,
    heighttom: 0,
    areaIncm: 0,
    base1tocm: 0,
    base2tocm: 0,
    heighttocm: 0,
  })
  const {
    formDisplay
  }: any = useStyles()
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.trapezoidArea}
        dropDown={true}
        opened={opened}
        openDrop={openDrop}
        calcs={calcs}
        onHandleClose={onHandleClose}
        animation={formAnimation}
      >
        <Formik
          initialValues={trapezoidInitialValues}
          onSubmit={async ({
            base1,
            base1_unit,
            base2,
            base2_unit,
            height,
            height_unit,
          }, { setSubmitting, resetForm }) => {
            const payload: TrapezoidAreaI = {
              base1,
              base1_unit,
              base2,
              base2_unit,
              height,
              height_unit,
              method: 'TrapezoidArea'
            }
            console.log(JSON.stringify(payload))
            //Trapezoid needs aligning with martin
            try {
              const { success, payload: TrapezoidArea } = await calculateMath(payload)
              console.log('=====>', TrapezoidArea)
              const {
                area,
                units,
                unitType,
                submittedbase1,
                submitted_base2,
                submitted_height,
                areaInm,
                base1tom,
                base2tom,
                heighttom,
                areaIncm,
                base1tocm,
                base2tocm,
                heighttocm
              } = TrapezoidArea
              if (typeof TrapezoidArea === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setTrapezoidResult({
                  area: area,
                  base1: submittedbase1,
                  base2: submitted_base2,
                  height: submitted_height,
                  unit: units
                })
              }
              if (typeof TrapezoidArea === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setTrapezoidResultTwo({
                  areaIncm: areaIncm,
                  base1tocm: base1tocm,
                  base2tocm: base2tocm,
                  heighttocm: heighttocm,
                  areaInm: areaInm,
                  base1tom: base1tom,
                  base2tom: base2tom,
                  heighttom: heighttom

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
              <FormRow>
                <Label title={LABELS.base1} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="base1"
                  placeholder={PLACEHOLDERS.number}
                  value={values.base1}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="base1_unit"
                  measurement="length"
                  value={values.base1_unit}
                  onChange={handleChange('base1_unit')}
                />
              </FormRow>

              <FormRow>
                <Label title={LABELS.base2} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="base2"
                  placeholder={PLACEHOLDERS.number}
                  value={values.base2}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="base2_unit"
                  measurement="length"
                  value={values.base2_unit}
                  onChange={handleChange('base2_unit')}
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

              <FormRow buttons reset={() => resetForm()} />
            </form>
          )}
        </Formik>
      </FormTabsContainer>



      {/* Results grid */}
      {answer === true &&
        <ResultTabsContainer
          tabTitle={"Result"}
          latex={LATEX.trapezoidArea}
          animation={resultAnimation}
        >
          {selectedResult === true &&
            <div className="text-wrap text-center">
              <Typography variant="subtitle1">
                = {trapezoidResult.area}{trapezoidResult.unit}<sup>2</sup>
              </Typography>
            </div>
          }
          {selectedResult === false &&
            <div className="text-wrap text-center">
              <Typography variant="subtitle1">
                = {trapezoidResultTwo.areaInm}{trapezoidResult.unit}<sup>2</sup>
              </Typography>
              <Typography variant="subtitle1">
                = {trapezoidResultTwo.areaIncm}{trapezoidResult.unit}<sup>2</sup>
              </Typography>
            </div>
          }
        </ResultTabsContainer>
      }
    </>
  )
}

export default TrapezoidArea
