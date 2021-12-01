import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Grid, Paper } from '@material-ui/core'
import { Formik } from 'formik'

import { DueDateMittendorfWilliamI } from '../../../types'
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
  CustomSelect,
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

const DueDateMittendorfWilliam = () => {

  const [initialFormValues] = React.useState({
    first_date_of_last_period: '',
    type: ''
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
                    {CALCULATORS.dueDateMittendorfWilliam}
                  </Typography>
                </div>
              </StyledTabs>

              <NoIndexTabPanel>
                <Formik
                  initialValues={initialFormValues}
                  onSubmit={async ({
                    first_date_of_last_period,
                    type,
                  }, { setSubmitting }) => {
                    const payload: DueDateMittendorfWilliamI = {
                      first_date_of_last_period,
                      type,
                      method: 'DueDateMittendorfWilliamRule'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { payload: dueDateMittendorf } = await calculateHealth(payload)
                      console.log('=====>', dueDateMittendorf)
                      if (typeof dueDateMittendorf === 'object') {
                        const { dueDate } = dueDateMittendorf
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
                          placeholder={PLACEHOLDERS.date}
                          value={values.first_date_of_last_period}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.type} />
                        <CustomTextInput
                          type={INPUT_TYPE.text}
                          id="type"
                          placeholder={PLACEHOLDERS.type}
                          value={values.type}
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
                  <Typography variant="subtitle1">Due Date: {Result.dueDate} </Typography>
                </div>
              </NoIndexTabPanel>
            </div>
          </Paper>
        </Grid>
      </Grid>





    </>
  )
}

export default DueDateMittendorfWilliam
