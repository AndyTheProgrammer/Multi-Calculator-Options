import React from 'react'
import { Typography, Box } from '@mui/material'
import { Formik } from 'formik'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSpring } from 'react-spring'

import { CircleAreaI } from '../../../../../../types'
import { calculateMath } from '../../../../../../services/AppCalculatorsApi'
import { circle } from '../../../../../../common/assets';
import {
  CALCULATORS,
  LABELS,
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

const CircleArea = () => {
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
    radius_unit: "mm",
  })
  const [circleResult, setCircleResult] = React.useState({
    area: 0,
    unit: '',
    Submitted_radius: 0,
    Submitted_unit: ''
  })

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Do not forget to add placeHolder components on all other calculators */}
      <PlaceHolder
        placeHolder={GEOMETRY_PLACEHOLDERS.circleArea}
      />

      <FormTabsContainer
        tabTitle1={CALCULATORS.circleArea}
        dropDown={true}
        opened={open}
        animation={formAnimation}
        onHandleOpen={handleClickOpen}
        calculatorList={AREA_CALCULATORS}
      >
        <Image path={circle} />
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
                  unit: units,
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
              <FieldContainer>
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
              </FieldContainer>

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
          <Typography variant="subtitle2">
            <Latex displayMode={false}>
              {`$Taking \\ \\pi \\ as \\ 3.14159265$`}
            </Latex>
          </Typography>

          <Typography variant="subtitle1">
            <Latex displayMode={false}>
              {`$A = \\pi * ${circleResult.Submitted_radius}^{2}$`}
            </Latex>
          </Typography>

          <Typography variant="subtitle1">
            <Latex displayMode={false}>
              {`$A = \\pi * ${circleResult.Submitted_radius * circleResult.Submitted_radius}$`}
            </Latex>
          </Typography>

          <Typography variant="subtitle1" className='final-answer'>
            <Latex displayMode={false}>
              {`$A = ${circleResult.area} ${circleResult.unit}^{2}$`}
            </Latex>
          </Typography>

        </ResultTabsContainer>
      }
    </>
  )
}

export default CircleArea
