import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../navbar/navbar2'
import AddLayout from '../../../layouts/AddLayout'
import { WebsiteBandwidthI } from '../../../../types'
import { calculateOthers } from '../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  LATEX,
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  CustomBtn,
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../custom'

const WebsiteBandwidth = () => {
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
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)
  const [initialFormValues] = React.useState({
    page_views: "",
    page_views_unit: "",
    page_size: "",
    page_size_unit: "",
    redundancy_factor: ""
  })
  const [Result, setResult] = React.useState({
    website_bandwidth: '',
    MbitsPerMonth: '',
    GBsPerMonth: '',
    withRedundancyFactor: '',
    MbitsPerMonthwithRedundancyFactor: '',
    GBsPerMonthwithRedundancyFactor: '',
  })

  return (
    <>
      <NavBar2 pagename="Website Bandwidth Calculator" />
      {/* Form grid */}
      <AddLayout>
        <FormTabsContainer
          tabTitle1={CALCULATORS.websiteBandwidth}
          animation={formAnimation}
        >
          <Formik
            initialValues={initialFormValues}
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
                  setResult({
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
                <div className="form-row">
                  <Label title={LABELS.pageViews} />
                  <CustomTextInput
                    type={INPUT_TYPE.number}
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
                </div>

                <div className="form-row">
                  <Label title={LABELS.pageSize} />
                  <CustomTextInput
                    type={INPUT_TYPE.number}
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
                </div>


                <div className="form-row">
                  <Label title={LABELS.redundancyFactor} />
                  <CustomTextInput
                    type={INPUT_TYPE.number}
                    id="redundancy_factor"
                    placeholder={PLACEHOLDERS.number}
                    value={values.redundancy_factor}
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
        </FormTabsContainer>

        {/* Results grid */}
        <ResultTabsContainer
          tabTitle={'Result'}
          animation={resultAnimation}
          latex={LATEX.websiteBandwidth}
        >
          {answer === true &&
            <div className="text-center mb-3">
              <Typography variant="subtitle1">
                Website bandwidth: {Result.website_bandwidth}
              </Typography>

              <Typography variant="subtitle1">
                MBits per month: {Result.MbitsPerMonth}
              </Typography>

              <Typography variant="subtitle1">
                GBs per month: {Result.GBsPerMonth}
              </Typography>

              <Typography variant="subtitle1">
                Redanduncy factor: {Result.withRedundancyFactor}
              </Typography>

              <Typography variant="subtitle1">
                MBits per month with redundancy factor: {Result.MbitsPerMonthwithRedundancyFactor}
              </Typography>

              <Typography variant="subtitle1">
                GBs per month with redundancy factor: {Result.GBsPerMonthwithRedundancyFactor}
              </Typography>
            </div>
          }
        </ResultTabsContainer>
      </AddLayout>
    </>
  )
}

export default WebsiteBandwidth
