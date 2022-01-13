import React from 'react'
import { Typography, Box, Grid } from '@mui/material'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../../navbar/navbar2'
import AddLayout from '../../../../layouts/AddLayout'
import { BodyMassIndexI, BodyMassIndexMethodTwoI } from '../../../../../types'
import { calculateOthers } from '../../../../../services/AppCalculatorsApi'
import useStyles from '../../../../../styling/CustomStyles'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  LATEX,
  COLORS,
  FITNESS_PLACEHOLDERS,
} from '../../../../../common/shared'
import {
  CustomTextInput,
  Label,
  FormRow,
  ResultTabsContainer,
  StyledTab,
  StyledTabs,
  TabPanel,
  CustomSelect,
  PlaceHolder,
  Image,
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

const BodyMassIndexCalculator = () => {
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
  }: any = useStyles()
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)
  const [methodOneInitialValues] = React.useState({
    height: '',
    height_unit: '',
    weight: '',
    weight_unit: ''
  })
  const [methodOneResult, setMethodOneResult] = React.useState({
    weight: 0,
    height: 0,
    bmi: 0,
    unit: ''
  })
  const [methodOneResult2, setMethodOneResult2] = React.useState({
    weightInKg: 0,
    heightToMeter: 0,
    bmi: 0,
    unit: ''
  })

  const [methodTwoInitialValues] = React.useState({
    height: '',
    height_unit: '',
    weight: '',
    weight_unit: ''
  })
  const [methodTwoResult, setMethodTwoResult] = React.useState({
    weightInlbs: 0,
    heightToIn: 0,
    bmi: 0,
    unit: ''
  })
  const [methodTwoResult2, setMethodTwoResult2] = React.useState({
    weightInlbs: 0,
    heightToIn: 0,
    bmi: 0,
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
        pagename="BMI Calculator"
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
          {tabValue === 0 && <PlaceHolder placeHolder={FITNESS_PLACEHOLDERS.bodyMassIndex} />}

          {tabValue === 1 && <PlaceHolder placeHolder={FITNESS_PLACEHOLDERS.bodyMassIndexMethodTwo} />}

          <animated.div
            style={formAnimation}
          >
            <Box className={formDisplay} >
              <StyledTabs variant="fullWidth" value={tabValue} onChange={handleChange}>
                <StyledTab
                  wrapped
                  label={CALCULATORS.bodyMassIndex}
                  {...a11yProps(0)}
                />
                <StyledTab
                  wrapped
                  label={CALCULATORS.bodyMassIndexMethodTwo}
                  {...a11yProps(1)}
                />
              </StyledTabs>

              <TabPanel
                value={tabValue}
                index={0}
              >
                <Formik
                  initialValues={methodOneInitialValues}
                  onSubmit={async ({
                    height,
                    height_unit,
                    weight,
                    weight_unit
                  }, { setSubmitting, resetForm }) => {
                    const payload: BodyMassIndexI = {
                      height,
                      height_unit,
                      weight,
                      weight_unit,
                      method: 'bodyMassIndex'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: bodyMass } = await calculateOthers(payload)
                      console.log('=====>', bodyMass)
                      if (typeof bodyMass === 'object') {
                        const { weight, height, bmi, unit } = bodyMass
                        setMethodOneResult({
                          weight: weight,
                          height: height,
                          bmi: bmi,
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
                  initialValues={methodTwoInitialValues}
                  onSubmit={async ({
                    height,
                    height_unit,
                    weight,
                    weight_unit
                  }, { setSubmitting }) => {
                    const payload: BodyMassIndexMethodTwoI = {
                      height,
                      height_unit,
                      weight,
                      weight_unit,
                      method: 'bodyMassIndexTwo'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: bodyMassTwo } = await calculateOthers(payload)
                      console.log('=====>', bodyMassTwo)
                      if (typeof bodyMassTwo === 'object') {
                        const { bmi, unit, heightToIn, weightInlbs } = bodyMassTwo
                        setMethodTwoResult({
                          bmi: bmi,
                          heightToIn: heightToIn,
                          weightInlbs: weightInlbs,
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
                  <Box sx={{ color: COLORS.text }}>
                    <Latex displayMode={true}>{LATEX.bmi}</Latex>
                    <Typography variant="subtitle1">
                      BMI: {methodOneResult.bmi}{methodOneResult.unit}<sup>2</sup>
                    </Typography>
                  </Box>
                }

                {tabValue === 1 &&
                  <Box sx={{ color: COLORS.text }}>
                    <Latex displayMode={true}>{LATEX.bmiMethodTwo}</Latex>
                    <Typography variant="subtitle1">
                      BMI:{methodTwoResult.bmi}{methodTwoResult.unit}<sup>3</sup>
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

export default BodyMassIndexCalculator
