import React from 'react'
import { Formik } from 'formik'
import { Typography, Box, Grid, Paper } from '@mui/material'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

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
  ResultTabsContainer,
  StyledTab,
  StyledTabs,
  TabPanel
} from '../../custom'

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
  const [tabValue, setTabValue] = React.useState(0);
  const {
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

  React.useEffect(() => {

    return () => {
    };
  }, [])

  return (
    <>
      <NavBar2 pagename="Sample Size Calculator" />
      <AddLayout>
        <Grid xs={12} sm={12}>
          <button
            style={{ alignItems: 'center', justifyContent: 'center' }}
            onClick={() => {
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
            }}>
            Animate
          </button>
          <Typography>{`theme.breakpoints.up('sm') matches: ${matches}`}</Typography>
        </Grid>

        <animated.div
          style={formAnimation}
        >
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
                    if (success === true) {
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

        <ResultTabsContainer
          tabTitle={'Result'}
          animation={resultAnimation}
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
      </AddLayout>
    </>
  )
}

export default SampleSizeCalculator
