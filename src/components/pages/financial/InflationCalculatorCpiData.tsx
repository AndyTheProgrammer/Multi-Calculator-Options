import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Grid, Container, Paper } from '@material-ui/core'
import { Formik } from 'formik'

import { InflationCalculatorCpiDataI } from '../../../types'
import { calculateFinances } from '../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  BUTTONS,
  LABELS,
  PLACEHOLDERS,
  IDS,
  INPUT_TYPE,
  COLORS
} from '../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  CustomBtn,
  CustomResetBtn,
  Label,
  StyledTab,
  StyledTabs,
  NoIndexTabPanel,
  TabPanel
} from '../../custom'

const useStyles = makeStyles((theme: Theme) => ({
  tabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 20,
  },
  leftTabContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '50%',
    height: '10%',
    float: 'inline-start',
  },
  rightTabContainer: {
    display: 'flex',
    background: COLORS.gradient,
    color: COLORS.light_text_color,
    justifyContent: 'center',
    width: '50%',
    height: '10%',
    float: 'inline-end',
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  paperBackground: {
    margin: theme.spacing(1),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 20,
  },
}));

const InflationCalculatorCpiData = () => {
  const [value, setValue] = React.useState(0);
  const [initialFormValues] = React.useState({
    current_price: "",
    price_in_base: "",
  })
  const [Result, setResult] = React.useState({
    inflation: 0,
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
      <Grid item xs={12} sm={8}>
        <Paper className={paperBackground}>
          <div className={tabRoot}>
            <StyledTabs>
              <div className={leftTabContainer}>
                <Typography></Typography>
              </div>
              <div className={rightTabContainer}>
                <Typography className="text-center">
                  {CALCULATORS.inflationCalculatorCpiData}
                </Typography>
              </div>
            </StyledTabs>

            <NoIndexTabPanel>
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
                    const { payload: inflationCalculator } = await calculateFinances(payload)
                    console.log('=====>', inflationCalculator)
                    const { inflation, currency } = inflationCalculator
                    if (typeof inflationCalculator === 'object') {
                      setResult({
                        inflation: inflation,
                        currency: currency
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
            </NoIndexTabPanel>
          </div>
        </Paper>
      </Grid>

      {/* Result grid */}
      <Grid item xs={12} sm={4}>
        <Paper className={paperBackground}>
          <div className={tabRoot}>
            <StyledTabs>
              <div className={leftTabContainer}>
                <Typography></Typography>
              </div>
              <div className={rightTabContainer}>
                <Typography>Result</Typography>
              </div>
            </StyledTabs>

            <NoIndexTabPanel>
              <div className="text-center mb-3">
                <Typography variant="subtitle1"> Inflation: {Result.currency}{Result.inflation}</Typography>
              </div>
            </NoIndexTabPanel>
          </div>
        </Paper>
      </Grid>
    </>
  )
}

export default InflationCalculatorCpiData
