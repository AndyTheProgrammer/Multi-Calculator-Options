import React from 'react'
import { Typography, Box, Grid, Paper } from '@mui/material'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../../navbar/navbar2'
import AddLayout from '../../../../layouts/AddLayout'
import { ElapsedTimeMethodI, TrapSpeedMethodI } from '../../../../../types'
import { calculateOthers } from '../../../../../services/AppCalculatorsApi'
import useStyles from '../../../../../styling/CustomStyles'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  COLORS,
  LATEX,
} from '../../../../../common/shared'
import {
  CustomTextInput,
  Label,
  FormRow,
  FormTabsContainer,
  ResultTabsContainer,
  StyledTab,
  StyledTabs,
  TabPanel,
  CustomSelect,
} from '../../../../custom'
import {
  other_icon,
  transport_util_icon,
} from "../../../../../common/assets"

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Latex = require('react-latex');

function EngineHorsepowerCalculator() {
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
    formDisplay,
  }: any = useStyles();

  const [trapSpeedInitialValues] = React.useState({
    weight: "",
    weight_unit: "",
    speed: "",
    speed_unit: "",
  });

  const [elapsedTimeInitialValues] = React.useState({
    weight: "",
    weight_unit: "",
    time: "",
    time_unit: "",
  });

  const [trapSpeedResult, setTrapSpeedResult] = React.useState({
    horsePower: 0,
    weight: 0,
    speed: 0,
    unit: '',
  });

  const [elapsedTimeResult, setElapsedTimeResult] = React.useState({
    weight: 0,
    time: 0,
    horsePower: 0,
  });

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <NavBar2
        pageimage={other_icon}
        categoryname="Transport and Utility Calculators"
        pagename="Engine Horsepower Calculator"
      />
      <AddLayout
        categorykey='transport'
        searchname='Ttansport and Utility Calculators'
        searchimage={transport_util_icon}
      >
        <Grid
          container
          justifyContent="center"
        >
          {/* Form */}
          <animated.div style={formAnimation}>
            <Box className={formDisplay} >
              <StyledTabs variant="fullWidth" value={tabValue} onChange={handleChange}>
                <StyledTab
                  wrapped
                  label={CALCULATORS.elapsedTimeMethod}
                  {...a11yProps(0)}
                />
                <StyledTab
                  wrapped
                  label={CALCULATORS.trapSpeedMethod}
                  {...a11yProps(1)}
                />
              </StyledTabs>

              <TabPanel
                value={tabValue}
                index={0}
              >
                <Formik
                  initialValues={elapsedTimeInitialValues}
                  onSubmit={async ({
                    weight,
                    weight_unit,
                    time,
                    time_unit,
                  }, { setSubmitting, resetForm }) => {
                    const payload: ElapsedTimeMethodI = {
                      weight,
                      weight_unit,
                      time,
                      time_unit,
                      method: 'TheElapsedTimeMethod'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: elapsedTimeMethod } = await calculateOthers(payload)
                      console.log('=====>', elapsedTimeMethod)
                      const {
                        weight,
                        time,
                        horsePower,
                      } = elapsedTimeMethod
                      if (typeof elapsedTimeMethod === 'object') {
                        setElapsedTimeResult({
                          weight: weight,
                          time: time,
                          horsePower: horsePower
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
                      </FormRow>

                      <FormRow>
                        <Label title={LABELS.time} />
                        <CustomTextInput
                          type={INPUT_TYPE.text}
                          id="time"
                          placeholder={PLACEHOLDERS.number}
                          value={values.time}
                          onChange={handleChange}
                        />

                        <CustomSelect
                          id="time_unit"
                          measurement="time"
                          value={values.time_unit}
                          onChange={handleChange('time_unit')}
                        />
                      </FormRow>

                      <FormRow buttons reset={() => resetForm()} />
                    </form>
                  )}
                </Formik>
              </TabPanel>

              <TabPanel
                value={tabValue}
                index={1}
              >
                <Formik
                  initialValues={trapSpeedInitialValues}
                  onSubmit={async ({
                    weight,
                    weight_unit,
                    speed,
                    speed_unit,
                  }, { setSubmitting }) => {
                    const payload: TrapSpeedMethodI = {
                      weight,
                      weight_unit,
                      speed,
                      speed_unit,
                      method: 'TheTrapSpeedMethod'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: trapSpeedMethod } = await calculateOthers(payload)
                      console.log('=====>', trapSpeedMethod)
                      const {
                        horsePower,
                        unit,
                        weight,
                        speed,
                      } = trapSpeedMethod
                      if (typeof trapSpeedMethod === 'object') {
                        setTrapSpeedResult({
                          horsePower: horsePower,
                          weight: weight,
                          speed: speed,
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
                      <FormRow>
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
                      </FormRow>

                      <FormRow>
                        <Label title={LABELS.speed} />
                        <CustomTextInput
                          type={INPUT_TYPE.text}
                          id="speed"
                          placeholder={PLACEHOLDERS.number}
                          value={values.speed}
                          onChange={handleChange}
                        />

                        <CustomSelect
                          id="speed_unit"
                          measurement="speed"
                          value={values.speed_unit}
                          onChange={handleChange('speed_unit')}
                        />
                      </FormRow>

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

              <Box className="text-wrap text-center">
                {tabValue === 0 &&
                  <Box sx={{ color: COLORS.text }}>
                    <Latex displayMode={true}>{LATEX.elapsedTimeMethod}</Latex>
                    <Typography variant="subtitle1">
                      Engine Horsepower: {elapsedTimeResult.horsePower}
                    </Typography>
                  </Box>
                }

                {tabValue === 1 &&
                  <Box sx={{ color: COLORS.text }}>
                    <Latex displayMode={true}>{LATEX.trapSpeed}</Latex>
                    <Typography variant="subtitle1">
                      Engine Horsepower: {trapSpeedResult.horsePower}{trapSpeedResult.unit}
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

export default EngineHorsepowerCalculator
