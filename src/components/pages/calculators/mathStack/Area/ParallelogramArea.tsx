import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'
import Anime from 'react-animejs-wrapper'

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
  const [value, setValue] = React.useState(false)
  const animatedSquaresRef1 = React.useRef(null)
  const animatedSquaresRef2 = React.useRef(null)
  // @ts-ignore: Object is possibly 'null'.
  const play1 = () => animatedSquaresRef1.current.play();
  // @ts-ignore: Object is possibly 'null'.
  const play2 = () => animatedSquaresRef2.current.play();

  React.useEffect(() => {
    if (value) {
      play1();
      play2();
    }

    return () => { }
  })


  return (
    <>
      <Anime
        ref={animatedSquaresRef1}
        config={{
          translateX: -250,
          easing: 'easeInOutSine',
          autoplay: true,
          duration: 250
        }}
      >
        {/* Form grid */}
        <FormTabsContainer
          tabTitle1={CALCULATORS.parallelogramArea}
          dropDown={true}
          openDrop={openDrop}
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
                const { payload: parallelogramArea } = await calculateMath(payload)
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
      </Anime>

      <Anime
        style={{
          // position: 'absolute',
          zIndex: -5
        }}
        ref={animatedSquaresRef2}
        config={{
          translateX: 200,
          easing: 'easeInOutSine',
          autoplay: true,
          duration: 250
        }}
      >
        {/* Results grid */}
        <ResultTabsContainer
          tabTitle={"Result"}
          latex={LATEX.parallelogramArea}
        >
          <div className="text-wrap">
            {selectedResult === true &&
              <Typography variant="subtitle1">
                = {Result.area}{Result.unit}<sup>2</sup>
              </Typography>
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
        </ResultTabsContainer>
      </Anime>

    </>
  )
}

export default ParallelogramArea
