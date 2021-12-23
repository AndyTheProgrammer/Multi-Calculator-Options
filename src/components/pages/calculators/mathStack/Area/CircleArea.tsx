import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'
import Anime from 'react-animejs-wrapper'

import { CircleAreaI } from '../../../../../types'
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

const Latex = require('react-latex');

const CircleArea = (props: any) => {
  const { openDrop } = props
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [initialFormValues] = React.useState({
    radius: "",
    radius_unit: "",
  })
  const [Result, setResult] = React.useState({
    area: 0,
    units: '',
    Submitted_radius: '',
    Submitted_unit: ''
  })

  const [value, setValue] = React.useState(false)
  const animatedSquaresRef1 = React.useRef()
  const animatedSquaresRef2 = React.useRef()
  // @ts-ignore: Object is possibly 'null'.
  const play1 = () => animatedSquaresRef1.current.play();
  // @ts-ignore: Object is possibly 'null'.
  const play2 = () => animatedSquaresRef2.current.play();

  /*   React.useEffect(() => {
      if (value) {
        play1();
        play2();
      }
  
      return () => { }
    }) */

  return (
    <>
      {/* Form grid */}
      <Anime
        ref={animatedSquaresRef1}
        config={{
          translateX: -250,
          easing: 'easeInOutSine',
          autoplay: true,
          duration: 250
        }}
      >
        <FormTabsContainer
          tabTitle1={CALCULATORS.circleArea}
          sm={6}
          dropDown={true}
          openDrop={openDrop}
        >
          <Formik
            initialValues={initialFormValues}
            onSubmit={async ({
              radius,
              radius_unit
            }, { setSubmitting }) => {
              const payload: CircleAreaI = {
                radius,
                radius_unit,
                method: 'circleArea'
              }
              console.log(JSON.stringify(payload))
              try {
                const { success, payload: circleArea } = await calculateMath(payload)
                console.log('=====>', circleArea)

                if (typeof circleArea === 'object') {
                  const { area, units, submittedradius, submittedunit } = circleArea
                  setResult({
                    area: area,
                    units: units,
                    Submitted_radius: submittedradius,
                    Submitted_unit: submittedunit
                  })
                }
                if (success === true) {
                  setAnswer(success)
                }
                if (success === true) {
                  play1()
                  play2()
                }
                console.log("VALUE: ", success)
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

                <div
                  className="form-row"
                  style={{ alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <CustomBtn
                    onClick={() => {
                      play1();
                      play2();
                    }}
                  />
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
        {/* Result grid */}
        <ResultTabsContainer
          tabTitle={"Result"}
          latex={LATEX.cirleArea}
        >
          {answer === true &&
            <div className="text-wrap">
              <Typography variant="subtitle1">
                = {Result.area}{Result.units}<sup>2</sup>
              </Typography>
            </div>
          }

        </ResultTabsContainer>
      </Anime>
    </>
  )
}

export default CircleArea
