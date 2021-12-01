import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Grid, Container, Paper } from '@material-ui/core'
import { Formik } from 'formik'

import { ProfitMarginCalculatorI } from '../../../types'
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

const ProfitMarginCalculator = () => {
  const [value, setValue] = React.useState(0);
  const [initialFormValues] = React.useState({
    sales_revenue: "",
    cost: "",
  })
  const [Result, setResult] = React.useState({
    grossMargin: 0,
    grossProfit: 0,
    markUp: 0,
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
      <Grid container item xs={12} sm={10}>
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
                    {CALCULATORS.profitMargin}
                  </Typography>
                </div>
              </StyledTabs>

              <NoIndexTabPanel>
                <Formik
                  initialValues={initialFormValues}
                  onSubmit={async ({
                    sales_revenue,
                    cost,
                  }, { setSubmitting }) => {
                    const payload: ProfitMarginCalculatorI = {
                      sales_revenue,
                      cost,
                      method: 'profitMarginCalculator'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { payload: profitMarginCalculator } = await calculateFinances(payload)
                      console.log('=====>', profitMarginCalculator)
                      const { grossMargin, grossProfit, markUp, currency } = profitMarginCalculator
                      if (typeof profitMarginCalculator === 'object') {
                        setResult({
                          grossMargin: grossMargin,
                          grossProfit: grossProfit,
                          markUp: markUp,
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
                        <Label title={LABELS.salesRevenue} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="sales_revenue"
                          placeholder={PLACEHOLDERS.number}
                          value={values.sales_revenue}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.cost} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="cost"
                          placeholder={PLACEHOLDERS.number}
                          value={values.cost}
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
                  <Typography variant="subtitle1"> Gross margin: {Result.grossMargin}%</Typography>
                  <Typography variant="subtitle1"> Gross profit: {Result.currency}{Result.grossProfit}</Typography>
                  <Typography variant="subtitle1"> Mark up: {Result.markUp}%</Typography>
                </div>
              </NoIndexTabPanel>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default ProfitMarginCalculator
