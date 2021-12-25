import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSpring, animated } from 'react-spring'

import { ParallelogramAreaI } from '../../../../../types'
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

const ParallelogramArea = (props: any) => {
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
  const [initialFormValues] = React.useState({
    breadth: '',
    breadth_unit: '',
    height: '',
    height_unit: ''
  })
  const [Result, setResult] = React.useState({
    area: 0,
    breadth: 0,
    height: 0,
    unit: ''
  })

  const [resultTwo, setResultTwo] = React.useState({
    areaInbreadthUnit: 0,
    areaInheightUnit: 0,
    breadthInheightUnit: 0,
    $heightInbreadthUnit: 0,
    submittedbreadth: 0,
    submitted_height: 0
  })
  const {
    formDisplay
  }: any = useStyles()
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)

  React.useEffect(() => {

    return () => { }
  })


  return (
    <>

      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.parallelogramArea}
        dropDown={true}
        openDrop={openDrop}
        animation={formAnimation}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            breadth,
            breadth_unit,
            height,
            height_unit
          }, { setSubmitting, resetForm }) => {
            const payload: ParallelogramAreaI = {
              breadth,
              breadth_unit,
              height,
              height_unit,
              method: 'parallelogramArea'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: parallelogramArea } = await calculateMath(payload)
              console.log('=====>', parallelogramArea)
              const {
                area,
                unit,
                submittedbreadth,
                submitted_height,
                unitType,
                areaInbreadthUnit,
                areaInheightUnit,
                breadthInheightUnit,
                $heightInbreadthUnit,

              } = parallelogramArea
              if (typeof parallelogramArea === 'object' && unitType === true) {
                setSelectedResult(unitType)
                setResult({
                  area: area,
                  breadth: submittedbreadth,
                  height: submitted_height,
                  unit: unit
                })
              }

              if (typeof parallelogramArea === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setResultTwo({
                  areaInbreadthUnit: areaInbreadthUnit,
                  areaInheightUnit: areaInheightUnit,
                  breadthInheightUnit: breadthInheightUnit,
                  $heightInbreadthUnit: $heightInbreadthUnit,
                  submitted_height: submitted_height,
                  submittedbreadth: submittedbreadth
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
                <Label title={LABELS.breadth} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="breadth"
                  placeholder={PLACEHOLDERS.number}
                  value={values.breadth}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="breadth_unit"
                  measurement="length"
                  value={values.breadth_unit}
                  onChange={handleChange('breadth_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.height} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
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
              </div>

              <div
                className="form-row"
                style={{ alignItems: 'center', justifyContent: 'space-between' }}
              >
                <CustomBtn />
                <CustomResetBtn
                  onHandleClick={() => resetForm()}
                />
              </div>
            </form>
          )}
        </Formik>
      </FormTabsContainer>

      {/* Results grid */}
      <ResultTabsContainer
        tabTitle={"Result"}
        latex={LATEX.parallelogramArea}
        animation={resultAnimation}
      >
        {answer === true &&
          <div>
            {selectedResult === true &&
              <div className="text-wrap">
                <Typography variant="subtitle1">
                  = {Result.area}{Result.unit}<sup>2</sup>
                </Typography>
              </div>
            }
            {selectedResult === false &&
              <div>
                <Typography variant="subtitle1">
                  = {resultTwo.areaInbreadthUnit}{Result.unit}<sup>2</sup>
                </Typography>
                <Typography variant="subtitle1">
                  = {resultTwo.areaInheightUnit}{Result.unit}<sup>2</sup>
                </Typography>
              </div>
            }
          </div>
        }
      </ResultTabsContainer>

    </>
  )
}

export default ParallelogramArea
