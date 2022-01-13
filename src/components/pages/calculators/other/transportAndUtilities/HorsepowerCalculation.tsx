import React from 'react'
import { Typography, Grid } from '@mui/material'
import { Formik } from 'formik'
import { useSpring } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../../navbar/navbar2'
import AddLayout from '../../../../layouts/AddLayout'
import { HorsepowerCalculationI } from '../../../../../types'
import { calculateOthers } from '../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  LATEX,
  TRANSPORT_PLACEHOLDERS
} from '../../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  Label,
  FormRow,
  FormTabsContainer,
  ResultTabsContainer,
  PlaceHolder,
} from '../../../../custom'
import {
  other_icon,
  transport_util_icon,
} from "../../../../../common/assets"

const HorsepowerCalculation = () => {
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
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)
  const [initialFormValues] = React.useState({
    force: "",
    force_unit: "",
    distance: "",
    distance_unit: "",
    time: "",
    time_unit: "",
  })
  const [Result, setResult] = React.useState({
    horsepower: 0,
    force: 0,
    distance: 0,
    time: 0,
    unit: ''
  })

  return (
    <>
      <NavBar2
        pageimage={other_icon}
        categoryname="Transport and Utility Calculators"
        pagename="Horsepower Calculator"
      />
      <AddLayout
        categorykey='transport'
        searchname='Ttansport and Utility Calculators'
        searchimage={transport_util_icon}
      >
        <Grid
          container
          justifyContent="center"
        >
          <PlaceHolder
            placeHolder={TRANSPORT_PLACEHOLDERS.horsepowerCalculation}
          />

          {/* Form */}
          <FormTabsContainer
            animation={formAnimation}
          >
            <Formik
              initialValues={initialFormValues}
              onSubmit={async ({
                force,
                force_unit,
                distance,
                distance_unit,
                time,
                time_unit,
              }, { setSubmitting }) => {
                const payload: HorsepowerCalculationI = {
                  force,
                  force_unit,
                  distance,
                  distance_unit,
                  time,
                  time_unit,
                  method: 'HorsepowerCalculationBasedOnDefinition'
                }
                console.log(JSON.stringify(payload))
                try {
                  const { success, payload: horsepowerCalculation } = await calculateOthers(payload)
                  console.log('=====>', horsepowerCalculation)
                  const {
                    answer,
                    force,
                    distance,
                    time,
                    unit,
                    unitType,
                  } = horsepowerCalculation
                  if (typeof horsepowerCalculation === 'object' && unitType === true) {
                    setResult({
                      horsepower: answer,
                      force: force,
                      distance: distance,
                      time: time,
                      unit: unit
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
                  <FormRow>
                    <Label title={LABELS.force} />
                    <CustomTextInput
                      type={INPUT_TYPE.text}
                      id="force"
                      placeholder={PLACEHOLDERS.number}
                      value={values.force}
                      onChange={handleChange}
                    />

                    <CustomSelect
                      id="force_unit"
                      measurement="force"
                      value={values.force_unit}
                      onChange={handleChange('force_unit')}
                    />
                  </FormRow>

                  <FormRow>
                    <Label title={LABELS.distance} />
                    <CustomTextInput
                      type={INPUT_TYPE.text}
                      id="distance"
                      placeholder={PLACEHOLDERS.number}
                      value={values.distance}
                      onChange={handleChange}
                    />

                    <CustomSelect
                      id="distance_unit"
                      measurement="length"
                      value={values.distance_unit}
                      onChange={handleChange('distance_unit')}
                    />
                  </FormRow>

                  <FormRow>
                    <Label title={LABELS.time} />
                    <CustomTextInput
                      type={INPUT_TYPE.text}
                      id="time"
                      placeholder={PLACEHOLDERS.number}
                      value={values.time}
                      onChange={handleChange}
                    />

                    <CustomSelect
                      id="time_unit"
                      measurement="time"
                      value={values.time_unit}
                      onChange={handleChange('time_unit')}
                    />
                  </FormRow>

                  <FormRow buttons reset={() => resetForm()} />
                </form>
              )}
            </Formik>
          </FormTabsContainer>

          {/* Results grid */}
          {answer === true &&
            <ResultTabsContainer
              tabTitle={'Result'}
              animation={resultAnimation}
              latex={LATEX.horsepowerCalc}
            >
              <div className="mb-3">
                <Typography variant="subtitle1">
                  Horsepower: {Result.horsepower}{Result.unit}
                </Typography>
              </div>
            </ResultTabsContainer>
          }
        </Grid>
      </AddLayout>

    </>
  )
}

export default HorsepowerCalculation
