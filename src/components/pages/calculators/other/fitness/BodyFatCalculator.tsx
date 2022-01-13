import React from 'react'
import { Formik } from 'formik'
import { Typography, Box, Grid, } from '@mui/material'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../../navbar/navbar2'
import AddLayout from '../../../../layouts/AddLayout'
import useStyles from '../../../../../styling/CustomStyles'
import { calculateOthers } from '../../../../../services/AppCalculatorsApi'
import { InternationalSystemBfcI, USCustomarySystemBfcI } from '../../../../../types'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  LATEX,
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

function BodyFatCalculator() {
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
    formDisplay2
  }: any = useStyles()

  // States
  const [internationalInitialValues] = React.useState({
    height: '',
    neck: '',
    gender: '',
    hip: '',
    waist: '',
  })
  const [internationalResult, setInternationalResult] = React.useState({
    bodyFat: 0
  })

  const [usInitialValues] = React.useState({
    height: '',
    height_unit: '',
    neck: '',
    neck_unit: '',
    hip: '',
    hip_unit: '',
    waist: '',
    waist_unit: '',
    abdomen: '',
    gender: '',
  })
  const [usResult, setUsResult] = React.useState({
    bodyFat: 0
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
        pagename="Body Fat Calculator"
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
          {tabValue === 0 && <PlaceHolder placeHolder={FITNESS_PLACEHOLDERS.internationalSystemBfc} />}

          {tabValue === 1 && <PlaceHolder placeHolder={FITNESS_PLACEHOLDERS.usCustomarySystemBfc} />}

          <animated.div style={formAnimation}>
            <Box className={formDisplay2} >
              <StyledTabs variant="fullWidth" value={tabValue} onChange={handleChange}>
                <StyledTab
                  wrapped
                  label={CALCULATORS.internationalSystemBfc}
                  {...a11yProps(0)}
                />
                <StyledTab
                  wrapped
                  label={CALCULATORS.usCustomarySystemBfc}
                  {...a11yProps(1)}
                />
              </StyledTabs>

              <TabPanel
                value={tabValue}
                index={0}
              >
                <Formik
                  initialValues={internationalInitialValues}
                  onSubmit={async ({
                    height,
                    neck,
                    gender,
                    hip,
                    waist,
                  }, { setSubmitting }) => {
                    const payload: InternationalSystemBfcI = {
                      height,
                      neck,
                      gender,
                      hip,
                      waist,
                      method: 'InternationalSystemUnitBFP'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { payload: internationalSystemBFC } = await calculateOthers(payload)
                      console.log('=====>', internationalSystemBFC)
                      if (typeof internationalSystemBFC === 'object') {
                        const { BFP } = internationalSystemBFC
                        setInternationalResult({
                          bodyFat: BFP,
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
                          col
                          type={INPUT_TYPE.text}
                          id="height"
                          placeholder={PLACEHOLDERS.number}
                          value={values.height}
                          onChange={handleChange}
                        />
                      </FormRow>

                      <FormRow>
                        <Label title={LABELS.neck} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="neck"
                          placeholder={PLACEHOLDERS.number}
                          value={values.neck}
                          onChange={handleChange}
                        />
                      </FormRow>

                      <FormRow>
                        <Label title={LABELS.hip} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="hip"
                          placeholder={PLACEHOLDERS.number}
                          value={values.hip}
                          onChange={handleChange}
                        />
                      </FormRow>

                      <FormRow>
                        <Label title={LABELS.waist} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="waist"
                          placeholder={PLACEHOLDERS.number}
                          value={values.waist}
                          onChange={handleChange}
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
                  initialValues={usInitialValues}
                  onSubmit={async ({
                    height,
                    height_unit,
                    neck,
                    neck_unit,
                    hip,
                    hip_unit,
                    waist,
                    waist_unit,
                    abdomen,
                    gender,
                  }, { setSubmitting }) => {
                    const payload: USCustomarySystemBfcI = {
                      height,
                      height_unit,
                      neck,
                      neck_unit,
                      hip,
                      hip_unit,
                      waist,
                      waist_unit,
                      abdomen,
                      gender,
                      method: 'USCustomarySystemBFP'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: usCustomarySystemBFC } = await calculateOthers(payload)
                      console.log('=====>', usCustomarySystemBFC)
                      if (typeof usCustomarySystemBFC === 'object') {
                        const { BFP } = usCustomarySystemBFC
                        setUsResult({
                          bodyFat: BFP,
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
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.neck} />
                        <CustomTextInput
                          type={INPUT_TYPE.text}
                          id="neck"
                          placeholder={PLACEHOLDERS.number}
                          value={values.neck}
                          onChange={handleChange}
                        />

                        <CustomSelect
                          id="neck_unit"
                          measurement="length"
                          value={values.neck_unit}
                          onChange={handleChange('neck_unit')}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.hip} />
                        <CustomTextInput
                          type={INPUT_TYPE.text}
                          id="hip"
                          placeholder={PLACEHOLDERS.number}
                          value={values.hip}
                          onChange={handleChange}
                        />

                        <CustomSelect
                          id="hip_unit"
                          measurement="length"
                          value={values.hip_unit}
                          onChange={handleChange('hip_unit')}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.waist} />
                        <CustomTextInput
                          type={INPUT_TYPE.text}
                          id="waist"
                          placeholder={PLACEHOLDERS.number}
                          value={values.waist}
                          onChange={handleChange}
                        />

                        <CustomSelect
                          id="waist_unit"
                          measurement="length"
                          value={values.waist_unit}
                          onChange={handleChange('waist_unit')}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.abdomen} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="abdomen"
                          placeholder={PLACEHOLDERS.number}
                          value={values.abdomen}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.gender} />
                        <CustomSelect
                          id="gender"
                          measurement="gender"
                          value={values.gender}
                          onChange={handleChange('gender')}
                        />
                      </div>

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
                  <Box>
                    <p style={{ fontSize: 14 }}>
                      <Latex displayMode={true}>
                        {LATEX.internationalSystemBfc}
                      </Latex>
                    </p>
                    <Typography variant="subtitle1">
                      Body Fat: {internationalResult.bodyFat}
                    </Typography>
                  </Box>
                }

                {tabValue === 1 &&
                  <Box >
                    <p style={{ fontSize: 14 }}>
                      <Latex displayMode={true}>
                        {LATEX.usCustomarySystem}
                      </Latex>
                    </p>
                    <Typography variant="subtitle1">
                      Body Fat: {usResult.bodyFat}
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

export default BodyFatCalculator
