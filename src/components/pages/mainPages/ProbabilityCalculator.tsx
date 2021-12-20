import React from 'react'
import { Formik } from 'formik'
import { Typography, Box, Grid, Paper } from '@material-ui/core'
import Anime from 'react-animejs-wrapper'

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

function ProbabilityCalculator() {
  const {
    tabRoot,
    rightTabContainer,
    leftTabContainer,
    paperBackground,
    formContainer
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
    probability: 0,
    unit: ''
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
    probability: 0,
    unit: ''
  })

  // Tab value change
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  // Animation
  const [value, setValue] = React.useState<any>()
  const animatedSquaresRef1 = React.useRef()
  const animatedSquaresRef2 = React.createRef()
  // @ts-ignore: Object is possibly 'null'.
  const playForm = () => animatedSquaresRef1.current.play();
  // @ts-ignore: Object is possibly 'null'.
  const playResult = () => animatedSquaresRef2.current.play();

  /*  React.useEffect(() => {
     if (value) {
       playForm();
       playResult();
     }
     return () => { }
   }, []) */

  return (
    <>
      <NavBar2 pagename="Probability Calculator" />
      <AddLayout>
        <div className='d-flex flex-row justify-content-center'>
          <Anime
            style={{
              // position: 'absolute',
              borderRadius: 20
            }}
            ref={animatedSquaresRef1}
            config={{
              translateX: 200,
              easing: 'easeInOutSine',
              autoplay: false,
              duration: 250
            }}
          >
            <Paper className={paperBackground}>
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
                          playForm()
                          playResult()
                        }
                        console.log("VALUE: ", value)
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
                            type={INPUT_TYPE.number}
                            id="event_a"
                            placeholder={PLACEHOLDERS.number}
                            value={values.event_a}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.aRepeatTimes} />
                          <CustomTextInput
                            type={INPUT_TYPE.number}
                            id="a_repeat_times"
                            placeholder={PLACEHOLDERS.number}
                            value={values.a_repeat_times}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.eventB} />
                          <CustomTextInput
                            type={INPUT_TYPE.number}
                            id="event_b"
                            placeholder={PLACEHOLDERS.number}
                            value={values.event_b}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.bRepeatTimes} />
                          <CustomTextInput
                            type={INPUT_TYPE.number}
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
                        const { payload: probabilityOfTwoEvents } = await calculateStatistics(payload)
                        console.log('=====>', probabilityOfTwoEvents)
                        const { probability, unit } = probabilityOfTwoEvents
                        if (typeof probabilityOfTwoEvents === 'object') {
                          setResult2({
                            probability: probability,
                            unit: unit
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
                            type={INPUT_TYPE.number}
                            id="event_a"
                            placeholder={PLACEHOLDERS.number}
                            value={values.event_a}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.eventB} />
                          <CustomTextInput
                            type={INPUT_TYPE.number}
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
                        const { payload: probabilitySolverForTwoEvents } = await calculateStatistics(payload)
                        console.log('=====>', probabilitySolverForTwoEvents)
                        const { probability, unit } = probabilitySolverForTwoEvents
                        if (typeof probabilitySolverForTwoEvents === 'object') {
                          setResult3({
                            probability: probability,
                            unit: unit
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
                            type={INPUT_TYPE.number}
                            id="probability_of_a"
                            placeholder={PLACEHOLDERS.number}
                            value={values.probability_of_a}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.probabilityOfB} />
                          <CustomTextInput
                            type={INPUT_TYPE.number}
                            id="probability_of_b"
                            placeholder={PLACEHOLDERS.number}
                            value={values.probability_of_b}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.probabilityOfANotOccuring} />
                          <CustomTextInput
                            type={INPUT_TYPE.number}
                            id="probability_of_a_not_occuring"
                            placeholder={PLACEHOLDERS.number}
                            value={values.probability_of_a_not_occuring}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.probabilityOfBNotOccuring} />
                          <CustomTextInput
                            type={INPUT_TYPE.number}
                            id="probability_of_b_not_occuring"
                            placeholder={PLACEHOLDERS.number}
                            value={values.probability_of_b_not_occuring}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.probabilityOfAAndBBothOccuring} />
                          <CustomTextInput
                            type={INPUT_TYPE.number}
                            id="probability_of_a_and_b_both_occuring"
                            placeholder={PLACEHOLDERS.number}
                            value={values.probability_of_a_and_b_both_occuring}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.probabilityThatAOrBOrBothOccur} />
                          <CustomTextInput
                            type={INPUT_TYPE.number}
                            id="probability_that_a_or_b_or_both_occur"
                            placeholder={PLACEHOLDERS.number}
                            value={values.probability_that_a_or_b_or_both_occur}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.probabilityThatAOrBOccursButNotBoth} />
                          <CustomTextInput
                            type={INPUT_TYPE.number}
                            id="probability_that_a_or_b_occurs_but_not_both"
                            placeholder={PLACEHOLDERS.number}
                            value={values.probability_that_a_or_b_occurs_but_not_both}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-row">
                          <Label title={LABELS.probabilityOfNeitherANorBOccuring} />
                          <CustomTextInput
                            type={INPUT_TYPE.number}
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
            </Paper>
          </Anime>

          <ResultTabsContainer
            tabTitle={'Result'}
            sm={5}
            ref={animatedSquaresRef2}
            config={{
              translateX: 250,
              easing: 'easeInOutSine',
              autoplay: false,
              duration: 250
            }}
          >
            <div className="text-wrap">
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
                    Probability2: {Result2.probability}{Result2.unit}
                  </Typography>
                </Box>
              }

              {tabValue === 2 &&
                <Box sx={{ color: COLORS.text }}>
                  <Typography variant="subtitle1">
                    Probability3: {Result3.probability}{Result3.unit}
                  </Typography>
                </Box>
              }
            </div>
          </ResultTabsContainer>
        </div>
      </AddLayout>
    </>
  )
}

export default ProbabilityCalculator
