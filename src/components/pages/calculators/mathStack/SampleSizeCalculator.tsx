import React from 'react'
import { Formik } from 'formik'
import { Typography, Box, Grid, Paper, Button } from '@mui/material'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../navbar/navbar2'
import AddLayout from '../../../layouts/AddLayout'
import useStyles from '../../../../styling/CustomStyles'
import { calculateStatistics } from '../../../../services/AppCalculatorsApi'
import { MarginErrorI, SampleSizeI } from '../../../../types'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  COLORS,
  LATEX,
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomBtn,
  CustomResetBtn,
  Label,
  ResultTabsContainer,
  StyledTab,
  StyledTabs,
  TabPanel
} from '../../../custom'

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Latex = require('react-latex');

function SampleSizeCalculator(props: any) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  // initial animation values
  const [formAnimation, formApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(0px)' : 'translateX(0px)',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  }));
  const [resultAnimation, resultApi] = useSpring(() => ({
    transform: matches === true ? 'translateY(-200px)' : 'translateX(-210px)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  }));
  const [answer, setAnswer] = React.useState<boolean>(false);
  const [tabValue, setTabValue] = React.useState(0);
  const {
    formDisplay,
    formDisplay2,
    tabRoot,
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

  React.useEffect(() => {

    return () => {
    };
  }, [])

  return (
    <>
      <NavBar2 pagename="Sample Size Calculator" />
      <AddLayout>
        <Grid
          container
          justifyContent="center"
        >
          <animated.div
            style={formAnimation}
          >
            <Box className={formDisplay2}>
              <div className={tabRoot}>
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
                        const { success, payload: sampleSizeCalculator } = await calculateStatistics(payload)
                        console.log('=====>', sampleSizeCalculator)
                        const { size } = sampleSizeCalculator
                        if (typeof sampleSizeCalculator === 'object') {
                          setResult1({
                            sampleSize: size,
                          })
                        }
                        if (success === true) {
                          setAnswer(success)
                          formApi.start({
                            transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            margin: 'auto',
                          });
                          resultApi.start({
                            transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            margin: 'auto',
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
                          <Label title={LABELS.confidenceLevel} />
                          <CustomTextInput
                            col
                            type={INPUT_TYPE.text}
                            id="confidence_level"
                            placeholder={PLACEHOLDERS.number}
                            value={values.confidence_level}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.populationProportion} />
                          <CustomTextInput
                            col
                            type={INPUT_TYPE.text}
                            id="population_proportion"
                            placeholder={PLACEHOLDERS.number}
                            value={values.population_proportion}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.marginOfError} />
                          <CustomTextInput
                            col
                            type={INPUT_TYPE.text}
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
                        if (success === true) {
                          formApi.start({
                            transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            margin: 'auto',
                          });
                          resultApi.start({
                            transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            margin: 'auto',
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
                          <Label title={LABELS.confidenceLevel} />
                          <CustomTextInput
                            col
                            type={INPUT_TYPE.text}
                            id="confidence_level"
                            placeholder={PLACEHOLDERS.number}
                            value={values.confidence_level}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.populationProportion} />
                          <CustomTextInput
                            col
                            type={INPUT_TYPE.text}
                            id="population_proportion"
                            placeholder={PLACEHOLDERS.number}
                            value={values.population_proportion}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.sampleSize} />
                          <CustomTextInput
                            col
                            type={INPUT_TYPE.text}
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
              </div>
            </Box>
          </animated.div>

          {answer === true &&
            <ResultTabsContainer
              tabTitle={'Result'}
              animation={resultAnimation}
            >

              <Box>
                {tabValue === 0 &&
                  <Box sx={{ color: COLORS.text }}>
                    <Typography variant="subtitle1" className="text-center">
                      <Latex displayMode={true}>{LATEX.sampleSizeCalc}</Latex>
                      Sample size: {Result1.sampleSize}
                    </Typography>
                  </Box>
                }

                {tabValue === 1 &&
                  <Box sx={{ color: COLORS.text }}>
                    <Typography variant="subtitle1" className="text-center">
                      <Latex displayMode={true}>{LATEX.marginOfError}</Latex>
                      Margin of error: {Result2.marginOfError}
                    </Typography>
                  </Box>
                }
              </Box>
            </ResultTabsContainer>
          }
        </Grid>
      </AddLayout>
    </>
  )
}

export default SampleSizeCalculator
