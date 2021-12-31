import React from 'react'
import { Typography, Grid } from '@mui/material'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../navbar/navbar2'
import AddLayout from '../../../layouts/AddLayout'
import { BodySurfaceAreaI } from '../../../../types'
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

const BodyMassFormulaCalculator = () => {
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
    weight_unit: ''
  })
  const [Result, setResult] = React.useState({
    duBoisFormulaBodySurfaceArea: 0,
    mostellerFormulaBodySurfaceArea: 0,
    haycockFormulaBodySurfaceArea: 0,
    gehanAndGeorgeFormulaBodySurfaceArea: 0,
    boydFormulaBodySurfaceArea: 0,
    fujimotoFormulaBodySurfaceArea: 0,
    takahiraFormulaBodySurfaceArea: 0,
    schlichFormulaBodySurfaceArea: 0,
    unit: ''
  })

  return (
    <>
      <NavBar2 pagename="Body Surface Area Calculator" />
      <AddLayout>
        <Grid
          container
          justifyContent="center"
        >
          {/* Form grid */}
          <FormTabsContainer
            animation={formAnimation}
          >
            <Formik
              initialValues={initialFormValues}
              onSubmit={async ({
                height,
                height_unit,
                weight,
                weight_unit
              }, { setSubmitting }) => {
                const payload: BodySurfaceAreaI = {
                  height,
                  height_unit,
                  weight,
                  weight_unit,
                  method: 'allBodyMassFormulars'
                }
                console.log(JSON.stringify(payload))
                try {
                  const { success, payload: bodySurfaceArea } = await calculateOthers(payload)
                  console.log('=====>', bodySurfaceArea)
                  if (typeof bodySurfaceArea === 'object') {
                    const {
                      DuBoisFormulaBodySurfaceArea,
                      MostellerFormulaBodySurfaceArea,
                      HaycockFormulaBodySurfaceArea,
                      GehanAndGeorgeFormulaBodySurfaceArea,
                      $BoydFormulaBodySurfaceArea,
                      FujimotoFormulaBodySurfaceArea,
                      TakahiraFormulaBodySurfaceArea,
                      SchlichFormulaBodySurfaceArea,
                      unit,
                      unitType,
                    } = bodySurfaceArea
                    setResult({
                      duBoisFormulaBodySurfaceArea: DuBoisFormulaBodySurfaceArea,
                      mostellerFormulaBodySurfaceArea: MostellerFormulaBodySurfaceArea,
                      haycockFormulaBodySurfaceArea: HaycockFormulaBodySurfaceArea,
                      gehanAndGeorgeFormulaBodySurfaceArea: GehanAndGeorgeFormulaBodySurfaceArea,
                      boydFormulaBodySurfaceArea: $BoydFormulaBodySurfaceArea,
                      fujimotoFormulaBodySurfaceArea: FujimotoFormulaBodySurfaceArea,
                      takahiraFormulaBodySurfaceArea: TakahiraFormulaBodySurfaceArea,
                      schlichFormulaBodySurfaceArea: SchlichFormulaBodySurfaceArea,
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
                  <div className="form-row">
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
                  </div>

                  <div className="form-row">
                    <Label title={LABELS.weight} />
                    <CustomTextInput
                      type={INPUT_TYPE.text}
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

              <div className="mb-3 text-center text-wrap">
                <Typography variant="subtitle1">
                  <Latex displayMode={true}>{LATEX.duBoisBodySurfArea}</Latex>
                  Du Bois: {Result.duBoisFormulaBodySurfaceArea}{Result.unit}<sup>2</sup>
                </Typography>

                <Typography variant="subtitle1">
                  <Latex displayMode={true}>{LATEX.mostellerBodySurfArea}</Latex>
                  Mosteller: {Result.mostellerFormulaBodySurfaceArea}{Result.unit}<sup>2</sup>
                </Typography>

                <Typography variant="subtitle1">
                  <Latex displayMode={true}>{LATEX.haycockBodySurfArea}</Latex>
                  Haycock: {Result.haycockFormulaBodySurfaceArea}{Result.unit}<sup>2</sup>
                </Typography>

                <Typography variant="subtitle1">
                  <Latex displayMode={true}>{LATEX.gehanAndGeorgeBodySurfArea}</Latex>
                  Gehan and George: {Result.gehanAndGeorgeFormulaBodySurfaceArea}{Result.unit}<sup>2</sup>
                </Typography>

                <Typography variant="subtitle1">
                  <Latex displayMode={true}>{LATEX.boydFormulaBodySurfArea}</Latex>
                  Boyd: {Result.boydFormulaBodySurfaceArea}{Result.unit}<sup>2</sup>
                </Typography>

                <Typography variant="subtitle1">
                  <Latex displayMode={true}>{LATEX.fujimotoFormulaBodySurfArea}</Latex>
                  Fujimoto: {Result.fujimotoFormulaBodySurfaceArea}{Result.unit}<sup>2</sup>
                </Typography>

                <Typography variant="subtitle1">
                  <Latex displayMode={true}>{LATEX.takahiraBodySurfArea}</Latex>
                  Takahira: {Result.takahiraFormulaBodySurfaceArea}{Result.unit}<sup>2</sup>
                </Typography>

                <Typography variant="subtitle1">
                  Men : <Latex displayMode={true}>
                    {LATEX.schlichBodySurfArea_men}
                  </Latex>
                  Women: <Latex displayMode={true}>
                    {LATEX.schlichBodySurfArea_women}
                  </Latex>

                  Schlich: {Result.schlichFormulaBodySurfaceArea}{Result.unit}<sup>2</sup>
                </Typography>
              </div>
            </ResultTabsContainer>
          }
        </Grid>
      </AddLayout>
    </>
  )
}

export default BodyMassFormulaCalculator
