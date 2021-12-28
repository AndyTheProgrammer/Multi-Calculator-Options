import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { BondPayBackPredeterminedI } from '../../../../types'
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
  CustomSelect,
  CustomBtn,
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../custom'

const BondPayBackPredetermined = () => {
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [bondInitialValues] = React.useState({
    interest_rate: "",
    predetermined_amount: "",
    number_of_months: "",
    number_of_years: "",
  })
  const [bondResult, setBondResult] = React.useState({
    monthlyRepayments: 0,
    totalAmountRepayable: 0,
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
      <FormTabsContainer tabTitle1={CALCULATORS.bondPayBackPredetermined} >
        <Formik
          initialValues={bondInitialValues}
          onSubmit={async ({
            interest_rate,
            predetermined_amount,
            number_of_months,
            number_of_years,
          }, { setSubmitting }) => {
            const payload: BondPayBackPredeterminedI = {
              interest_rate,
              predetermined_amount,
              number_of_months,
              number_of_years,
              method: 'bondPayBackPredeterminedAmountAtLoanMaturity'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: bondPaybackWithPredeterminedAmount } = await calculateFinances(payload)
              console.log('=====>', bondPaybackWithPredeterminedAmount)
              const { monthlyRepayments, totalAmountRepayable, currency } = bondPaybackWithPredeterminedAmount
              if (typeof bondPaybackWithPredeterminedAmount === 'object') {
                setBondResult({
                  monthlyRepayments: monthlyRepayments,
                  totalAmountRepayable: totalAmountRepayable,
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
          <div className="mb-3">
            <Typography variant="subtitle1">
              Your monthly repayments: {bondResult.currency}{bondResult.monthlyRepayments}
            </Typography>
            <Typography variant="subtitle1">
              Total amount repayments: {bondResult.currency}{bondResult.totalAmountRepayable}
            </Typography>
          </div>
        }

      </ResultTabsContainer>

    </>
  )
}

export default BondPayBackPredetermined
