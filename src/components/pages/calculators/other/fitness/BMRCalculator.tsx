import React from 'react'
import { Formik } from 'formik'
import { Typography, Box, Grid, Paper } from '@mui/material'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../../navbar/navbar2'
import AddLayout from '../../../../layouts/AddLayout'
import useStyles from '../../../../../styling/CustomStyles'
import { calculateOthers } from '../../../../../services/AppCalculatorsApi'
import { BMRKatchMcArdleI, BmrMifflinHarrisBenedictI, BmrMifflinJeorEquationI } from '../../../../../types'
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
  ResultTabsContainer,
  StyledTabForThree,
  StyledTabs,
  TabPanel,
  CustomSelect,
} from '../../../../custom'
import {
  other_icon,
  fitness_calc_icon,
} from "../../../../../common/assets"

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Latex = require('react-latex');

function BMRCalculator() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [formAnimation, formApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(0px)' : 'translateX(0px)',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [resultAnimation, resultApi] = useSpring(() => ({
    transform: matches === true ? 'translateY(-200px)' : 'translateX(-210px)',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [answer, setAnswer] = React.useState<boolean>(false);
  const [tabValue, setTabValue] = React.useState(0);
  const {
    formDisplay,
    formDisplay2
  }: any = useStyles()

  const [mcArdleInitialValues] = React.useState({
    fat: '',
    weight: '',
    weight_unit: ''
  })
  const [mcArdleResult, setMcArdleResult] = React.useState({
    BMR: 0,
    unit: ''
  })

  const [harrisInitialValues] = React.useState({
    height: '',
    height_unit: '',
    weight: '',
    weight_unit: '',
    gender: '',
    age: 0
  })
  const [harrisResult, setHarrisResult] = React.useState({
    BMR: 0,
    unit: ''
  })

  const [jeorInitialValues] = React.useState({
    height: '',
    height_unit: '',
    weight: '',
    weight_unit: '',
    gender: '',
    age: 0
  })
  const [jeorResult, setJeorResult] = React.useState({
    step1: 0,
    step2: 0,
    step3: 0,
    BMR: 0,
    unit: ''
  })

  // Tab value change
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <NavBar2
        pageimage={other_icon}
        categoryname="Fintness Calculators"
        pagename="BMR Calculator"
      />
      <AddLayout
        categorykey='fitness'
        searchname='Fitness Calculators'
        searchimage={fitness_calc_icon}
      >
        <Grid
          container
          justifyContent="center"
        >
          <animated.div style={formAnimation}>
            <Box className={formDisplay2} >
              <StyledTabs variant="fullWidth" value={tabValue} onChange={handleChange}>
                <StyledTabForThree
                  wrapped
                  label={CALCULATORS.bmrKatchMcArdle}
                  {...a11yProps(0)}
                />
                <StyledTabForThree
                  wrapped
                  label={CALCULATORS.bmrHarrisBenedict}
                  {...a11yProps(1)}
                />
                <StyledTabForThree
                  wrapped
                  label={CALCULATORS.bmrMifflinStJeorEquation}
                  {...a11yProps(2)}
                />
              </StyledTabs>

              <TabPanel
                value={tabValue}
                index={0}
              >
                <Formik
                  initialValues={mcArdleInitialValues}
                  onSubmit={async ({
                    fat,
                    weight,
                    weight_unit
                  }, { setSubmitting, resetForm }) => {
                    const payload: BMRKatchMcArdleI = {
                      fat,
                      weight,
                      weight_unit,
                      method: 'BMRKatchMcArdle'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: katchMcArdle } = await calculateOthers(payload)
                      console.log('=====>', katchMcArdle)
                      if (typeof katchMcArdle === 'object') {
                        const { BMR, unit } = katchMcArdle
                        setMcArdleResult({
                          BMR: BMR,
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
                        <Label title={LABELS.fat} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="fat"
                          placeholder={PLACEHOLDERS.number}
                          value={values.fat}
                          onChange={handleChange}
                        />
                      </FormRow>

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
                  initialValues={harrisInitialValues}
                  onSubmit={async ({
                    height,
                    height_unit,
                    weight,
                    weight_unit,
                    gender,
                    age,
                  }, { setSubmitting, resetForm }) => {
                    const payload: BmrMifflinHarrisBenedictI = {
                      height,
                      height_unit,
                      weight,
                      weight_unit,
                      gender,
                      age,
                      method: 'BMRHarrisBenedict'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: MifflinHarris } = await calculateOthers(payload)
                      console.log('=====>', MifflinHarris)
                      if (typeof MifflinHarris === 'object') {
                        const { BMR, unit } = MifflinHarris
                        setHarrisResult({
                          BMR: BMR,
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
                      </FormRow>

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
                        <Label title={LABELS.gender} />
                        <CustomSelect
                          id="gender"
                          measurement="gender"
                          value={values.gender}
                          onChange={handleChange('gender')}
                        />
                      </FormRow>

                      <FormRow>
                        <Label title={LABELS.age} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="age"
                          placeholder={PLACEHOLDERS.number}
                          value={values.age}
                          onChange={handleChange}
                        />
                      </FormRow>

                      <FormRow buttons reset={() => resetForm()} />
                    </form>
                  )}
                </Formik>
              </TabPanel>

              <TabPanel
                value={tabValue}
                index={2}
              >
                <Formik
                  initialValues={jeorInitialValues}
                  onSubmit={async ({
                    height,
                    height_unit,
                    weight,
                    weight_unit,
                    gender,
                    age
                  }, { setSubmitting, resetForm }) => {
                    const payload: BmrMifflinJeorEquationI = {
                      height,
                      height_unit,
                      weight,
                      weight_unit,
                      gender,
                      age,
                      method: 'BMRMifflinStJeor'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: MifflinJeor } = await calculateOthers(payload)
                      console.log('=====>', MifflinJeor)
                      if (typeof MifflinJeor === 'object') {
                        const { step1, step2, step3, BMR, unit } = MifflinJeor
                        setJeorResult({
                          step1: step1,
                          step2: step2,
                          step3: step3,
                          BMR: BMR,
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
                      </FormRow>

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
                        <Label title={LABELS.gender} />
                        <CustomSelect
                          id="gender"
                          measurement="gender"
                          value={values.gender}
                          onChange={handleChange('gender')}
                        />
                      </FormRow>

                      <FormRow>
                        <Label title={LABELS.age} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="age"
                          placeholder={PLACEHOLDERS.number}
                          value={values.age}
                          onChange={handleChange}
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
                    <Typography variant="subtitle1">
                      BMR: {mcArdleResult.BMR}{mcArdleResult.unit}
                    </Typography>
                  </Box>
                }

                {tabValue === 1 &&
                  <Box sx={{ color: COLORS.text }}>
                    <Typography variant="subtitle1">
                      BMR: {harrisResult.BMR}{harrisResult.unit}
                    </Typography>
                  </Box>
                }

                {tabValue === 2 &&
                  <Box sx={{ color: COLORS.text }}>
                    <Typography variant="subtitle1">step1:{jeorResult.step1} </Typography>
                    <Typography variant="subtitle1">step2: {jeorResult.step2}</Typography>
                    <Typography variant="subtitle1">step3: {jeorResult.step3}</Typography>
                    <Typography variant="subtitle1">BMR: {jeorResult.BMR}{jeorResult.unit}</Typography>
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

export default BMRCalculator
