import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { DeferredPaymentsLumpsumAtMaturityI } from '../../../../types'
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

const DeferredPaymentsLumpsumAtMaturity = () => {
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [value, setValue] = React.useState(0);
  const [deferredInitialValues] = React.useState({
    interest_rate: "",
    loan_amount: "",
    number_of_months: "",
    number_of_years: "",
  })
  const [deferredResult, setDeferredResult] = React.useState({
    amountDueAtLoanMaturity: 0,
    totalInterest: 0,
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
      <FormTabsContainer tabTitle1={CALCULATORS.deferredPaymentsLoan}>
        <Formik
          initialValues={deferredInitialValues}
          onSubmit={async ({
            interest_rate,
            loan_amount,
            number_of_months,
            number_of_years,
          }, { setSubmitting }) => {
            const payload: DeferredPaymentsLumpsumAtMaturityI = {
              interest_rate,
              loan_amount,
              number_of_months,
              number_of_years,
              method: 'DeferedPaymentLumpSumAtMaturity'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: deferedPaymentLumpsumAtMaturity } = await calculateFinances(payload)
              console.log('=====>', deferedPaymentLumpsumAtMaturity)
              const { amountDueAtLoanMaturity, totalInterest, currency } = deferedPaymentLumpsumAtMaturity
              if (typeof deferedPaymentLumpsumAtMaturity === 'object') {
                setDeferredResult({
                  amountDueAtLoanMaturity: amountDueAtLoanMaturity,
                  totalInterest: totalInterest,
                  currency: currency
                })
              }
              if (success === true) {
                setAnswer(success)

              }
            } catch (err) {
              console.log('====>', err)
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, resetForm }) => (
            <form onSubmit={handleSubmit} className="form-container">
              <div className="form-row">
                <Label title={LABELS.interestRate} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="interest_rate"
                  placeholder={PLACEHOLDERS.number}
                  value={values.interest_rate}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.creditCardBalance} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="loan_amount"
                  placeholder={PLACEHOLDERS.number}
                  value={values.loan_amount}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.numberOfMonths} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="number_of_months"
                  placeholder={PLACEHOLDERS.number}
                  value={values.number_of_months}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.numberOfYears} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="number_of_years"
                  placeholder={PLACEHOLDERS.number}
                  value={values.number_of_years}
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
      <ResultTabsContainer tabTitle={'Result'}>
        {answer === true &&
          <div className="text-center mb-3">
            <Typography variant="subtitle1">
              Amount due at loan maturity: {deferredResult.currency}{deferredResult.amountDueAtLoanMaturity}
            </Typography>
            <Typography variant="subtitle1">
              Total interest: {deferredResult.currency}{deferredResult.totalInterest}
            </Typography>
          </div>
        }

      </ResultTabsContainer>
    </>
  )
}

export default DeferredPaymentsLumpsumAtMaturity
