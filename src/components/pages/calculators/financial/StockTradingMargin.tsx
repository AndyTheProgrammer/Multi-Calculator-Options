import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { StockTradingMarginI } from '../../../../types'
import { calculateFinances } from '../../../../services/AppCalculatorsApi'
import useStyles from '../../../../styling/CustomStyles'
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

const StockTradingMargin = () => {
  const [value, setValue] = React.useState(0);
  const [initialFormValues] = React.useState({
    margin_requirement: "",
    stock_price: "",
    shares: "",
  })
  const [Result, setResult] = React.useState({
    amountRequired: 0,
    currency: ''
  })
  const {
    tabRoot,
    rightTabContainer,
    leftTabContainer,
    paperBackground,
  } = useStyles()

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.stockTradingMargin} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            margin_requirement,
            stock_price,
            shares,
          }, { setSubmitting }) => {
            const payload: StockTradingMarginI = {
              margin_requirement,
              stock_price,
              shares,
              method: 'stockTradingMarginCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: stockTradingMarginCalculator } = await calculateFinances(payload)
              console.log('=====>', stockTradingMarginCalculator)
              const { amountRequired, currency } = stockTradingMarginCalculator
              if (typeof stockTradingMarginCalculator === 'object') {
                setResult({
                  amountRequired: amountRequired,
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
                <Label title={LABELS.marginRequirement} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="margin_requirement"
                  placeholder={PLACEHOLDERS.number}
                  value={values.margin_requirement}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.stockPrice} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="stock_price"
                  placeholder={PLACEHOLDERS.number}
                  value={values.stock_price}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.shares} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="shares"
                  placeholder={PLACEHOLDERS.number}
                  value={values.shares}
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
          <Typography variant="subtitle1">
            Amount required: {Result.currency}{Result.amountRequired}
          </Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default StockTradingMargin
