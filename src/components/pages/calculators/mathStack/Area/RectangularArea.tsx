import React from 'react'
import { Formik } from 'formik'
import { Typography, Grid } from '@material-ui/core'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSpring, animated } from 'react-spring'

import { RectangleAreaI } from '../../../../../types'
import { calculateMath } from '../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  LATEX
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

const RectangularArea = (props: any) => {
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
  const [rectInitialValues] = React.useState({
    length: '',
    length_unit: '',
    width: '',
    width_unit: '',
  })
  const [rectResult, setRectResult] = React.useState({
    area: 0,
    submittedLength: 0,
    submitted_width: 0,
    units: ''
  })

  const [rectResultTwo, setRectResultTwo] = React.useState({
    areaInLengthUnit: 0,
    areaInWidthUnit: 0,
    lengthInWidthUnit: 0,
    $widthInlengthUnit: 0,
    submittedLength: '',
    submitted_width: ''
  })

  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  React.useEffect(() => {


    return () => { }
  })

  return (
    <>

      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.rectangleArea}
        dropDown={true}
        openDrop={openDrop}
        animation={formAnimation}
      >
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
                  units: units
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
                  submitted_width: submitted_width
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
              </div>


              <div className="form-row">
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
          latex={LATEX.rectangleArea}
          animation={resultAnimation}
        >
          {selectedResult === true &&
            <div className="text-wrap text-center">
              <Typography variant="subtitle1">
                = {rectResult.area}{rectResult.units}<sup>2</sup>
              </Typography>
            </div>
          }
          {selectedResult === false &&
            <div className="text-wrap text-center">
              <Typography variant="subtitle1">
                = {rectResultTwo.areaInLengthUnit}{rectResult.units}<sup>2</sup>
              </Typography>
              <Typography variant="subtitle1">
                = {rectResultTwo.areaInWidthUnit}{rectResult.units}<sup>2</sup>
              </Typography>
            </div>
          }
        </ResultTabsContainer>
      }
    </>
  )
}

export default RectangularArea
