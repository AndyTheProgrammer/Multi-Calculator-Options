import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'
import Anime from 'react-animejs-wrapper'

import { SectorAreaI } from '../../../../../types'
import { calculateMath } from '../../../../../services/AppCalculatorsApi'
import useStyles from '../../../../../styling/CustomStyles'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  COLORS,
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

const SectorArea = (props: any) => {
  const { openDrop } = props
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [initialFormValues] = React.useState({
    radius: "",
    radius_unit: "",
    angle: "",
    angle_unit: "",
  })
  const [Result, setResult] = React.useState({
    area: 0,
    radiusUnits: 0,
    angleUnit: 0,
    submittedradius: '',
    submitted_angle: '',
    unit: ''
  })

  const [resultTwo, setResultTwo] = React.useState({

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
          tabTitle1={CALCULATORS.sectorArea}
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
              radius,
              radius_unit,
              angle,
              angle_unit,
            }, { setSubmitting, resetForm }) => {
              const payload: SectorAreaI = {
                radius,
                radius_unit,
                angle,
                angle_unit,
                method: 'sectorArea'
              }
              console.log(JSON.stringify(payload))
              try {
                const { success, payload: sectorArea } = await calculateMath(payload)
                console.log('=====>', sectorArea)
                const {
                  area,
                  unitType,
                  radiusUnits,
                  angleUnit,
                  submittedradius,
                  submitted_angle,
                  unit
                } = sectorArea
                if (typeof sectorArea === 'object' && unitType === true) {
                  setSelectedResult(unitType)
                  setResult({
                    area: area,
                    radiusUnits: radiusUnits,
                    angleUnit: angleUnit,
                    submitted_angle: submitted_angle,
                    submittedradius: submittedradius,
                    unit: unit,
                  })
                }
                if (typeof sectorArea === 'object' && unitType === true) {
                  setSelectedResult(unitType)
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
                  <Label title={LABELS.radius} />
                  <CustomTextInput
                    type={INPUT_TYPE.number}
                    id="radius"
                    placeholder={PLACEHOLDERS.number}
                    value={values.radius}
                    onChange={handleChange}
                  />

                  <CustomSelect
                    id="radius_unit"
                    measurement="length"
                    value={values.radius_unit}
                    onChange={handleChange('radius_unit')}
                  />
                </div>

                <div className="form-row">
                  <Label title={LABELS.angle} />
                  <CustomTextInput
                    type={INPUT_TYPE.number}
                    id="angle"
                    placeholder={PLACEHOLDERS.number}
                    value={values.angle}
                    onChange={handleChange}
                  />

                  <CustomSelect
                    id="angle_unit"
                    measurement="angle"
                    value={values.angle_unit}
                    onChange={handleChange('angle_unit')}
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
          latex={LATEX.sectorArea}
        >
          {answer === true &&
            <div className="text-wrap">
              <Typography variant="subtitle1">
                = {Result.area}{Result.unit}<sup>2</sup>
              </Typography>
            </div>
          }

        </ResultTabsContainer>
      </Anime>

    </>
  )
}

export default SectorArea
