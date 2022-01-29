import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Formik } from 'formik'
import { useSpring } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../../navbar/navbar2'
import AddLayout from '../../../../layouts/AddLayout'
import { PayBackACertainAmountI } from '../../../../../types'
import { calculateFinances } from '../../../../../services/AppCalculatorsApi'
import { invest_and_savings_icon, finance_icon } from '../../../../../common/assets';
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  INVESTMENT_AND_SAVINGS_PLACEHOLDERS,
} from '../../../../../common/shared'
import {
  CustomTextInput,
  Label,
  FormRow,
  FormTabsContainer,
  ResultTabsContainer,
  PlaceHolder,
  FieldContainer
} from '../../../../custom'

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
    profit: 0,
    totalPayments: 0,
    currency: ''
  })

  return (
    <>
      <NavBar2
        pageimage={finance_icon}
        categoryname="Investment And Savings Calculators"
        pagename={CALCULATORS.payBackACertainAmount}
      />
      <AddLayout
        categorykey='investment'
        searchname='Investment And Savings Calculators'
        searchimage={invest_and_savings_icon}
      >
        <Grid
          container
          justifyContent="center"
        >
          <PlaceHolder
            placeHolder={INVESTMENT_AND_SAVINGS_PLACEHOLDERS.payBackACertainAmount}
          />

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
                      profit: $profit,
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
                  <FieldContainer>
                    <FormRow>
                      <Label title={LABELS.interestRate} />
                      <CustomTextInput
                        col
                        type={INPUT_TYPE.text}
                        id="interest_rate"
                        placeholder={PLACEHOLDERS.number}
                        value={values.interest_rate}
                        onChange={handleChange}
                      />
                    </FormRow>

                    <FormRow>
                      <Label title={LABELS.creditCardBalance} />
                      <CustomTextInput
                        col
                        type={INPUT_TYPE.text}
                        id="credit_card_balance"
                        placeholder={PLACEHOLDERS.number}
                        value={values.credit_card_balance}
                        onChange={handleChange}
                      />
                    </FormRow>

                    <FormRow>
                      <Label title={LABELS.monthlyPayment} />
                      <CustomTextInput
                        col
                        type={INPUT_TYPE.text}
                        id="monthly_payment"
                        placeholder={PLACEHOLDERS.number}
                        value={values.monthly_payment}
                        onChange={handleChange}
                      />
                    </FormRow>
                  </FieldContainer>

                  <FormRow buttons reset={() => resetForm()} />
                </form>
              )}
            </Formik>
          </FormTabsContainer>

          {/* Results grid */}
          {answer === true &&
            <ResultTabsContainer
              tabTitle={'Result'}
              animation={resultAnimation}
            >
              <Typography variant="subtitle1">
                Monthly pay: {Result.currency}{Result.monthlyPay}
              </Typography>
              <Typography variant="subtitle1">
                Profit: {Result.currency}{Result.profit}
              </Typography>
              <Typography variant="subtitle1">
                Total payments: {Result.currency}{Result.totalPayments}
              </Typography>
            </ResultTabsContainer>
          }
        </Grid>
      </AddLayout>
    </>
  )
}

export default PayBackACertainAmount
