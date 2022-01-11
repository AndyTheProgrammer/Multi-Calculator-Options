import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSpring, animated } from 'react-spring'

import { TriangleAreaI } from '../../../../../../types'
import { calculateMath } from '../../../../../../services/AppCalculatorsApi'
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

//Needs to be Refactored. Waiting on Martin's End!

const TriangleArea = (props: any) => {
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
  const [triangleInitialValues] = React.useState({
    sideA: "",
    sideA_unit: "",
    sideB: "",
    sideB_unit: "",
    sideC: "",
    sideC_unit: "",
  })
  const [triangleResult, setTriangleResult] = React.useState({
    area: 0,
    sideA: 0,
    sideB: 0,
    sideC: 0,
    unit: ''
  })
  const [triangleResult2, setTriangleResult2] = React.useState({
    areaInLenghtUnit: 0,
    areaInWidthUnit: 0,
    unit: ''
  })
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  React.useEffect(() => {


    return () => { }
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.triangleArea}
        dropDown={true}
        openDrop={openDrop}
        animation={formAnimation}
      >
        <Formik
          initialValues={triangleInitialValues}
          onSubmit={async ({
            sideA,
            sideA_unit,
            sideB,
            sideB_unit,
            sideC,
            sideC_unit,
          }, { setSubmitting, resetForm }) => {
            const payload: TriangleAreaI = {
              sideA,
              sideA_unit,
              sideB,
              sideB_unit,
              sideC,
              sideC_unit,
              method: 'TriangleArea'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: triangleArea } = await calculateMath(payload)
              console.log('=====>', triangleArea)
              const {
                unitType,
                area,
                units,
                sideA,
                sideB,
                sideC,
                areaInLengthUnit,
                areaInWidthUnit
              } = triangleArea
              if (typeof triangleArea === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setTriangleResult({
                  area: area,
                  sideA: sideA,
                  sideB: sideB,
                  sideC: sideC,
                  unit: units
                })
              }
              if (typeof triangleArea === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setTriangleResult2({
                  areaInLenghtUnit: areaInLengthUnit,
                  areaInWidthUnit: areaInWidthUnit,
                  unit: units
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
                <Label title={LABELS.sideA} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="sideA"
                  placeholder={PLACEHOLDERS.number}
                  value={values.sideA}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="sideA_unit"
                  measurement="length"
                  value={values.sideA_unit}
                  onChange={handleChange('sideA_unit')}
                />
              </FormRow>

              <FormRow>
                <Label title={LABELS.sideB} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="sideB"
                  placeholder={PLACEHOLDERS.number}
                  value={values.sideB}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="sideB_unit"
                  measurement="length"
                  value={values.sideB_unit}
                  onChange={handleChange('sideB_unit')}
                />
              </FormRow>

              <FormRow>
                <Label title={LABELS.sideC} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="sideC"
                  placeholder={PLACEHOLDERS.number}
                  value={values.sideC}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="sideC_unit"
                  measurement="length"
                  value={values.sideC_unit}
                  onChange={handleChange('sideC_unit')}
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
          latex={LATEX.triangleArea}
          animation={resultAnimation}
        >

          {selectedResult === true &&
            <div className="text-wrap text-center">
              <Typography variant="subtitle1">
                = {triangleResult.area}{triangleResult.unit}<sup>2</sup>
              </Typography>
            </div>
          }
          {selectedResult === false &&
            <div className="text-wrap text-center">
              <Typography variant="subtitle1">
                = {triangleResult2.areaInLenghtUnit}{triangleResult.unit}<sup>2</sup>
              </Typography>
              <Typography variant="subtitle1">
                = {triangleResult2.areaInWidthUnit}{triangleResult.unit}<sup>2</sup>
              </Typography>
            </div>
          }
        </ResultTabsContainer>
      }
    </>
  )
}

export default TriangleArea
