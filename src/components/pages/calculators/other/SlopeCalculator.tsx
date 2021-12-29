import React from 'react'
import { Typography, Box, Grid, Paper } from '@mui/material'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../navbar/navbar2'
import AddLayout from '../../../layouts/AddLayout'
import { SlopeCalculatorForTwoKnownPointsI, SinglePointWithKnownSlopeI } from '../../../../types'
import { calculateMath } from '../../../../services/AppCalculatorsApi'
import useStyles from '../../../../styling/CustomStyles'
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
  FormTabsContainer,
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

function SlopeCalculator() {
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
  const [tabValue, setTabValue] = React.useState(0);
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)
  const {
    tabRoot,
    rightTabContainer,
    leftTabContainer,
    formDisplay,
    formDisplay2
  }: any = useStyles()

  const [twoKnownPointsInitialValues] = React.useState({
    y_1: '',
    y_2: '',
    x_1: '',
    x_2: '',
  })

  const [singleKnownPointInitialValues] = React.useState({
    x_1: '',
    y_1: '',
    slope: '',
    distance: ''
  })

  const [twoKnownPointsResult, settwoKnownPointsResult] = React.useState({
    slope: 0,
    distance: 0,
    angle: 0,
  })

  const [singleKnownPointResult, setSingleKnownPointResult] = React.useState({
    x_2: 0,
    y_2: 0,
    Δx: 0,
    Δy: 0,
    angle: 0,
    left_x_2: 0,
    left_y_2: 0,
    left_Δx: 0,
    left_Δy: 0,
    angle_left: 0,
    angle_unit: '',
  })

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <>
      <NavBar2 pagename="Slope Calculator" />
      <AddLayout>
        <Grid
          container
          justifyContent="center"
        >
          <animated.div style={formAnimation}>
            <Box className={formDisplay2} >
              <StyledTabs variant="fullWidth" value={tabValue} onChange={handleChange}>
                <StyledTab
                  wrapped
                  label={CALCULATORS.slopeCalculatorWithASingleKnownPoint}
                  {...a11yProps(0)}
                />
                <StyledTab
                  wrapped
                  label={CALCULATORS.slopeCalculatorForTwoKnownPoints}
                  {...a11yProps(1)}
                />
              </StyledTabs>

              <TabPanel
                value={tabValue}
                index={0}
              >
                <Formik
                  initialValues={singleKnownPointInitialValues}
                  onSubmit={async ({
                    x_1,
                    y_1,
                    slope,
                    distance
                  }, { setSubmitting }) => {
                    const payload: SinglePointWithKnownSlopeI = {
                      x_1,
                      y_1,
                      slope,
                      distance,
                      method: 'If1PointAndTheSlopeAreKnown'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: singlePointWithKnowPoint } = await calculateMath(payload)
                      console.log('=====>', singlePointWithKnowPoint)
                      if (typeof singlePointWithKnowPoint === 'object') {
                        const {
                          x_2,
                          y_2,
                          Δx,
                          Δy,
                          angel,
                          left_x_2,
                          left_y_2,
                          left_Δx,
                          left_Δy,
                          angle_left,
                        } = singlePointWithKnowPoint
                        setSingleKnownPointResult({
                          x_2: x_2,
                          y_2: y_2,
                          Δx: Δx,
                          Δy: Δy,
                          angle: angel,
                          left_x_2: left_x_2,
                          left_y_2: left_y_2,
                          left_Δx: left_Δx,
                          left_Δy: left_Δy,
                          angle_left: angle_left,
                          angle_unit: '°'
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
                        <Label title={LABELS.x1} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="x_1"
                          placeholder={PLACEHOLDERS.number}
                          value={values.x_1}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.y1} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="y_1"
                          placeholder={PLACEHOLDERS.number}
                          value={values.y_1}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.distance} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="distance"
                          placeholder={PLACEHOLDERS.number}
                          value={values.distance}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.slope} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="slope"
                          placeholder={PLACEHOLDERS.number}
                          value={values.slope}
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
                  initialValues={twoKnownPointsInitialValues}
                  onSubmit={async ({
                    y_1,
                    y_2,
                    x_1,
                    x_2,
                  }, { setSubmitting }) => {
                    const payload: SlopeCalculatorForTwoKnownPointsI = {
                      y_1,
                      y_2,
                      x_1,
                      x_2,
                      method: 'IfThe2PointsAreKnownSlopeCalculator'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: slopeWithTwoKnownPoints } = await calculateMath(payload)
                      console.log('=====>', slopeWithTwoKnownPoints)
                      const { d, m, angle, } = slopeWithTwoKnownPoints
                      if (typeof slopeWithTwoKnownPoints === 'object') {
                        settwoKnownPointsResult({
                          slope: m,
                          distance: d,
                          angle: angle,
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
                        <Label title={LABELS.x1} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="x_1"
                          placeholder={PLACEHOLDERS.number}
                          value={values.x_1}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.y1} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="y_1"
                          placeholder={PLACEHOLDERS.number}
                          value={values.y_1}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.x2} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="x_2"
                          placeholder={PLACEHOLDERS.number}
                          value={values.x_2}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.y2} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="y_2"
                          placeholder={PLACEHOLDERS.number}
                          value={values.y_2}
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

          {answer === true &&
            <ResultTabsContainer
              tabTitle={'Result'}
              animation={resultAnimation}
            >
              <Box className="text-wrap">
                {tabValue === 0 &&
                  <Box sx={{ color: COLORS.text }}>
                    <div className="mb-3">
                      <Typography variant="subtitle1">
                        X2: {singleKnownPointResult.x_2}
                      </Typography>
                      <Typography variant="subtitle1">
                        Y2: {singleKnownPointResult.y_2}
                      </Typography>
                      <Typography variant="subtitle1">
                        ΔX: {singleKnownPointResult.Δx}
                      </Typography>
                      <Typography variant="subtitle1">
                        ΔY: {singleKnownPointResult.Δy}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        θ: {singleKnownPointResult.angle}{singleKnownPointResult.angle_unit}
                      </Typography>

                      <Typography variant="subtitle1" component='h6' gutterBottom>or</Typography>

                      <Typography variant="subtitle1">
                        X2: {singleKnownPointResult.left_x_2}
                      </Typography>
                      <Typography variant="subtitle1">
                        Y2: {singleKnownPointResult.left_y_2}
                      </Typography>
                      <Typography variant="subtitle1">
                        ΔX: {singleKnownPointResult.left_Δx}
                      </Typography>
                      <Typography variant="subtitle1">
                        ΔY: {singleKnownPointResult.left_Δy}
                      </Typography>
                      <Typography variant="subtitle1">
                        θ: {singleKnownPointResult.angle_left}{singleKnownPointResult.angle_unit}
                      </Typography>
                    </div>
                  </Box>
                }

                {tabValue === 1 &&
                  <Box sx={{ color: COLORS.text }}>
                    <Typography variant="subtitle1">
                      Slope: {twoKnownPointsResult.slope}
                    </Typography>

                    <Typography variant="subtitle1">
                      Distance: {twoKnownPointsResult.distance}
                    </Typography>

                    <Typography variant="subtitle1">
                      Angle: {twoKnownPointsResult.angle}
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

export default SlopeCalculator
