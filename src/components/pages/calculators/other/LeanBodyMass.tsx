import React from 'react'
import { Typography, Grid } from '@mui/material'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../navbar/navbar2'
import AddLayout from '../../../layouts/AddLayout'
import { LeanBodyMassI } from '../../../../types'
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

const Latex = require('react-latex');

const LeanBodyMass = () => {
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
    height: '',
    height_unit: '',
    weight: '',
    weight_unit: '',
    gender: ''
  })
  const [Result, setResult] = React.useState({
    BoerFormular: 0,
    JamesFormular: 0,
    HumFormular: 0
  })

  return (
    <>
      <NavBar2 pagename="Lean Body Mass Calculator" />
      <AddLayout>
        <Grid
          container
          justifyContent="center"
        >
          {/* Form grid */}
          <FormTabsContainer tabTitle1={CALCULATORS.leanBodyMass} animation={formAnimation}>
            <Formik
              initialValues={initialFormValues}
              onSubmit={async ({
                height,
                height_unit,
                weight,
                weight_unit,
                gender
              }, { setSubmitting }) => {
                const payload: LeanBodyMassI = {
                  height,
                  height_unit,
                  weight,
                  weight_unit,
                  gender,
                  method: 'LeanBodyMass'
                }
                console.log(JSON.stringify(payload))
                try {
                  const { success, payload: leanBodyMassFormula } = await calculateOthers(payload)
                  console.log('=====>', leanBodyMassFormula)
                  if (typeof leanBodyMassFormula === 'object') {
                    const {
                      BoerFormular,
                      JamesFormular,
                      HumFormular
                    } = leanBodyMassFormula
                    setResult({
                      BoerFormular: BoerFormular,
                      JamesFormular: JamesFormular,
                      HumFormular: HumFormular
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
          {answer === true &&
            <ResultTabsContainer tabTitle={'Result'} animation={resultAnimation}>
              <div className="text-center mb-3 text-wrap">
                <Typography variant="subtitle2">Boer formula; Women and Men</Typography>
                <Typography variant="subtitle2">
                  <Latex displayMode={true}>{LATEX.leanBodyMass_boer_f}</Latex>
                  <Latex displayMode={true}>{LATEX.leanBodyMass_boer_m}</Latex>
                </Typography>

                <Typography variant="subtitle2">Hume formula; Women and Men</Typography>
                <Typography variant="subtitle2">
                  <Latex displayMode={true}>{LATEX.leanBodyMass_hume_f}</Latex>
                  <Latex displayMode={true}>{LATEX.leanBodyMass_hume_m}</Latex>
                </Typography>

                <Typography variant="subtitle2">James formula; Women and Men</Typography>
                <Typography variant="subtitle2">
                  <Latex displayMode={true}>{LATEX.leanBodyMass_james_f}</Latex>
                  <Latex displayMode={true}>{LATEX.leanBodyMass_james_m}</Latex>
                </Typography>


                <Typography variant="subtitle1">
                  Boer formula: {Result.BoerFormular}
                </Typography>

                <Typography variant="subtitle1">
                  Hume formula: {Result.HumFormular}
                </Typography>

                <Typography variant="subtitle1">
                  James formula: {Result.JamesFormular}
                </Typography>

              </div>
            </ResultTabsContainer>
          }
        </Grid>
      </AddLayout>
    </>
  )
}

export default LeanBodyMass
