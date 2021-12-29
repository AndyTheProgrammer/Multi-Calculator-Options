import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { MortgagePayOffWithoutLoanTermI } from '../../../../types'
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

const MortgagePayOffWithoutLoanTerm = () => {
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [value, setValue] = React.useState(0);
  const [unknownLoanTermInitialValues] = React.useState({
    interest_rate: "",
    principal_balance: "",
    monthly_payment: "",
  })
  const [unknownResult, setUnknownResult] = React.useState({
    answer: 0,
    years: 0,
    months: 0,
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.mortgagePayOffWithoutLoanTerm} >
        <Formik
          initialValues={unknownLoanTermInitialValues}
          onSubmit={async ({
            interest_rate,
            principal_balance,
            monthly_payment
          }, { setSubmitting }) => {
            const payload: MortgagePayOffWithoutLoanTermI = {
              interest_rate,
              principal_balance,
              monthly_payment,
              method: 'mortagePayOffCalculatorWithoutLoanTerm'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: mortgagePayoffCalculator } = await calculateFinances(payload)
              console.log('=====>', mortgagePayoffCalculator)
              const { answer, years, months } = mortgagePayoffCalculator
              if (typeof mortgagePayoffCalculator === 'object') {
                setUnknownResult({
                  answer: answer,
                  years: years,
                  months: months
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
                <Label title={LABELS.principalBalance} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="principal_balance"
                  placeholder={PLACEHOLDERS.number}
                  value={values.principal_balance}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.monthlyPayment} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="monthly_payment"
                  placeholder={PLACEHOLDERS.number}
                  value={values.monthly_payment}
                  onChange={handleChange}
                />
              </div>

              <div
                className="form-row"
                style={{ alignItems: 'center', justifyContent: 'space-between' }}
              >

                <CustomResetBtn
                  onHandleClick={() => resetForm()}
                />
                <CustomBtn />
              </div>
            </form>
          )
          }
        </Formik >
      </FormTabsContainer >

      {/* Results grid */}
      < ResultTabsContainer tabTitle={'Result'} >
        {answer === true &&
          <div className="mb-3">
            <Typography variant="subtitle1">
              Answer: {unknownResult.answer}
            </Typography>
            <Typography variant="subtitle1">
              Payoff in: {unknownResult.years} years and {unknownResult.months} months
            </Typography>
          </div>
        }

      </ResultTabsContainer >
    </>
  )
}

export default MortgagePayOffWithoutLoanTerm
