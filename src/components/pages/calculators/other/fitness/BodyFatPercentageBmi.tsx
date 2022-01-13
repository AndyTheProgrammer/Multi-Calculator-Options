import React from 'react'
import { Typography, Grid } from '@mui/material'
import { Formik } from 'formik'
import { useSpring } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../../navbar/navbar2'
import AddLayout from '../../../../layouts/AddLayout'
import { BodyFatPercentageI } from '../../../../../types'
import { calculateOthers } from '../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  FITNESS_PLACEHOLDERS
} from '../../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  Label,
  FormRow,
  FormTabsContainer,
  ResultTabsContainer,
  PlaceHolder,
  Image,
} from '../../../../custom'
import {
  other_icon,
  fitness_calc_icon,
} from "../../../../../common/assets"

const BodyFatPercentageBmi = () => {
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
  const [answer, setAnswer] = React.useState<boolean>(false);
  const [initialFormValues] = React.useState({
    neck: '',
    neck_unit: '',
    height: '',
    height_unit: '',
    waist: '',
    waist_unit: '',
    gender: '',
    hip: '',
    hip_unit: ''
  });
  const [Result, setResult] = React.useState({
    BFP: 0,
  });

  return (
    <>
      <NavBar2
        pageimage={other_icon}
        categoryname="Fintness Calculators"
        pagename="Body Fat Percentage"
      />
      <AddLayout
        categorykey='fitness'
        searchname='Fitness Calculators'
        searchimage={fitness_calc_icon}
      >
        <Grid
          container
          justifyContent="center"
        >
          <PlaceHolder placeHolder={FITNESS_PLACEHOLDERS.bodyFatPercentage} />

          {/* Form grid */}
          <FormTabsContainer
            animation={formAnimation}
          >
            <Formik
              initialValues={initialFormValues}
              onSubmit={async ({
                neck,
                neck_unit,
                height,
                height_unit,
                waist,
                waist_unit,
                gender,
                hip,
                hip_unit
              }, { setSubmitting, resetForm }) => {
                const payload: BodyFatPercentageI = {
                  neck,
                  neck_unit,
                  height,
                  height_unit,
                  waist,
                  waist_unit,
                  gender,
                  hip,
                  hip_unit,
                  method: 'BodyFatCalculator'
                }
                console.log(JSON.stringify(payload))
                try {
                  const { success, payload: bodyFatPercentage } = await calculateOthers(payload)
                  console.log('=====>', bodyFatPercentage)
                  if (typeof bodyFatPercentage === 'object') {
                    const { BFP } = bodyFatPercentage
                    setResult({
                      BFP: BFP
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
                    <Label title={LABELS.height} />
                    <CustomTextInput
                      type={INPUT_TYPE.text}
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
                  </FormRow>

                  <FormRow>
                    <Label title={LABELS.waist} />
                    <CustomTextInput
                      type={INPUT_TYPE.text}
                      id="waist"
                      placeholder={PLACEHOLDERS.number}
                      value={values.waist}
                      onChange={handleChange}
                    />

                    <CustomSelect
                      id="waist_unit"
                      measurement="length"
                      value={values.waist_unit}
                      onChange={handleChange('waist_unit')}
                    />
                  </FormRow>

                  <FormRow>
                    <Label title={LABELS.neck} />
                    <CustomTextInput
                      type={INPUT_TYPE.text}
                      id="neck"
                      placeholder={PLACEHOLDERS.number}
                      value={values.neck}
                      onChange={handleChange}
                    />

                    <CustomSelect
                      id="neck_unit"
                      measurement="length"
                      value={values.neck_unit}
                      onChange={handleChange('neck_unit')}
                    />
                  </FormRow>

                  <FormRow>
                    <Label title={LABELS.hip} />
                    <CustomTextInput
                      type={INPUT_TYPE.text}
                      id="hip"
                      placeholder={PLACEHOLDERS.number}
                      value={values.hip}
                      onChange={handleChange}
                    />

                    <CustomSelect
                      id="hip_unit"
                      measurement="length"
                      value={values.hip_unit}
                      onChange={handleChange('hip_unit')}
                    />
                  </FormRow>

                  <FormRow>
                    <Label title={LABELS.gender} />
                    <CustomSelect
                      id="gender"
                      measurement="gender"
                      value={values.gender}
                      onChange={handleChange('gender')}
                    />
                  </FormRow>

                  <FormRow buttons reset={() => resetForm()} />
                </form>
              )}
            </Formik>
          </FormTabsContainer>

          {/* Results grid */}
          {answer === true &&
            <ResultTabsContainer tabTitle={'Result'} animation={resultAnimation}>
              <div className="mb-3">
                <Typography variant="subtitle1">Body Fat Percentage: {Result.BFP}</Typography>
              </div>
            </ResultTabsContainer>
          }
        </Grid>
      </AddLayout>
    </>
  )
}

export default BodyFatPercentageBmi
