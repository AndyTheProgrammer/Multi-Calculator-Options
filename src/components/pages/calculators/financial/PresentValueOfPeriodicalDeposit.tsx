import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { PresentValueOfPeriodicalDepositI } from '../../../../types'
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

const PresentValueOfPeriodicalDeposit = () => {
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [value, setValue] = React.useState(0);
  const [initialFormValues] = React.useState({
    interest_rate: "",
    period_deposit: "",
    number_of_months: "",
    number_of_years: "",
  })
  const [Result, setResult] = React.useState({
    presentValue: 0,
    futureValue: 0,
    totalPrincipal: 0,
    totalInterest: 0,
    currency: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.presentValueOfPeriodicalDeposit} >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            interest_rate,
            period_deposit,
            number_of_months,
            number_of_years,
          }, { setSubmitting, resetForm }) => {
            const payload: PresentValueOfPeriodicalDepositI = {
              interest_rate,
              period_deposit,
              number_of_months,
              number_of_years,
              method: 'presentValueOfPeriodDeposit'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: presentValueOfPeriodicalDeposits } = await calculateFinances(payload)
              console.log('=====>', presentValueOfPeriodicalDeposits)
              const { presentValue, futureValue, totalPricipal, totalInterest, currency } = presentValueOfPeriodicalDeposits
              if (typeof presentValueOfPeriodicalDeposits === 'object') {
                setResult({
                  presentValue: presentValue,
                  futureValue: futureValue,
                  totalPrincipal: totalPricipal,
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
                <Label title={LABELS.periodDeposit} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="period_deposit"
                  placeholder={PLACEHOLDERS.number}
                  value={values.period_deposit}
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
      <ResultTabsContainer tabTitle={'Result'} >
        {answer === true &&
          <div className="mb-3">
            <Typography variant="subtitle1"> Present value: {Result.currency}{Result.presentValue}</Typography>
            <Typography variant="subtitle1"> Future value: {Result.currency}{Result.futureValue}</Typography>
            <Typography variant="subtitle1"> Total principal: {Result.currency}{Result.totalPrincipal}</Typography>
            <Typography variant="subtitle1"> Total interest: {Result.currency}{Result.totalInterest}</Typography>
          </div>
        }

      </ResultTabsContainer>
    </>
  )
}

export default PresentValueOfPeriodicalDeposit
