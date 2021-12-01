import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Grid, Paper } from '@material-ui/core'
import { Formik } from 'formik'

import { BmrMifflinJeorEquationI } from '../../../types'
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

const BmrMifflinJeorEquation = () => {

  const [initialFormValues] = React.useState({
    height: '',
    height_unit: '',
    weight: '',
    weight_unit: '',
    gender: '',
    age: 0
  })
  const [Result, setResult] = React.useState({
    step1: 0,
    step2: 0,
    step3: 0,
    BMR: 0,
    unit: ''
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
                    {CALCULATORS.bmrMifflinJeorEquation}
                  </Typography>
                </div>
              </StyledTabs>

              <NoIndexTabPanel>
                <Formik
                  initialValues={initialFormValues}
                  onSubmit={async ({
                    height,
                    height_unit,
                    weight,
                    weight_unit,
                    gender,
                    age
                  }, { setSubmitting, resetForm }) => {
                    const payload: BmrMifflinJeorEquationI = {
                      height,
                      height_unit,
                      weight,
                      weight_unit,
                      gender,
                      age,
                      method: 'BMRMifflinStJeor'
                    }
                    console.log(JSON.stringify(payload))
                    try {
                      const { payload: MifflinJeor } = await calculateHealth(payload)
                      console.log('=====>', MifflinJeor)
                      if (typeof MifflinJeor === 'object') {
                        const { step1, step2, step3, BMR, unit } = MifflinJeor
                        setResult({
                          step1: step1,
                          step2: step2,
                          step3: step3,
                          BMR: BMR,
                          unit: unit
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
                        <Label title={LABELS.height} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="height"
                          placeholder={PLACEHOLDERS.number}
                          value={values.height}
                          onChange={handleChange}
                        />

                        <CustomSelect
                          id="height_unit"
                          value={values.height_unit}
                          onChange={handleChange('height_unit')}
                        />
                      </div>

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
                        <Label title={LABELS.age} />
                        <CustomTextInput
                          type={INPUT_TYPE.number}
                          id="age"
                          placeholder={PLACEHOLDERS.number}
                          value={values.age}
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
                  <Typography variant="subtitle1">step1:{Result.step1} </Typography>
                  <Typography variant="subtitle1">step2: {Result.step2}</Typography>
                  <Typography variant="subtitle1">step3: {Result.step3}</Typography>
                  <Typography variant="subtitle1">BMR: {Result.BMR}{Result.unit}</Typography>
                </div>
              </NoIndexTabPanel>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default BmrMifflinJeorEquation
