import React from 'react'
import { Typography, Grid } from '@mui/material'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../navbar/navbar2'
import AddLayout from '../../../layouts/AddLayout'
import { BloodAlcoholContentI } from '../../../../types'
import { calculateOthers } from '../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  LATEX,
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  CustomBtn,
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../custom'

const BloodAlcoholContent = () => {
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
    weight: '',
    weight_unit: '',
    gender: '',
    hours_of_drinking: '',
    minutes_of_drinking: '',
    number_of_standard_drinks: '',
  })
  const [Result, setResult] = React.useState({
    BAC: 0,
    numberOfHoursAverage: 0,
    divident: 0,
    divisor: 0,
    M: 0,
    N: 0,
    H: 0
  })

  return (
    <>
      <NavBar2 pagename="Blood Alcohol Content (BAC) Calculator" />
      <AddLayout>
        <Grid
          container
          justifyContent="center"
        >
          {/* Form grid */}
          <FormTabsContainer
            tabTitle1={CALCULATORS.bloodAlcoholContent}
            animation={formAnimation}
          >
            <Formik
              initialValues={initialFormValues}
              onSubmit={async ({
                weight,
                weight_unit,
                gender,
                hours_of_drinking,
                minutes_of_drinking,
                number_of_standard_drinks,
              }, { setSubmitting, resetForm }) => {
                const payload: BloodAlcoholContentI = {
                  weight,
                  weight_unit,
                  gender,
                  hours_of_drinking,
                  minutes_of_drinking,
                  number_of_standard_drinks,
                  method: 'bloodAlcoholContent'
                }
                try {
                  const { success, payload: BloodAlcoholContent } = await calculateOthers(payload)
                  console.log('=====>', BloodAlcoholContent)
                  if (typeof BloodAlcoholContent === 'object') {
                    const { BAC, numberOfHoursAverage, divident, divisor, M, N, H } = BloodAlcoholContent
                    setResult({
                      BAC: BAC,
                      numberOfHoursAverage: numberOfHoursAverage,
                      divident: divident,
                      divisor: divisor,
                      M: M,
                      N: N,
                      H: H
                    })
                  }
                  if (success === true) {
                    setAnswer(success)
                    formApi.start({
                      transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    });
                    resultApi.start({
                      transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
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
                    <Label title={LABELS.weight} />
                    <CustomTextInput
                      type={INPUT_TYPE.number}
                      id="weight"
                      placeholder={PLACEHOLDERS.number}
                      value={values.weight}
                      onChange={handleChange}
                    />

                    <CustomSelect
                      id="weight_unit"
                      measurement="weight"
                      value={values.weight_unit}
                      onChange={handleChange('weight_unit')}
                    />
                  </div>

                  <div className="form-row">
                    <Label title={LABELS.gender} />

                    <CustomSelect
                      id="gender"
                      measurement="gender"
                      value={values.gender}
                      onChange={handleChange('gender')}
                    />
                  </div>

                  <div className="form-row">
                    <Label title={LABELS.hoursOfDrinking} />
                    <CustomTextInput
                      type={INPUT_TYPE.number}
                      id="hours_of_drinking"
                      placeholder={PLACEHOLDERS.number}
                      value={values.hours_of_drinking}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-row">
                    <Label title={LABELS.minutesOfDrinking} />
                    <CustomTextInput
                      type={INPUT_TYPE.number}
                      id="minutes_of_drinking"
                      placeholder={PLACEHOLDERS.number}
                      value={values.minutes_of_drinking}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-row">
                    <Label title={LABELS.numberOfStandardDrinks} />
                    <CustomTextInput
                      type={INPUT_TYPE.number}
                      id="number_of_standard_drinks"
                      placeholder={PLACEHOLDERS.number}
                      value={values.number_of_standard_drinks}
                      onChange={handleChange}
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
            <ResultTabsContainer tabTitle={'Result'} animation={resultAnimation}>

              <div className="mb-3">
                <Typography variant="subtitle1">
                  Blood alcohol content: {Result.BAC}
                </Typography>
              </div>

            </ResultTabsContainer>
          }
        </Grid>
      </AddLayout>
    </>
  )
}

export default BloodAlcoholContent
