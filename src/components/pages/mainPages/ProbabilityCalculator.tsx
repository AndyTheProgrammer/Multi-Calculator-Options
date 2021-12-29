import React from 'react'
import { Formik } from 'formik'
import { Typography, Box, Grid, Paper } from '@mui/material'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../navbar/navbar2'
import AddLayout from '../../layouts/AddLayout'
import { SimpleDialog } from "../../content";
import useStyles from '../../../styling/CustomStyles'
import { calculateStatistics } from '../../../services/AppCalculatorsApi'
import { ProbabilityOfASeriesOfIndpendentEventsI, ProbablityOfTwoEventsI, ProbablitySolverForTwoEventsI } from '../../../types'
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
import { isNull } from 'util';

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Latex = require('react-latex');

function ProbabilityCalculator() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
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
  const [answer, setAnswer] = React.useState<boolean>(false)
  const {
    tabRoot,
    rightTabContainer,
    leftTabContainer,
    formDisplay,
    formDisplay2
  }: any = useStyles()
  // ProbabilityOfASeriesOfIndpendentEvents
  const [independentEventsInitialValues] = React.useState({
    event_a: '',
    a_repeat_times: '',
    event_b: '',
    b_repeat_times: ''
  })
  const [Result1, setResult1] = React.useState({
    probabilityOfAOccuringNTimes: 0,
    probabilityOfANotOccuring: 0,
    probabilityOfAOccuring: 0,
    probabilityOfBOccuringNTimes: 0,
    probabilityOfBNotOccuring: 0,
    probabilityOfBOccuring: 0,
    probabilityOfAOccuringNTimesAndBOccuringNTimes: 0,
    probabilityOfNeitherAnorBOccuring: 0,
    probabilityOfBothAandBOccuring: 0,
    probabilityOfAOccuringNTimesButNotB: 0,
    probabilityOfBOccuringNTimesButNotA: 0,
    probabilityOfAOccuringButNotB: 0,
    probabilityOfBOccuringButNotA: 0,
  })

  // ProbablityOfTwoEvents
  const [twoEventsInitialValues] = React.useState({
    event_a: '',
    event_b: '',
  })
  const [Result2, setResult2] = React.useState({
    prodabilityOfANotOccuring: 0,
    prodabilityOfBNotOccuring: 0,
    probabilityOfBothAandBOccuring: 0,
    probabilityThatAorBorBothOccurs: 0,
    probabilityThatAorBButNotBothOccurs: 0,
    probabilityOfNeitherAnorBOccuring: 0,
    probabilityOfAOccuringButNotB: 0,
    probabilityOfBOccuringButNotA: 0,
  })

  // ProbablitySolverForTwoEvents
  const [solverForTwoEventsInitialValues] = React.useState({
    probability_of_a: '',
    probability_of_b: '',
    probability_of_a_not_occuring: '',
    probability_of_b_not_occuring: '',
    probability_of_a_and_b_both_occuring: '',
    probability_that_a_or_b_or_both_occur: '',
    probability_that_a_or_b_occurs_but_not_both: '',
    probability_of_neither_a_nor_b_occuring: '',
  })
  const [Result3, setResult3] = React.useState({
    probability_of_a: 0,
    probability_of_b: 0,
    probability_that_a_or_b_or_both_occur: 0,
    probability_of_a_and_b_both_occuring: 0,
    probability_that_a_or_b_occurs_but_not_both: 0,
    probability_of_a_not_occuring: 0,
    probability_of_b_not_occuring: 0,
    probability_of_neither_a_nor_b_occuring: 0,
  })

  // Tab value change
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <NavBar2 pagename="Probability Calculator" />
      <AddLayout>
        <Grid
          container
          justifyContent="center"
        >
          <animated.div style={formAnimation}>
            <Box className={formDisplay2} >
              <div className={tabRoot}>
                <StyledTabs variant="fullWidth" value={tabValue} onChange={handleChange}>
                  <StyledTab
                    wrapped
                    label={CALCULATORS.probabilityOfASeriesOfIndpendentEvents}
                    {...a11yProps(0)}
                  />
                  <StyledTab
                    wrapped
                    label={CALCULATORS.probablityOfTwoEvents}
                    {...a11yProps(1)}
                  />
                  <StyledTab
                    wrapped
                    label={CALCULATORS.probablitySolverForTwoEvents}
                    {...a11yProps(2)}
                  />
                </StyledTabs>

                <TabPanel
                  value={tabValue}
                  index={0}
                >
                  <Formik
                    initialValues={independentEventsInitialValues}
                    onSubmit={async ({
                      event_a,
                      a_repeat_times,
                      event_b,
                      b_repeat_times
                    }, { setSubmitting }) => {
                      const payload: ProbabilityOfASeriesOfIndpendentEventsI = {
                        event_a,
                        a_repeat_times,
                        event_b,
                        b_repeat_times,
                        method: 'ProbabilityOfASeriesOfIndependentEvents'
                      }
                      console.log(JSON.stringify(payload))
                      try {
                        const { success, payload: probabilityOfASeriesOfIndependentEvents } = await calculateStatistics(payload)
                        console.log('=====>', probabilityOfASeriesOfIndependentEvents)
                        if (typeof probabilityOfASeriesOfIndependentEvents === 'object') {
                          const {
                            prodabilityOfAOccuringNTimes,
                            prodabilityOfANotOccuring,
                            probabilityOfAOccuring,
                            prodabilityOfBOccuringNTimes,
                            prodabilityOfBNotOccuring,
                            probabilityOfBOccuring,
                            probabilityOfAOccuringNTimesAndBOccuringNTimes,
                            probabilityOfNeitherAnorBOccuring,
                            probabilityOfBothAandBOccuring,
                            probabilityOfAOccuringNTimesButNotB,
                            probabilityOfBOccuringNTimesButNotA,
                            probabilityOfAOccuringButNotB,
                            probabilityOfBOccuringButNotA,
                          } = probabilityOfASeriesOfIndependentEvents
                          setResult1({
                            probabilityOfAOccuringNTimes: prodabilityOfAOccuringNTimes,
                            probabilityOfANotOccuring: prodabilityOfANotOccuring,
                            probabilityOfAOccuring: probabilityOfAOccuring,
                            probabilityOfBOccuringNTimes: prodabilityOfBOccuringNTimes,
                            probabilityOfBNotOccuring: prodabilityOfBNotOccuring,
                            probabilityOfBOccuring: probabilityOfBOccuring,
                            probabilityOfAOccuringNTimesAndBOccuringNTimes: probabilityOfAOccuringNTimesAndBOccuringNTimes,
                            probabilityOfNeitherAnorBOccuring: probabilityOfNeitherAnorBOccuring,
                            probabilityOfBothAandBOccuring: probabilityOfBothAandBOccuring,
                            probabilityOfAOccuringNTimesButNotB: probabilityOfAOccuringNTimesButNotB,
                            probabilityOfBOccuringNTimesButNotA: probabilityOfBOccuringNTimesButNotA,
                            probabilityOfAOccuringButNotB: probabilityOfAOccuringButNotB,
                            probabilityOfBOccuringButNotA: probabilityOfBOccuringButNotA,
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
                          <Label title={LABELS.eventA} />
                          <CustomTextInput
                            type={null}
                            id="event_a"
                            placeholder={PLACEHOLDERS.number}
                            value={values.event_a}
                            onChange={handleChange}
                          />

                          <Label title={LABELS.aRepeatTimes} />
                          <CustomTextInput
                            type={null}
                            id="a_repeat_times"
                            placeholder={PLACEHOLDERS.number}
                            value={values.a_repeat_times}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.eventB} />
                          <CustomTextInput
                            type={null}
                            id="event_b"
                            placeholder={PLACEHOLDERS.number}
                            value={values.event_b}
                            onChange={handleChange}
                          />

                          <Label title={LABELS.bRepeatTimes} />
                          <CustomTextInput
                            type={null}
                            id="b_repeat_times"
                            placeholder={PLACEHOLDERS.number}
                            value={values.b_repeat_times}
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
                </TabPanel>

                <TabPanel
                  value={tabValue}
                  index={1}
                >
                  <Formik
                    initialValues={twoEventsInitialValues}
                    onSubmit={async ({
                      event_a,
                      event_b,
                    }, { setSubmitting }) => {
                      const payload: ProbablityOfTwoEventsI = {
                        event_a,
                        event_b,
                        method: 'ProbabilityOfTwoEvents'
                      }
                      console.log(JSON.stringify(payload))
                      try {
                        const { success, payload: probabilityOfTwoEvents } = await calculateStatistics(payload)
                        console.log('=====>', probabilityOfTwoEvents)
                        const {
                          prodabilityOfANotOccuring,
                          prodabilityOfBNotOccuring,
                          probabilityOfBothAandBOccuring,
                          probabilityThatAorBorBothOccurs,
                          probabilityThatAorBButNotBothOccurs,
                          probabilityOfNeitherAnorBOccuring,
                          probabilityOfAOccuringButNotB,
                          probabilityOfBOccuringButNotA,
                        } = probabilityOfTwoEvents
                        if (typeof probabilityOfTwoEvents === 'object') {
                          setResult2({
                            prodabilityOfANotOccuring,
                            prodabilityOfBNotOccuring,
                            probabilityOfBothAandBOccuring,
                            probabilityThatAorBorBothOccurs,
                            probabilityThatAorBButNotBothOccurs,
                            probabilityOfNeitherAnorBOccuring,
                            probabilityOfAOccuringButNotB,
                            probabilityOfBOccuringButNotA,
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
                          <Label title={LABELS.eventA} />
                          <CustomTextInput
                            type={null}
                            id="event_a"
                            placeholder={PLACEHOLDERS.number}
                            value={values.event_a}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.eventB} />
                          <CustomTextInput
                            type={null}
                            id="event_b"
                            placeholder={PLACEHOLDERS.number}
                            value={values.event_b}
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
                  index={2}
                >
                  <Formik
                    initialValues={solverForTwoEventsInitialValues}
                    onSubmit={async ({
                      probability_of_a,
                      probability_of_b,
                      probability_of_a_not_occuring,
                      probability_of_b_not_occuring,
                      probability_of_a_and_b_both_occuring,
                      probability_that_a_or_b_or_both_occur,
                      probability_that_a_or_b_occurs_but_not_both,
                      probability_of_neither_a_nor_b_occuring,
                    }, { setSubmitting, resetForm }) => {
                      const payload: ProbablitySolverForTwoEventsI = {
                        probability_of_a,
                        probability_of_b,
                        probability_of_a_not_occuring,
                        probability_of_b_not_occuring,
                        probability_of_a_and_b_both_occuring,
                        probability_that_a_or_b_or_both_occur,
                        probability_that_a_or_b_occurs_but_not_both,
                        probability_of_neither_a_nor_b_occuring,
                        method: 'ProbabilitySolverForTwoEvents'
                      }
                      console.log(JSON.stringify(payload))
                      try {
                        const { success, payload: probabilitySolverForTwoEvents } = await calculateStatistics(payload)
                        console.log('=====>', probabilitySolverForTwoEvents)
                        const {
                          probability_of_a,
                          probability_of_b,
                          probability_of_a_not_occuring,
                          probability_of_b_not_occuring,
                          probability_of_a_and_b_both_occuring,
                          probability_that_a_or_b_or_both_occur,
                          probability_that_a_or_b_occurs_but_not_both,
                          probability_of_neither_a_nor_b_occuring,
                        } = probabilitySolverForTwoEvents

                        if (typeof probabilitySolverForTwoEvents === 'object') {
                          setResult3({
                            probability_of_a,
                            probability_of_b,
                            probability_of_a_not_occuring,
                            probability_of_b_not_occuring,
                            probability_of_a_and_b_both_occuring,
                            probability_that_a_or_b_or_both_occur,
                            probability_that_a_or_b_occurs_but_not_both,
                            probability_of_neither_a_nor_b_occuring,
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
                          <Label title={LABELS.probabilityOfA} />
                          <CustomTextInput
                            type={null}
                            id="probability_of_a"
                            placeholder={PLACEHOLDERS.number}
                            value={values.probability_of_a}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.probabilityOfB} />
                          <CustomTextInput
                            type={null}
                            id="probability_of_b"
                            placeholder={PLACEHOLDERS.number}
                            value={values.probability_of_b}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.probabilityOfANotOccuring} />
                          <CustomTextInput
                            type={null}
                            id="probability_of_a_not_occuring"
                            placeholder={PLACEHOLDERS.number}
                            value={values.probability_of_a_not_occuring}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.probabilityOfBNotOccuring} />
                          <CustomTextInput
                            type={null}
                            id="probability_of_b_not_occuring"
                            placeholder={PLACEHOLDERS.number}
                            value={values.probability_of_b_not_occuring}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.probabilityOfAAndBBothOccuring} />
                          <CustomTextInput
                            type={null}
                            id="probability_of_a_and_b_both_occuring"
                            placeholder={PLACEHOLDERS.number}
                            value={values.probability_of_a_and_b_both_occuring}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.probabilityThatAOrBOrBothOccur} />
                          <CustomTextInput
                            type={null}
                            id="probability_that_a_or_b_or_both_occur"
                            placeholder={PLACEHOLDERS.number}
                            value={values.probability_that_a_or_b_or_both_occur}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.probabilityThatAOrBOccursButNotBoth} />
                          <CustomTextInput
                            type={null}
                            id="probability_that_a_or_b_occurs_but_not_both"
                            placeholder={PLACEHOLDERS.number}
                            value={values.probability_that_a_or_b_occurs_but_not_both}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.probabilityOfNeitherANorBOccuring} />
                          <CustomTextInput
                            type={null}
                            id="probability_of_neither_a_nor_b_occuring"
                            placeholder={PLACEHOLDERS.number}
                            value={values.probability_of_neither_a_nor_b_occuring}
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
                </TabPanel>
              </div>
            </Box>
          </animated.div>

          {answer === true &&
            <ResultTabsContainer
              tabTitle={'Result'}
              animation={resultAnimation}
            >

              <Box className="text-wrap ">
                {tabValue === 0 &&
                  <Box sx={{ color: COLORS.text }}>
                    <Typography variant="subtitle1">
                      Probability of A occuring N times: {Result1.probabilityOfAOccuringNTimes}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of A not occuring: {Result1.probabilityOfANotOccuring}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of A occuring: {Result1.probabilityOfAOccuring}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of B occuring N times: {Result1.probabilityOfBOccuringNTimes}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of B not occuring: {Result1.probabilityOfBNotOccuring}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of B occuring: {Result1.probabilityOfBOccuring}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of A occuring N times and B occuring N times: {Result1.probabilityOfAOccuringNTimesAndBOccuringNTimes}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of neither A nor B occuring: {Result1.probabilityOfNeitherAnorBOccuring}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of both A and B occuring: {Result1.probabilityOfBothAandBOccuring}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of A occuring N times but not B: {Result1.probabilityOfAOccuringNTimesButNotB}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of B occuring N times but not A: {Result1.probabilityOfBOccuringNTimesButNotA}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of A occuring but not B: {Result1.probabilityOfAOccuringButNotB}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of B occuring but not A: {Result1.probabilityOfBOccuringButNotA}
                    </Typography>
                  </Box>
                }

                {tabValue === 1 &&
                  <Box sx={{ color: COLORS.text }}>
                    <Typography variant="subtitle1">
                      Probability of A not occurring: {Result2.prodabilityOfANotOccuring}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of B not occurring: {Result2.prodabilityOfBNotOccuring}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of both A and B occurring: {Result2.probabilityOfBothAandBOccuring}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability that A or B or both occurs: {Result2.probabilityThatAorBorBothOccurs}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability that A or B but not both occurs: {Result2.probabilityThatAorBButNotBothOccurs}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of neither A nor B occurring: {Result2.probabilityOfNeitherAnorBOccuring}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of A occurring but not B: {Result2.probabilityOfAOccuringButNotB}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of B occurring but not A: {Result2.probabilityOfBOccuringButNotA}
                    </Typography>
                  </Box>
                }

                {tabValue === 2 &&
                  <Box sx={{ color: COLORS.text }}>
                    <Typography variant="subtitle1">
                      Probability of A: {Result3.probability_of_a}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of B: {Result3.probability_of_b}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability that A or B both occur: {Result3.probability_that_a_or_b_or_both_occur}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability that A or B occurs but not both: {Result3.probability_that_a_or_b_occurs_but_not_both}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of A not occurring: {Result3.probability_of_a_not_occuring}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of B not occurring: {Result3.probability_of_b_not_occuring}
                    </Typography>
                    <Typography variant="subtitle1">
                      Probability of neither A nor B occurring: {Result3.probability_of_neither_a_nor_b_occuring}
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

export default ProbabilityCalculator
