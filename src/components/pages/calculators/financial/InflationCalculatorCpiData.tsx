import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { InflationCalculatorCpiDataI } from '../../../../types'
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
  FormTabsContainer,
  ResultTabsContainer
} from '../../../custom'

const InflationCalculatorCpiData = () => {
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
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.inflationCalculatorCpiData} >
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
              }
            } catch (err) {
              console.log('====>', err)
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, resetForm }) => (
            <form onSubmit={handleSubmit} className="form-container">
              <div className="form-row">
                <Label title={LABELS.currentPrice} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="current_price"
                  placeholder={PLACEHOLDERS.number}
                  value={values.current_price}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.priceInBase} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="price_in_base"
                  placeholder={PLACEHOLDERS.number}
                  value={values.price_in_base}
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
          <div className="text-center mb-3">
            <Typography variant="subtitle1"> Inflation: {Result.currency}{Result.inflation}</Typography>
          </div>
        }

      </ResultTabsContainer>
    </>
  )
}

export default InflationCalculatorCpiData
