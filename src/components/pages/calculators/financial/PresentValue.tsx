import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { PresentValueI } from '../../../../types'
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

const PresentValue = () => {
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [value, setValue] = React.useState(0);
  const [initialFormValues] = React.useState({
    interest_rate: "",
    predetermined_amount: "",
    number_of_months: "",
    number_of_years: "",
  })
  const [Result, setResult] = React.useState({
    PV: 0,
    totalInterest: 0,
    currency: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.presentValue} >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            interest_rate,
            predetermined_amount,
            number_of_months,
            number_of_years,
          }, { setSubmitting, resetForm }) => {
            const payload: PresentValueI = {
              interest_rate,
              predetermined_amount,
              number_of_months,
              number_of_years,
              method: 'presentValue'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: presentValueOfFutureMoney } = await calculateFinances(payload)
              console.log('=====>', presentValueOfFutureMoney)
              const { PV, totalInterest, currency } = presentValueOfFutureMoney
              if (typeof presentValueOfFutureMoney === 'object') {
                setResult({
                  PV: PV,
                  totalInterest: totalInterest,
                  currency: currency
                })
              }
              if (success === true) {
                setAnswer(success)
              }
              resetForm()
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
                <Label title={LABELS.predeterminedAmount} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="predetermined_amount"
                  placeholder={PLACEHOLDERS.number}
                  value={values.predetermined_amount}
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

                <CustomResetBtn
                  onHandleClick={() => resetForm()}
                />
                <CustomBtn />
              </div>
            </form>
          )}
        </Formik>
      </FormTabsContainer>

      {/* Results grid */}
      {answer === true &&
        <ResultTabsContainer tabTitle={'Result'} >
          <div className="mb-3">
            <Typography variant="subtitle1"> Present value: {Result.currency}{Result.PV}</Typography>
            <Typography variant="subtitle1"> Total interest: {Result.currency}{Result.totalInterest}</Typography>
          </div>
        </ResultTabsContainer>
      }
    </>
  )
}

export default PresentValue
