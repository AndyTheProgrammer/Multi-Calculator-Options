import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { EllipseAreaI } from '../../../../../types'
import { calculateMath } from '../../../../../services/AppCalculatorsApi'
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
  const [initialFormValues] = React.useState({
    semi_major_axes_a: "",
    semi_major_axes_a_unit: "",
    semi_major_axes_b: "",
    semi_major_axes_b_unit: "",
  })
  const [Result, setResult] = React.useState({
    semi_major_axes_a: 0,
    semi_major_axes_b: 0,
    area: 0,
    unit: ''
  })
  const [resultTwo, setResultTwo] = React.useState({
    areaInsemi_major_axes_aUnit: 0,
    areaInsemi_major_axes_bUnit: 0,
    semi_major_axes_aInsemi_major_axes_bUnit: 0,
    $semi_major_axes_bInsemi_major_axes_aUnit: 0,
    submittedsemi_major_axes_a: 0,
    submitted_semi_major_axes_b: 0,

  })
  const [selectedResult, setSelectedResult] = React.useState<boolean>(false)
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
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.ellipseArea}
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
              const { payload: ellipseArea } = await calculateMath(payload)
              console.log('=====>', ellipseArea)
              const {
                area,
                unit,
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
                setResult({
                  area: area,
                  semi_major_axes_a: semi_major_axes_a,
                  semi_major_axes_b: semi_major_axes_b,
                  unit: unit
                })
              }
              if (typeof ellipseArea === 'object' && unitType === false) {
                setSelectedResult(unitType)
                setResultTwo({
                  areaInsemi_major_axes_aUnit: areaInsemi_major_axes_aUnit,
                  areaInsemi_major_axes_bUnit: areaInsemi_major_axes_bUnit,
                  semi_major_axes_aInsemi_major_axes_bUnit: semi_major_axes_aInsemi_major_axes_bUnit,
                  $semi_major_axes_bInsemi_major_axes_aUnit: $semi_major_axes_bInsemi_major_axes_aUnit,
                  submitted_semi_major_axes_b: submitted_semi_major_axes_b,
                  submittedsemi_major_axes_a: submittedsemi_major_axes_a
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
                <Label title={LABELS.semiMajorAxesA} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
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
                  type={INPUT_TYPE.number}
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
      <ResultTabsContainer tabTitle1={"Result"}
        sm={6}
        ref={animatedSquaresRef2}
        config={{
          translateX: 200,
          easing: 'easeInOutSine',
          autoplay: false,
          duration: 250
        }}
        latex={LATEX.ellipseArea}
      >
        {selectedResult ? (
          <div className="text-wrap">
            <Typography variant="subtitle1"> = {Result.area}{Result.unit}<sup>2</sup></Typography>
          </div>
        ) : (
          <div className="text-wrap">
            <Typography variant="subtitle1"> = {Result.area}{Result.unit}<sup>2</sup></Typography>
            <Typography variant="subtitle1">semi_major_axes_bInsemi_major_axes_aUnit: {resultTwo.$semi_major_axes_bInsemi_major_axes_aUnit}</Typography>
            <Typography variant="subtitle1">areaInsemi_major_axes_aUnit: {resultTwo.areaInsemi_major_axes_aUnit}</Typography>
            <Typography variant="subtitle1">areaInsemi_major_axes_bUnit: {resultTwo.areaInsemi_major_axes_bUnit}</Typography>
            <Typography variant="subtitle1">semi_major_axes_aInsemi_major_axes_bUnit: {resultTwo.semi_major_axes_aInsemi_major_axes_bUnit}</Typography>
            <Typography variant="subtitle1">submitted_semi_major_axes_b: {resultTwo.submitted_semi_major_axes_b}</Typography>
            <Typography variant="subtitle1">submittedsemi_major_axes_a: {resultTwo.submittedsemi_major_axes_a}</Typography>
          </div>
        )}
      </ResultTabsContainer>


    </>
  )
}

export default EllipseArea
