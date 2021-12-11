import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { WebsiteBandwidthI } from '../../../../types'
import { calculateOthers } from '../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
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
  const [initialFormValues] = React.useState({
    page_views: "",
    page_views_unit: "",
    page_size: "",
    page_size_unit: "",
    redundancy_factor: ""
  })
  const [Result, setResult] = React.useState({
    website_bandwidth: '',
    page_views: '',
    page_size: '',
    redundancy_factor: '',
    unit: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.websiteBandwidth} sm={6}>
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
              const { payload: websiteBandwidth } = await calculateOthers(payload)
              console.log('=====>', websiteBandwidth)
              const { website_bandwidth, unit, page_views, page_size, redundancy_factor
              } = websiteBandwidth
              if (typeof websiteBandwidth === 'object') {
                setResult({
                  website_bandwidth: website_bandwidth,
                  page_views: page_views,
                  page_size: page_size,
                  redundancy_factor: redundancy_factor,
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
      <ResultTabsContainer tabTitle1={'Result'} sm={6}>
        <div className="text-center mb-3">
          <Typography variant="subtitle1"> Website bandwidth: {Result.website_bandwidth}</Typography>
          <Typography variant="subtitle1"> Page views: {Result.page_views}</Typography>
          <Typography variant="subtitle1"> Page size: {Result.page_size}</Typography>
          <Typography variant="subtitle1"> Redanduncy factor: {Result.redundancy_factor}</Typography>
          <Typography variant="subtitle1"> Unit: {Result.unit}</Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default WebsiteBandwidth
