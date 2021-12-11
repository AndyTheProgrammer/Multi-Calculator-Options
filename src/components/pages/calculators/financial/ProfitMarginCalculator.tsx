import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { ProfitMarginCalculatorI } from '../../../../types'
import { calculateFinances } from '../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomBtn,
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../custom'

const ProfitMarginCalculator = () => {
  const [value, setValue] = React.useState(0);
  const [initialFormValues] = React.useState({
    sales_revenue: "",
    cost: "",
  })
  const [Result, setResult] = React.useState({
    grossMargin: 0,
    grossProfit: 0,
    markUp: 0,
    currency: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.profitMargin} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            sales_revenue,
            cost,
          }, { setSubmitting }) => {
            const payload: ProfitMarginCalculatorI = {
              sales_revenue,
              cost,
              method: 'profitMarginCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: profitMarginCalculator } = await calculateFinances(payload)
              console.log('=====>', profitMarginCalculator)
              const { grossMargin, grossProfit, markUp, currency } = profitMarginCalculator
              if (typeof profitMarginCalculator === 'object') {
                setResult({
                  grossMargin: grossMargin,
                  grossProfit: grossProfit,
                  markUp: markUp,
                  currency: currency
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
                <Label title={LABELS.salesRevenue} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="sales_revenue"
                  placeholder={PLACEHOLDERS.number}
                  value={values.sales_revenue}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.cost} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="cost"
                  placeholder={PLACEHOLDERS.number}
                  value={values.cost}
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
          <Typography variant="subtitle1"> Gross margin: {Result.grossMargin}%</Typography>
          <Typography variant="subtitle1"> Gross profit: {Result.currency}{Result.grossProfit}</Typography>
          <Typography variant="subtitle1"> Mark up: {Result.markUp}%</Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default ProfitMarginCalculator
