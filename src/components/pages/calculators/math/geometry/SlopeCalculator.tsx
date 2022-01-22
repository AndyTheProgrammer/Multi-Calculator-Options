import React from 'react'
import { Typography, Box, Grid, } from '@mui/material'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../../navbar/navbar2'
import AddLayout from '../../../../layouts/AddLayout'
import {
  SlopeCalculatorForTwoKnownPointsI,
  SinglePointWithKnownSlopeI
} from '../../../../../types'
import { calculateMath } from '../../../../../services/AppCalculatorsApi'
import useStyles from '../../../../../styling/CustomStyles'
import { geometry_icon, math_icon } from '../../../../../common/assets';
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  COLORS,
  LATEX,
  GEOMETRY_PLACEHOLDERS,
  SIZES,
} from '../../../../../common/shared'
import {
  CustomTextInput,
  Label,
  FormRow,
  ResultTabsContainer,
  StyledTab,
  StyledTabs,
  TabPanel,
  PlaceHolder,
  Image,
  FieldContainer,
} from '../../../../custom'

const Latex = require('react-latex');

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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
    formDisplay2
  }: any = useStyles()

  const [twoKnownPointsInitialValues] = React.useState({
    y_1: '1',
    y_2: '2',
    x_1: '1',
    x_2: '2',
  })

  const [singleKnownPointInitialValues] = React.useState({
    x_1: '1',
    y_1: '1',
    slope: '0.75',
    distance: '5'
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
      <NavBar2
        pageimage={math_icon}
        categoryname="Geometry Calculators"
        pagename="Slope Calculator"
      />
      <AddLayout
        categorykey='geometry'
        searchname='Geometry Calculators'
        searchimage={geometry_icon}
      >
        <Grid
          container
          justifyContent="center"
        >
          {tabValue === 0 &&
            <PlaceHolder
              placeHolder={GEOMETRY_PLACEHOLDERS.singleKnownPointSlope}
            />
          }

          {tabValue === 1 &&
            <PlaceHolder
              placeHolder={GEOMETRY_PLACEHOLDERS.twoKnownPointsSlope}
            />
          }

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
                <Typography
                  className='text-center mb-2'
                  sx={{ fontSize: SIZES.defaultFont }}
                >
                  <Latex displayMode={false}>
                    {`$m = \\ \\frac{y_2 - y_1}{x_2 - x_1} = tan (\\theta)$`}
                  </Latex>
                </Typography>

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
                      <FieldContainer>
                        <FormRow>
                          <Label title={LABELS.x1} />
                          <CustomTextInput
                            col
                            type={INPUT_TYPE.text}
                            id="x_1"
                            placeholder={PLACEHOLDERS.number}
                            value={values.x_1}
                            onChange={handleChange}
                          />
                        </FormRow>

                        <FormRow>
                          <Label title={LABELS.y1} />
                          <CustomTextInput
                            col
                            type={INPUT_TYPE.text}
                            id="y_1"
                            placeholder={PLACEHOLDERS.number}
                            value={values.y_1}
                            onChange={handleChange}
                          />
                        </FormRow>

                        <FormRow>
                          <Label title={LABELS.distance} />
                          <CustomTextInput
                            col
                            type={INPUT_TYPE.text}
                            id="distance"
                            placeholder={PLACEHOLDERS.number}
                            value={values.distance}
                            onChange={handleChange}
                          />
                        </FormRow>

                        <FormRow>
                          <Label title={LABELS.slope} />
                          <CustomTextInput
                            col
                            type={INPUT_TYPE.text}
                            id="slope"
                            placeholder={PLACEHOLDERS.number}
                            value={values.slope}
                            onChange={handleChange}
                          />
                        </FormRow>
                      </FieldContainer>

                      <FormRow buttons reset={() => resetForm()} />
                    </form>
                  )}
                </Formik>
              </TabPanel>

              <TabPanel
                value={tabValue}
                index={1}
              >
                <Typography
                  className='text-center mb-2'
                  sx={{ fontSize: SIZES.defaultFont }}
                >
                  <Latex displayMode={false}>
                    {`$m = \\ \\frac{y_2 - y_1}{x_2 - x_1} = tan (\\theta$)`}
                  </Latex>
                </Typography>

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

                      // data returned is in an array!!!
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
                      <FieldContainer>
                        <FormRow>
                          <Label title={LABELS.x1} />
                          <CustomTextInput
                            col
                            type={INPUT_TYPE.text}
                            id="x_1"
                            placeholder={PLACEHOLDERS.number}
                            value={values.x_1}
                            onChange={handleChange}
                          />
                        </FormRow>

                        <FormRow>
                          <Label title={LABELS.y1} />
                          <CustomTextInput
                            col
                            type={INPUT_TYPE.text}
                            id="y_1"
                            placeholder={PLACEHOLDERS.number}
                            value={values.y_1}
                            onChange={handleChange}
                          />
                        </FormRow>

                        <FormRow>
                          <Label title={LABELS.x2} />
                          <CustomTextInput
                            col
                            type={INPUT_TYPE.text}
                            id="x_2"
                            placeholder={PLACEHOLDERS.number}
                            value={values.x_2}
                            onChange={handleChange}
                          />
                        </FormRow>

                        <FormRow>
                          <Label title={LABELS.y2} />
                          <CustomTextInput
                            col
                            type={INPUT_TYPE.text}
                            id="y_2"
                            placeholder={PLACEHOLDERS.number}
                            value={values.y_2}
                            onChange={handleChange}
                          />
                        </FormRow>
                      </FieldContainer>

                      <FormRow buttons reset={() => resetForm()} />
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
                  <Box>
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

                  </Box>
                }

                {tabValue === 1 &&
                  <Box>
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
