import React from 'react'
import { Formik } from 'formik'
import { Typography, Grid } from '@material-ui/core'
import Anime from 'react-animejs-wrapper'

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
  const [initialFormValues] = React.useState({
    length: '',
    length_unit: '',
    width: '',
    width_unit: '',
  })
  const [Result, setResult] = React.useState({
    area: 0,
    submittedLength: 0,
    submitted_width: 0,
    units: ''
  })

  const [resultTwo, setResultTwo] = React.useState({
    areaInLengthUnit: 0,
    areaInWidthUnit: 0,
    lengthInWidthUnit: 0,
    $widthInlengthUnit: 0,
    submittedLength: '',
    submitted_width: ''
  })

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
          tabTitle1={CALCULATORS.rectangleArea}
          sm={6}
          dropDown={true}
          openDrop={openDrop}
          ref={animatedSquaresRef1}
          config={{
            translateX: -250,
            easing: 'easeInOutSine',
            autoplay: false,
            duration: 250
          }}
        >
          <Formik
            initialValues={initialFormValues}
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
                const { payload: rectangleArea } = await calculateMath(payload)
                console.log('=====>', rectangleArea)
                const { area,
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
                  setResult({
                    area: area,
                    submittedLength: submittedLength,
                    submitted_width: submitted_width,
                    units: units
                  })
                }

                if (typeof rectangleArea === 'object' && unitType === false) {
                  setSelectedResult(unitType)
                  setResultTwo({
                    areaInLengthUnit: areaInLengthUnit,
                    areaInWidthUnit: areaInWidthUnit,
                    lengthInWidthUnit: lengthInWidthUnit,
                    $widthInlengthUnit: $widthInlengthUnit,
                    submittedLength: submittedLength,
                    submitted_width: submitted_width
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
                  <Label title={LABELS.length} />
                  <CustomTextInput
                    type={INPUT_TYPE.number}
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
                    type={INPUT_TYPE.number}
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
          latex={LATEX.rectangleArea}
        >

          <div className="text-wrap">
            <Typography variant="subtitle1"> = {Result.area}{Result.units}<sup>2</sup></Typography>
          </div>

        </ResultTabsContainer>
      </Anime>

    </>
  )
}

export default RectangularArea
