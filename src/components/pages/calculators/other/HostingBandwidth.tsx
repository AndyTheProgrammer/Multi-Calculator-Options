import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'


import { HostingBandwidthI } from '../../../../types'
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

const HostingBandwidth = () => {
  const [initialFormValues] = React.useState({
    monthly_usage: '',
    monthly_usage_unit: '',
  })
  const [Result, setResult] = React.useState({
    hostingBandwidthPerMonth: 0,
    unit: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.hostingBandwidth} sm={6}>
        <Formik
          initialValues={initialFormValues}
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
              const { payload: hostingBandwidthConverter } = await calculateOthers(payload)
              console.log('=====>', hostingBandwidthConverter)
              const { hostingBandwidthPerMonth, unit,
              } = hostingBandwidthConverter
              if (typeof hostingBandwidthConverter === 'object') {
                setResult({
                  hostingBandwidthPerMonth: hostingBandwidthPerMonth,
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
                <Label title={LABELS.resistanceValues} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
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
          <Typography variant="subtitle1"> Hosting bandwidth per month: {Result.hostingBandwidthPerMonth}{Result.unit}</Typography>
        </div>
      </ResultTabsContainer>


    </>
  )
}

export default HostingBandwidth
