import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { PaybackWithinTimeframeI } from '../../../../types'
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

const PaybackWithinTimeframe = () => {
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [value, setValue] = React.useState(0);
  const [initialFormValues] = React.useState({
    interest_rate: "",
    credit_card_balance: "",
    months: "",
    year: "",
  })
  const [Result, setResult] = React.useState({
    paybackPeriod: 0,
    duration: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.paybackWithinTimeFrame} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            interest_rate,
            credit_card_balance,
            months,
            year,
          }, { setSubmitting }) => {
            const payload: PaybackWithinTimeframeI = {
              interest_rate,
              credit_card_balance,
              months,
              year,
              method: 'PaybackWithinCertainTimeframe'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: paybackWithinACertainTimeframe } = await calculateFinances(payload)
              console.log('=====>', paybackWithinACertainTimeframe)
              const { paybackPeriod, duration } = paybackWithinACertainTimeframe
              if (typeof paybackWithinACertainTimeframe === 'object') {
                setResult({
                  paybackPeriod: paybackPeriod,
                  duration: duration
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
                <Label title={LABELS.months} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="months"
                  placeholder={PLACEHOLDERS.number}
                  value={values.months}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.creditCardBalance} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="credit_card_balance"
                  placeholder={PLACEHOLDERS.number}
                  value={values.credit_card_balance}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.year} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="year"
                  placeholder={PLACEHOLDERS.number}
                  value={values.year}
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
        {answer === true &&
          <div className="text-center mb-3">
            <Typography variant="subtitle1">
              Payback period: {Result.paybackPeriod}{Result.duration}
            </Typography>
          </div>
        }

      </ResultTabsContainer>
    </>
  )
}

export default PaybackWithinTimeframe
