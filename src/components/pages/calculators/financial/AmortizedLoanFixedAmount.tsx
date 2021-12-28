import React from 'react'
import { Typography } from '@mui/material'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../navbar/navbar2'
import AddLayout from '../../../layouts/AddLayout'
import { AmortizedLoanFixedAmountI } from '../../../../types'
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
  CustomDivider,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../custom'


const AmortizedLoanFixedAmount = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [formAnimation, formApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [resultAnimation, resultApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [amortizedLoanInitialValues] = React.useState({
    interest_rate: "",
    present_value: "",
    number_of_months: "",
    number_of_years: "",
  })
  const [amortizedLoanResult, setAmortizedLoanResult] = React.useState({
    paymentEveryMonth: 0,
    totalPayments: 0,
    totalInterest: 0,
    currency: ''
  })
  const {
    tabRoot,
    rightTabContainer,
    leftTabContainer,
    paperBackground,
  } = useStyles()

  const rows: GridRowsProp = [
    { id: 1, number: '1', beginnigBal: 'K20,000.00', interest: 'K20,000.00', principal: 'K20,000.00', endingBal: 'K20,000.00' },
    { id: 2, number: '2', beginnigBal: 'K16,351.03', interest: 'K16,351.03', principal: 'K16,351.03', endingBal: 'K16,351.03' },
    { id: 3, number: '3', beginnigBal: 'K12,534.42', interest: 'K12,534.42', principal: 'K12,534.42', endingBal: 'K12,534.42' },
    { id: 4, number: '4', beginnigBal: 'K8,542.48', interest: 'K8,542.48', principal: 'K8,542.48', endingBal: 'K8,542.48' },
  ];

  const columns: GridColDef[] = [
    { field: 'number', headerName: 'No', width: 60 },
    { field: 'beginnigBal', headerName: 'Beginning Balance', width: 150 },
    { field: 'interest', headerName: 'Interest', width: 150 },
    { field: 'principal', headerName: 'Principal', width: 150 },
    { field: 'endingBal', headerName: 'Ending Balance', width: 150 },
  ];

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.amortizedLoan} animation={formAnimation}>
        <Formik
          initialValues={amortizedLoanInitialValues}
          onSubmit={async ({
            interest_rate,
            present_value,
            number_of_months,
            number_of_years,
          }, { setSubmitting }) => {
            const payload: AmortizedLoanFixedAmountI = {
              interest_rate,
              present_value,
              number_of_months,
              number_of_years,
              method: 'amortizedLoanFixeAmount'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: amortizedLoanWithFixedAmount } = await calculateFinances(payload)
              console.log('=====>', amortizedLoanWithFixedAmount)
              const { totalRepayment, currency } = amortizedLoanWithFixedAmount
              if (typeof amortizedLoanWithFixedAmount === 'object') {
                setAmortizedLoanResult({
                  paymentEveryMonth: 0,
                  totalPayments: 0,
                  totalInterest: 0,
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
                <Label title={LABELS.presentValue} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="present_value"
                  placeholder={PLACEHOLDERS.number}
                  value={values.present_value}
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
      <ResultTabsContainer tabTitle={'Result'} animation={resultAnimation}>
        {answer === true &&
          <div className="mb-3">
            <Typography variant="subtitle1">
              Payment Every Month: {amortizedLoanResult.currency}{amortizedLoanResult.paymentEveryMonth}
            </Typography>
            <Typography variant="subtitle1">
              Payments Total: {amortizedLoanResult.currency}{amortizedLoanResult.totalPayments}
            </Typography>
            <Typography variant="subtitle1">
              Total Interest: {amortizedLoanResult.currency}{amortizedLoanResult.totalInterest}
            </Typography>
          </div>
        }

      </ResultTabsContainer>
    </>
  )
}

export default AmortizedLoanFixedAmount
