import React from 'react'
import { Typography, Grid, Box } from '@mui/material'
import { Formik } from 'formik'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSpring, animated } from 'react-spring'

import { CircleAreaI } from '../../../../../../types'
import { calculateMath } from '../../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
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
import PlaceHolder from '../../../../../custom/PlaceHolder';
import useStyles from '../../../../../../styling/CustomStyles';

const Latex = require('react-latex');

const CircleArea = (props: any) => {
  const { onHandleOpen, opened, onHandleClose, calcs } = props
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [formAnimation, formApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(100px)' : 'translateX(0px)',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [resultAnimation, resultApi] = useSpring(() => ({
    transform: matches === true ? 'translateY(-200px)' : 'translateX(-210px)',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [circleInitialValues] = React.useState({
    radius: "25",
    radius_unit: "",
  })
  const [circleResult, setCircleResult] = React.useState({
    area: 0,
    units: '',
    Submitted_radius: '',
    Submitted_unit: ''
  })

  const {
    fieldDisplay
  }: any = useStyles()

  return (
    <>
      <PlaceHolder
        placeHolder='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis varius quam quisque id. Odio euismod lacinia at quis risus sed vulputate odio.     '
      />
      <FormTabsContainer
        tabTitle1={CALCULATORS.circleArea}
        dropDown={true}
        opened={opened}
        onHandleOpen={onHandleOpen}
        calcs={calcs}
        onHandleClose={onHandleClose}
        animation={formAnimation}
      >
        <Formik
          initialValues={circleInitialValues}
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
                setCircleResult({
                  area: area,
                  units: units,
                  Submitted_radius: submittedradius,
                  Submitted_unit: submittedunit
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
              console.log("VALUE: ", success)
            } catch (err) {
              console.log('====>', err)
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, resetForm }) => (
            <form onSubmit={handleSubmit} className="form-container">
              <FormRow>
                <Label title={LABELS.radius} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="radius"
                  placeholder=''
                  value={values.radius}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="radius_unit"
                  measurement="length"
                  value={values.radius_unit}
                  onChange={handleChange('radius_unit')}
                />
              </FormRow>

              <FormRow buttons reset={() => resetForm()} />
            </form>
          )}
        </Formik>
      </FormTabsContainer>

      {answer === true &&
        < ResultTabsContainer
          tabTitle={"Result"}
          latex={LATEX.cirleArea}
          animation={resultAnimation}
        >
          <div className="text-wrap text-center">
            <Typography variant="subtitle1">
              = {circleResult.area}{circleResult.units}<sup>2</sup>
            </Typography>
          </div>
        </ResultTabsContainer>
      }
    </>
  )
}

export default CircleArea
