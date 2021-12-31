import React from 'react'
import { Typography, Grid } from '@mui/material'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../navbar/navbar2'
import AddLayout from '../../../layouts/AddLayout'
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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  // initial animation values
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
      <NavBar2
        pagename={CALCULATORS.presentValueOfPeriodicalDeposit}
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
                      col
                      type={INPUT_TYPE.text}
                      id="interest_rate"
                      placeholder={PLACEHOLDERS.number}
                      value={values.interest_rate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-row">
                    <Label title={LABELS.periodDeposit} />
                    <CustomTextInput
                      col
                      type={INPUT_TYPE.text}
                      id="period_deposit"
                      placeholder={PLACEHOLDERS.number}
                      value={values.period_deposit}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-row">
                    <Label title={LABELS.numberOfMonths} />
                    <CustomTextInput
                      col
                      type={INPUT_TYPE.text}
                      id="number_of_months"
                      placeholder={PLACEHOLDERS.number}
                      value={values.number_of_months}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-row">
                    <Label title={LABELS.numberOfYears} />
                    <CustomTextInput
                      col
                      type={INPUT_TYPE.text}
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
            <ResultTabsContainer tabTitle={'Result'} animation={resultAnimation}>
              <div className="mb-3">
                <Typography variant="subtitle1"> Present value: {Result.currency}{Result.presentValue}</Typography>
                <Typography variant="subtitle1"> Future value: {Result.currency}{Result.futureValue}</Typography>
                <Typography variant="subtitle1"> Total principal: {Result.currency}{Result.totalPrincipal}</Typography>
                <Typography variant="subtitle1"> Total interest: {Result.currency}{Result.totalInterest}</Typography>
              </div>
            </ResultTabsContainer>
          }
        </Grid>
      </AddLayout>
    </>
  )
}

export default PresentValueOfPeriodicalDeposit
