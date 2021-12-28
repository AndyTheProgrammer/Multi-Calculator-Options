import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { MortgagePayoffWithLoanTermI } from '../../../../types'
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

const MortgagePayoffWithLoanTerm = () => {
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [value, setValue] = React.useState(0);
  const [knownLoanTermInitialValues] = React.useState({
    interest_rate: "",
    total_payments_years: "",
    payments_made_years: "",
    loan_amount: "",
  })
  const [knownResult, setKnownResult] = React.useState({
    balance: 0,
    currency: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.mortgagePayoffWithLoanTerm} >
        <Formik
          initialValues={knownLoanTermInitialValues}
          onSubmit={async ({
            interest_rate,
            total_payments_years,
            payments_made_years,
            loan_amount,
          }, { setSubmitting }) => {
            const payload: MortgagePayoffWithLoanTermI = {
              interest_rate,
              total_payments_years,
              payments_made_years,
              loan_amount,
              method: 'mortagePayOffCalculatorWithLoanTerm'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: mortgagePayoffWithLoanTerm } = await calculateFinances(payload)
              console.log('=====>', mortgagePayoffWithLoanTerm)
              const { balance, currency } = mortgagePayoffWithLoanTerm
              if (typeof mortgagePayoffWithLoanTerm === 'object') {
                setKnownResult({
                  balance: balance,
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
                <Label title={LABELS.paymentsMade} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="payments_made_years"
                  placeholder={PLACEHOLDERS.number}
                  value={values.payments_made_years}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.totalPaymentsperYear} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="total_payments_years"
                  placeholder={PLACEHOLDERS.number}
                  value={values.total_payments_years}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.loanAmount} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="loan_amount"
                  placeholder={PLACEHOLDERS.number}
                  value={values.loan_amount}
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
      <ResultTabsContainer tabTitle={'Result'} >
        {answer === true &&
          <div className="mb-3">
            <Typography variant="subtitle1">
              Balance: {knownResult.currency}{knownResult.balance}
            </Typography>
          </div>
        }

      </ResultTabsContainer>
    </>
  )
}

export default MortgagePayoffWithLoanTerm
