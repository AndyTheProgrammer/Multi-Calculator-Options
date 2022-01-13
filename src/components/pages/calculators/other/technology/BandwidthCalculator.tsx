import React from 'react'
import { Typography, Grid, Box } from '@mui/material'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../../navbar/navbar2'
import AddLayout from '../../../../layouts/AddLayout'
import { WebsiteBandwidthI, HostingBandwidthI } from '../../../../../types'
import { calculateOthers } from '../../../../../services/AppCalculatorsApi'
import useStyles from '../../../../../styling/CustomStyles'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  LATEX,
  COLORS,
  TECHNOLOGY_PLACEHOLDERS,
} from '../../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  Label,
  FormRow,
  ResultTabsContainer,
  StyledTab,
  StyledTabs,
  TabPanel,
  PlaceHolder,
} from '../../../../custom'
import {
  other_icon,
  tech_calc_icon,
} from "../../../../../common/assets"

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Latex = require('react-latex');

const BandwidthCalculator = () => {
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
    formDisplay,
  }: any = useStyles()

  const [websiteInitialValues] = React.useState({
    page_views: "",
    page_views_unit: "",
    page_size: "",
    page_size_unit: "",
    redundancy_factor: ""
  })
  const [websiteResult, setWebsiteResult] = React.useState({
    website_bandwidth: '',
    MbitsPerMonth: '',
    GBsPerMonth: '',
    withRedundancyFactor: '',
    MbitsPerMonthwithRedundancyFactor: '',
    GBsPerMonthwithRedundancyFactor: '',
  })

  const [hostingInitialValues] = React.useState({
    monthly_usage: '',
    monthly_usage_unit: '',
  })
  const [hostingResult, setHostingResult] = React.useState({
    hostingBandwidth: 0,
    unit: ''
  })

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <NavBar2
        pageimage={other_icon}
        categoryname="Technology Calculators"
        pagename="Bandwidth Calculator"
      />
      <AddLayout
        categorykey='technology'
        searchname='Technology Calculators'
        searchimage={tech_calc_icon}
      >
        <Grid
          container
          justifyContent="center"
        >
          {tabValue === 0 &&
            <PlaceHolder
              placeHolder={TECHNOLOGY_PLACEHOLDERS.websiteBandwidth}
            />
          }

          {tabValue === 1 &&
            <PlaceHolder
              placeHolder={TECHNOLOGY_PLACEHOLDERS.hostingBandwidth}
            />
          }

          {/* Form */}
          <animated.div style={formAnimation}>
            <Box className={formDisplay} >
              <StyledTabs variant="fullWidth" value={tabValue} onChange={handleChange}>
                <StyledTab
                  wrapped
                  label={CALCULATORS.websiteBandwidth}
                  {...a11yProps(0)}
                />
                <StyledTab
                  wrapped
                  label={CALCULATORS.hostingBandwidth}
                  {...a11yProps(1)}
                />
              </StyledTabs>

              <TabPanel
                value={tabValue}
                index={0}
              >
                <Formik
                  initialValues={websiteInitialValues}
                  onSubmit={async ({
                    page_views,
                    page_views_unit,
                    page_size,
                    page_size_unit,
                    redundancy_factor,
                  }, { setSubmitting }) => {
                    const payload: WebsiteBandwidthI = {
                      page_views,
                      page_views_unit,
                      page_size,
                      page_size_unit,
                      redundancy_factor,
                      method: 'WebsiteBandwidthCalculator'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: websiteBandwidth } = await calculateOthers(payload)
                      console.log('=====>', websiteBandwidth)
                      const {
                        $actualBandwidth,
                        MbitsPerMonth,
                        GBsPerMonth,
                        withRedundancyFactor,
                        MbitsPerMonthwithRedundancyFactor,
                        GBsPerMonthwithRedundancyFactor,
                        unitType,
                      } = websiteBandwidth
                      if (typeof websiteBandwidth === 'object') {
                        setWebsiteResult({
                          website_bandwidth: $actualBandwidth,
                          MbitsPerMonth: MbitsPerMonth,
                          GBsPerMonth: GBsPerMonth,
                          withRedundancyFactor: withRedundancyFactor,
                          MbitsPerMonthwithRedundancyFactor: MbitsPerMonthwithRedundancyFactor,
                          GBsPerMonthwithRedundancyFactor: GBsPerMonthwithRedundancyFactor
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
                        <Label title={LABELS.pageViews} />
                        <CustomTextInput
                          type={INPUT_TYPE.text}
                          id="page_views"
                          placeholder={PLACEHOLDERS.number}
                          value={values.page_views}
                          onChange={handleChange}
                        />

                        <CustomSelect
                          id="page_views_unit"
                          measurement="data"
                          value={values.page_views_unit}
                          onChange={handleChange('page_views_unit')}
                        />
                      </FormRow>

                      <FormRow>
                        <Label title={LABELS.pageSize} />
                        <CustomTextInput
                          type={INPUT_TYPE.text}
                          id="page_size"
                          placeholder={PLACEHOLDERS.number}
                          value={values.page_size}
                          onChange={handleChange}
                        />

                        <CustomSelect
                          id="page_size_unit"
                          measurement="data"
                          value={values.page_size_unit}
                          onChange={handleChange('page_size_unit')}
                        />
                      </FormRow>


                      <FormRow>
                        <Label title={LABELS.redundancyFactor} />
                        <CustomTextInput
                          col
                          type={INPUT_TYPE.text}
                          id="redundancy_factor"
                          placeholder={PLACEHOLDERS.number}
                          value={values.redundancy_factor}
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
                index={1}
              >
                <Formik
                  initialValues={hostingInitialValues}
                  onSubmit={async ({
                    monthly_usage,
                    monthly_usage_unit,
                  }, { setSubmitting, resetForm }) => {
                    const payload: HostingBandwidthI = {
                      monthly_usage,
                      monthly_usage_unit,
                      method: 'HostingBandwidthConverter'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { success, payload: hostingBandwidthConverter } = await calculateOthers(payload)
                      console.log('=====>', hostingBandwidthConverter)
                      const {
                        HostingBandwidth,
                        unit,
                      } = hostingBandwidthConverter
                      if (typeof hostingBandwidthConverter === 'object') {
                        setHostingResult({
                          hostingBandwidth: HostingBandwidth,
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
                        <Label title={LABELS.monthlyUsage} />
                        <CustomTextInput
                          type={INPUT_TYPE.text}
                          id="monthly_usage"
                          placeholder={PLACEHOLDERS.number}
                          value={values.monthly_usage}
                          onChange={handleChange}
                        />

                        <CustomSelect
                          id="monthly_usage_unit"
                          measurement="data"
                          value={values.monthly_usage_unit}
                          onChange={handleChange('monthly_usage_unit')}
                        />
                      </FormRow>

                      <FormRow buttons reset={() => resetForm()} />
                    </form>
                  )}
                </Formik>
              </TabPanel>

            </Box>
          </animated.div>

          {/* Results grid */}
          {answer === true &&
            <ResultTabsContainer
              tabTitle={'Result'}
              animation={resultAnimation}
            >
              <Box className="mb-3 text-center">
                {tabValue === 0 &&
                  <Box sx={{ color: COLORS.text }}>
                    <p style={{ fontSize: 14 }}>
                      <Latex displayMode={true}>{LATEX.websiteBandwidth}</Latex>
                    </p>
                    <Typography variant="subtitle1">
                      Website bandwidth: {websiteResult.website_bandwidth}
                    </Typography>

                    <Typography variant="subtitle1">
                      MBits per month: {websiteResult.MbitsPerMonth}
                    </Typography>

                    <Typography variant="subtitle1">
                      GBs per month: {websiteResult.GBsPerMonth}
                    </Typography>

                    <Typography variant="subtitle1">
                      Redanduncy factor: {websiteResult.withRedundancyFactor}
                    </Typography>

                    <Typography variant="subtitle1">
                      MBits per month with redundancy factor: {websiteResult.MbitsPerMonthwithRedundancyFactor}
                    </Typography>

                    <Typography variant="subtitle1">
                      GBs per month with redundancy factor: {websiteResult.GBsPerMonthwithRedundancyFactor}
                    </Typography>
                  </Box>
                }

                {tabValue === 1 &&
                  <Box sx={{ color: COLORS.text }}>
                    <p style={{ fontSize: 14 }}>
                      <Latex displayMode={true}>{LATEX.hostingBandwidth}</Latex>
                    </p>
                    <Typography variant="subtitle1">
                      Hosting bandwidth per month: {hostingResult.hostingBandwidth}{hostingResult.unit}
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

export default BandwidthCalculator
