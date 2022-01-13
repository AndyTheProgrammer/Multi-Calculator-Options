import React from 'react'
import { Typography, Grid } from '@mui/material'
import { Formik } from 'formik'
import { useSpring } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { NavBar2 } from '../../../../navbar/navbar2'
import AddLayout from '../../../../layouts/AddLayout'
import { InflationCalculatorCpiDataI } from '../../../../../types'
import { calculateFinances } from '../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  MONEY_PLACEHOLDERS,
} from '../../../../../common/shared'
import {
  CustomTextInput,
  Label,
  FormRow,
  FormTabsContainer,
  ResultTabsContainer,
  PlaceHolder,
} from '../../../../custom'
import {
  finance_icon,
  money_tax_icon,
} from "../../../../../common/assets"

const InflationCalculatorCpiData = () => {
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
    current_price: "",
    price_in_base: "",
  })
  const [Result, setResult] = React.useState({
    inflation: 0,
    currency: ''
  })

  return (
    <>
      <NavBar2
        pageimage={finance_icon}
        categoryname="Money Calculators"
        pagename={CALCULATORS.inflationCalculatorCpiData}
      />
      <AddLayout
        categorykey='money'
        searchname='Money Calculators'
        searchimage={money_tax_icon}
      >
        <Grid
          container
          justifyContent="center"
        >
          <PlaceHolder
            placeHolder={MONEY_PLACEHOLDERS.inflationCalculatorCpiData}
          />

          {/* Form grid */}
          <FormTabsContainer animation={formAnimation} >
            <Formik
              initialValues={initialFormValues}
              onSubmit={async ({
                current_price,
                price_in_base,
              }, { setSubmitting }) => {
                const payload: InflationCalculatorCpiDataI = {
                  current_price,
                  price_in_base,
                  method: 'inflationCalculatorWithUsCPIData'
                }
                console.log(JSON.stringify(payload))
                try {
                  const { success, payload: inflationCalculator } = await calculateFinances(payload)
                  console.log('=====>', inflationCalculator)
                  const { inflation, currency } = inflationCalculator
                  if (typeof inflationCalculator === 'object') {
                    setResult({
                      inflation: inflation,
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
                  <FormRow>
                    <Label title={LABELS.currentPrice} />
                    <CustomTextInput
                      col
                      type={INPUT_TYPE.text}
                      id="current_price"
                      placeholder={PLACEHOLDERS.number}
                      value={values.current_price}
                      onChange={handleChange}
                    />
                  </FormRow>

                  <FormRow>
                    <Label title={LABELS.priceInBase} />
                    <CustomTextInput
                      col
                      type={INPUT_TYPE.text}
                      id="price_in_base"
                      placeholder={PLACEHOLDERS.number}
                      value={values.price_in_base}
                      onChange={handleChange}
                    />
                  </FormRow>

                  <FormRow buttons reset={() => resetForm()} />
                </form>
              )}
            </Formik>
          </FormTabsContainer>

          {/* Results grid */}
          {answer === true &&
            <ResultTabsContainer tabTitle={'Result'} animation={resultAnimation}>
              <div className="mb-3 text-center">
                <Typography variant="subtitle1"> Inflation: {Result.currency}{Result.inflation}</Typography>
              </div>
            </ResultTabsContainer>
          }
        </Grid>
      </AddLayout>
    </>
  )
}

export default InflationCalculatorCpiData
