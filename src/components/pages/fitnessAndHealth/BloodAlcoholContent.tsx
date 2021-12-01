import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Grid, Paper } from '@material-ui/core'
import { Formik } from 'formik'

import { BloodAlcoholContentI } from '../../../types'
import { calculateHealth } from '../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
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

const BloodAlcoholContent = () => {

  const [initialFormValues] = React.useState({
    weight: '',
    weight_unit: '',
    gender: '',
    hours_of_drinking: '',
    minutes_of_drinking: '',
    number_of_standard_drinks: '',
  })
  const [Result, setResult] = React.useState({
    BAC: 0,
    numberOfHoursAverage: 0,
    divident: 0,
    divisor: 0,
    M: 0,
    N: 0,
    H: 0
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
                    {CALCULATORS.bloodAlcoholContent}
                  </Typography>
                </div>
              </StyledTabs>

              <NoIndexTabPanel>
                <Formik
                  initialValues={initialFormValues}
                  onSubmit={async ({
                    weight,
                    weight_unit,
                    gender,
                    hours_of_drinking,
                    minutes_of_drinking,
                    number_of_standard_drinks,
                  }, { setSubmitting, resetForm }) => {
                    const payload: BloodAlcoholContentI = {
                      weight,
                      weight_unit,
                      gender,
                      hours_of_drinking,
                      minutes_of_drinking,
                      number_of_standard_drinks,
                      method: 'bloodAlcoholContent'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { payload: BloodAlcoholContent } = await calculateHealth(payload)
                      console.log('=====>', BloodAlcoholContent)
                      if (typeof BloodAlcoholContent === 'object') {
                        const { BAC, numberOfHoursAverage, divident, divisor, M, N, H } = BloodAlcoholContent
                        setResult({
                          BAC: BAC,
                          numberOfHoursAverage: numberOfHoursAverage,
                          divident: divident,
                          divisor: divisor,
                          M: M,
                          N: N,
                          H: H
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
                        <Label title={LABELS.weight} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="weight"
                          placeholder={PLACEHOLDERS.number}
                          value={values.weight}
                          onChange={handleChange}
                        />

                        <CustomSelect
                          id="weight_unit"
                          value={values.weight_unit}
                          onChange={handleChange('weight_unit')}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.gender} />
                        <CustomTextInput
                          type={INPUT_TYPE.text}
                          id="gender"
                          placeholder={PLACEHOLDERS.gender}
                          value={values.gender}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.hoursOfDrinking} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="hours_of_drinking"
                          placeholder={PLACEHOLDERS.number}
                          value={values.hours_of_drinking}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.minutesOfDrinking} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="minutes_of_drinking"
                          placeholder={PLACEHOLDERS.number}
                          value={values.minutes_of_drinking}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-row">
                        <Label title={LABELS.numberOfStandardDrinks} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="number_of_standard_drinks"
                          placeholder={PLACEHOLDERS.number}
                          value={values.number_of_standard_drinks}
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
                    Blood alcohol content: {Result.BAC}
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

export default BloodAlcoholContent
