import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Grid, Paper } from '@material-ui/core'
import { Formik } from 'formik'

import { DueDateNaegeleRuleI } from '../../../types'
import { calculateHealth } from '../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  IDS,
  INPUT_TYPE,
  COLORS
} from '../../../common/shared'
import {
  CustomTextInput,
  CustomBtn,
  CustomResetBtn,
  Label,
  StyledTabs,
  NoIndexTabPanel,
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

const DueDateNaegeleRule = () => {

  const [initialFormValues] = React.useState({
    first_date_of_last_period: '',
    days: '',
    method: '',
  })
  const [Result, setResult] = React.useState({
    dueDate: 0
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
                  {CALCULATORS.dueDateNaegeleRule}
                </Typography>
              </div>
            </StyledTabs>

            <NoIndexTabPanel>
              <Formik
                initialValues={initialFormValues}
                onSubmit={async ({
                  first_date_of_last_period,
                  days,
                  method,
                }, { setSubmitting }) => {
                  const payload: DueDateNaegeleRuleI = {
                    first_date_of_last_period,
                    days,
                    method: 'DueDateNaegeleRule'
                  }
                  console.log(JSON.stringify(payload))
                  try {
                    const { payload: dueDateNaegeleRule } = await calculateHealth(payload)
                    console.log('=====>', dueDateNaegeleRule)
                    if (typeof dueDateNaegeleRule === 'object') {
                      const { dueDate } = dueDateNaegeleRule
                      setResult({
                        dueDate: dueDate
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
                      <Label title={LABELS.firstDateofLastPeriod} />
                      <CustomTextInput
                        type={INPUT_TYPE.date}
                        id="first_date_of_last_period"
                        placeholder={PLACEHOLDERS.number}
                        value={values.first_date_of_last_period}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-row">
                      <Label title={LABELS.days} />
                      <CustomTextInput
                        type={INPUT_TYPE.number}
                        id="days"
                        placeholder={PLACEHOLDERS.number}
                        value={values.days}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-row">
                      <Label title={LABELS.method} />
                      <CustomTextInput
                        type={INPUT_TYPE.text}
                        id="method"
                        placeholder={PLACEHOLDERS.method}
                        value={values.method}
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
                <Typography variant="subtitle1">Due date: {Result.dueDate}</Typography>
              </div>
            </NoIndexTabPanel>
          </div>
        </Paper>
      </Grid>
    </>
  )
}

export default DueDateNaegeleRule
