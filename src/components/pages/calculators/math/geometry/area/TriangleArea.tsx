import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSpring } from 'react-spring'

import { TriangleAreaI } from '../../../../../../types'
import { calculateMath } from '../../../../../../services/AppCalculatorsApi'
import { triangle } from '../../../../../../common/assets';
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

//Needs to be Refactored. Waiting on Martin's End!

const TriangleArea = () => {
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
    sideA_unit: "mm",
    sideB: "",
    sideB_unit: "mm",
    sideC: "",
    sideC_unit: "mm",
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


  const [open, setOpen] = React.useState(false);
  // Used for the dropDown event handler
  const handleClickOpen = () => {
    setOpen(!open);
  };

  let sResult = (triangleResult.sideA + triangleResult.sideB + triangleResult.sideC) / 2

  return (
    <>
      <PlaceHolder
        placeHolder={GEOMETRY_PLACEHOLDERS.triangleArea}
      />
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.triangleArea}
        dropDown={true}
        opened={open}
        animation={formAnimation}
        onHandleOpen={handleClickOpen}
        calculatorList={AREA_CALCULATORS}
      >
        <Image path={triangle} />
        <Formik
          initialValues={triangleInitialValues}
          onSubmit={async ({
            sideA,
            sideA_unit,
            sideB,
            sideB_unit,
            sideC,
            sideC_unit,
          }, { setSubmitting }) => {
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
          latex={LATEX.triangleArea}
          animation={resultAnimation}
        >

          {selectedResult === true &&
            <div className="text-wrap">
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$s = \\frac{${triangleResult.sideA} + ${triangleResult.sideB} + ${triangleResult.sideC}} {2}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = \\sqrt{${sResult}(${sResult}-${triangleResult.sideA})(${sResult}-${triangleResult.sideB})(${sResult}-${triangleResult.sideC})}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = ${triangleResult.area} ${triangleResult.unit}^{2}$`}
                </Latex>
              </Typography>
            </div>
          }
          {selectedResult === false &&
            <div className="text-wrap">
              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = ${triangleResult2.areaInLenghtUnit} ${triangleResult.unit}^{2}$`}
                </Latex>
              </Typography>

              <Typography variant="subtitle1">
                <Latex displayMode={false}>
                  {`$A = ${triangleResult2.areaInWidthUnit} ${triangleResult.unit}^{2}$`}
                </Latex>
              </Typography>
            </div>
          }
        </ResultTabsContainer>
      }
    </>
  )
}

export default TriangleArea
