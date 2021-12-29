import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../navbar/navbar2'
import AddLayout from '../../../layouts/AddLayout'
import { PayBackACertainAmountI } from '../../../../types'
import { calculateFinances } from '../../../../services/AppCalculatorsApi'
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

const PayBackACertainAmount = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [formAnimation, formApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(0px)' : 'translateX(0px)',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [resultAnimation, resultApi] = useSpring(() => ({
    transform: matches === true ? 'translateY(-200px)' : 'translateX(-210px)',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [value, setValue] = React.useState(0);
  const [initialFormValues] = React.useState({
    interest_rate: "",
    credit_card_balance: "",
    monthly_payment: "",
  })
  const [Result, setResult] = React.useState({
    monthlyPay: 0,
    $profit: 0,
    totalPayments: 0,
    currency: ''
  })

  return (
    <>
      <NavBar2
        pagename={CALCULATORS.payBackACertainAmount}
      />
      <AddLayout>
        <Grid
          container
          justifyContent="center"
        >
          {/* Form grid */}
          <FormTabsContainer animation={formAnimation} >
            <Formik
              initialValues={initialFormValues}
              onSubmit={async ({
                interest_rate,
                credit_card_balance,
                monthly_payment,
              }, { setSubmitting }) => {
                const payload: PayBackACertainAmountI = {
                  interest_rate,
                  credit_card_balance,
                  monthly_payment,
                  method: 'PaybackACertainAmount'
                }
                console.log(JSON.stringify(payload))
                try {
                  const { success, payload: paybackACertainAmount } = await calculateFinances(payload)
                  console.log('=====>', paybackACertainAmount)
                  const { monthlyPay, $profit, totalPayments, currency } = paybackACertainAmount
                  if (typeof paybackACertainAmount === 'object') {
                    setResult({
                      monthlyPay: monthlyPay,
                      $profit: $profit,
                      totalPayments: totalPayments,
                      currency: currency
                    })
                  }
                  if (success === true) {
                    setAnswer(success)
                    formApi.start({
                      transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    });
                    resultApi.start({
                      transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
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
                      id="credit_card_balance"
                      placeholder={PLACEHOLDERS.number}
                      value={values.credit_card_balance}
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
              )}
            </Formik>
          </FormTabsContainer>

          {/* Results grid */}
          {answer === true &&
            <ResultTabsContainer tabTitle={'Result'} animation={resultAnimation}>
              <div className="mb-3">
                <Typography variant="subtitle1">
                  Monthly pay: {Result.currency}{Result.monthlyPay}
                </Typography>
                <Typography variant="subtitle1">
                  Profit: {Result.currency}{Result.$profit}
                </Typography>
                <Typography variant="subtitle1">
                  Total payments: {Result.currency}{Result.totalPayments}
                </Typography>
              </div>

            </ResultTabsContainer>
          }
        </Grid>
      </AddLayout>
    </>
  )
}

export default PayBackACertainAmount
