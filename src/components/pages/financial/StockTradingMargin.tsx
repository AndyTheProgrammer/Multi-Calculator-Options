import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Grid, Container, Paper } from '@material-ui/core'
import { Formik } from 'formik'

import { StockTradingMarginI } from '../../../types'
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

const StockTradingMargin = () => {
  const [value, setValue] = React.useState(0);
  const [initialFormValues] = React.useState({
    margin_requirement: "",
    stock_price: "",
    shares: "",
  })
  const [Result, setResult] = React.useState({
    amountRequired: 0,
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
                    {CALCULATORS.stockTradingMargin}
                  </Typography>
                </div>
              </StyledTabs>

              <NoIndexTabPanel>
                <Formik
                  initialValues={initialFormValues}
                  onSubmit={async ({
                    margin_requirement,
                    stock_price,
                    shares,
                  }, { setSubmitting, resetForm }) => {
                    const payload: StockTradingMarginI = {
                      margin_requirement,
                      stock_price,
                      shares,
                      method: 'stockTradingMarginCalculator'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { payload: stockTradingMarginCalculator } = await calculateFinances(payload)
                      console.log('=====>', stockTradingMarginCalculator)
                      const { amountRequired, currency } = stockTradingMarginCalculator
                      if (typeof stockTradingMarginCalculator === 'object') {
                        setResult({
                          amountRequired: amountRequired,
                          currency: currency
                        })
                      }
                      resetForm()
                    } catch (err) {
                      console.log('====>', err)
                    }
                  }}
                >
                  {({ values, handleChange, handleSubmit, isSubmitting, resetForm }) => (
                    <form onSubmit={handleSubmit} className="form-container">
                      <div className="form-row">
                        <Label title={LABELS.marginRequirement} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="margin_requirement"
                          placeholder={PLACEHOLDERS.number}
                          value={values.margin_requirement}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.stockPrice} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="stock_price"
                          placeholder={PLACEHOLDERS.number}
                          value={values.stock_price}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.shares} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="shares"
                          placeholder={PLACEHOLDERS.number}
                          value={values.shares}
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
                  <Typography variant="subtitle1">
                    Amount required: {Result.currency}{Result.amountRequired}
                  </Typography>
                </div>
              </NoIndexTabPanel>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default StockTradingMargin
