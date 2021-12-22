import React from 'react'
import { Formik } from 'formik'
import { Typography, Box, Grid, Paper } from '@material-ui/core'
import Anime, { anime } from 'react-animejs-wrapper'
import { useSpring, animated } from 'react-spring'

import { NavBar2 } from '../../navbar/navbar2'
import AddLayout from '../../layouts/AddLayout'
import useStyles from '../../../styling/CustomStyles'
import { calculateStatistics } from '../../../services/AppCalculatorsApi'
import { MarginErrorI, SampleSizeI } from '../../../types'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  COLORS,
  LATEX,
} from '../../../common/shared'
import {
  CustomTextInput,
  CustomBtn,
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer,
  StyledTab,
  StyledTabs,
  TabPanel
} from '../../custom'
import { ProbabilityOfASeriesOfIndpendentEvents, ProbablityOfTwoEvents, ProbablitySolverForTwoEvents } from "../index";

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Latex = require('react-latex');

function SampleSizeCalculator() {
  const [answer, setAnswer] = React.useState<boolean>(false);
  const [tabValue, setTabValue] = React.useState(0);
  const {
    tabRoot,
    rightTabContainer,
    leftTabContainer,
    formDisplay,
    formDisplay2
  }: any = useStyles()
  const [sampleSizeInitialValues] = React.useState({
    confidence_level: '',
    population_proportion: '',
    margin_of_error: ''
  })
  const [Result1, setResult1] = React.useState({
    sampleSize: 0,
  })

  // ProbablityOfTwoEvents
  const [marginOfErrorInitialValues] = React.useState({
    confidence_level: '',
    sample_size: '',
    population_proportion: ''
  })
  const [Result2, setResult2] = React.useState({
    marginOfError: 0,
  })

  // Tab value change
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const formProps = useSpring({
    to: { opacity: 1 }, from: { opacity: 0 }
  })
  const resultProps = useSpring({
    to: { opacity: 1 }, from: { opacity: 0 }
  })

  return (
    <>
      <NavBar2 pagename="Probability Calculator" />
      <AddLayout>
        <Grid item xs={12} className='d-flex flex-row justify-content-center'>
          <button onClick={() => {
            //  console.log("FORM: ", playForm, "RESULT: ", resultAnimationRef)
          }}>
            Animate
          </button>
        </Grid>

        <div className='d-flex flex-row justify-content-center'>
          <animated.div style={formProps}>
            <Box className={formDisplay2} >
              <StyledTabs variant="fullWidth" value={tabValue} onChange={handleChange}>
                <StyledTab
                  wrapped
                  label={CALCULATORS.sampleSize}
                  {...a11yProps(0)}
                />
                <StyledTab
                  wrapped
                  label={CALCULATORS.marginOfError}
                  {...a11yProps(1)}
                />
              </StyledTabs>

              <TabPanel
                value={tabValue}
                index={0}
              >
                <Formik
                  initialValues={sampleSizeInitialValues}
                  onSubmit={async ({
                    confidence_level,
                    population_proportion,
                    margin_of_error
                  }, { setSubmitting, resetForm }) => {
                    const payload: SampleSizeI = {
                      confidence_level,
                      population_proportion,
                      margin_of_error,
                      method: 'FindOutTheSampleSize'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: circularSlabOrTubeConcrete } = await calculateStatistics(payload)
                      console.log('=====>', circularSlabOrTubeConcrete)
                      const { size } = circularSlabOrTubeConcrete
                      if (typeof circularSlabOrTubeConcrete === 'object') {
                        setResult1({
                          sampleSize: size,
                        })
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
                        <Label title={LABELS.confidenceLevel} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="confidence_level"
                          placeholder={PLACEHOLDERS.number}
                          value={values.confidence_level}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.populationProportion} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="population_proportion"
                          placeholder={PLACEHOLDERS.number}
                          value={values.population_proportion}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.marginOfError} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="margin_of_error"
                          placeholder={PLACEHOLDERS.number}
                          value={values.margin_of_error}
                          onChange={handleChange}
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
              </TabPanel>

              <TabPanel
                value={tabValue}
                index={1}
              >
                <Formik
                  initialValues={marginOfErrorInitialValues}
                  onSubmit={async ({
                    confidence_level,
                    sample_size,
                    population_proportion
                  }, { setSubmitting }) => {
                    const payload: MarginErrorI = {
                      confidence_level,
                      sample_size,
                      population_proportion,
                      method: 'FindOuttheMarginofError'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: marginOfErrorCalculator } = await calculateStatistics(payload)
                      console.log('=====>', marginOfErrorCalculator)
                      const { margin_of_error } = marginOfErrorCalculator
                      if (typeof marginOfErrorCalculator === 'object') {
                        setResult2({
                          marginOfError: margin_of_error,
                        })
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
                        <Label title={LABELS.confidenceLevel} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="confidence_level"
                          placeholder={PLACEHOLDERS.number}
                          value={values.confidence_level}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.populationProportion} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="population_proportion"
                          placeholder={PLACEHOLDERS.number}
                          value={values.population_proportion}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.sampleSize} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="sample_size"
                          placeholder={PLACEHOLDERS.number}
                          value={values.sample_size}
                          onChange={handleChange}
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
              </TabPanel>

            </Box>
          </animated.div>

          <animated.div style={resultProps}>
            <ResultTabsContainer
              tabTitle={'Result'}
            >
              {answer === true &&
                <Box className="text-wrap">
                  {tabValue === 0 &&
                    <Box sx={{ color: COLORS.text }}>
                      <Latex displayMode={true}>{LATEX.sampleSizeCalc}</Latex>
                      Sample size: {Result1.sampleSize}
                    </Box>
                  }

                  {tabValue === 1 &&
                    <Box sx={{ color: COLORS.text }}>
                      <Typography variant="subtitle1">
                        <Latex displayMode={true}>{LATEX.marginOfError}</Latex>
                        Margin of error: {Result2.marginOfError}
                      </Typography>
                    </Box>
                  }
                </Box>
              }
            </ResultTabsContainer>
          </animated.div>
        </div>
      </AddLayout>
    </>
  )
}

export default SampleSizeCalculator
