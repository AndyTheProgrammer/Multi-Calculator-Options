import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Grid, Paper } from '@material-ui/core'
import { Formik } from 'formik'

import { USCustomarySystemBfcI } from '../../../types'
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

const USCustomarySystemBfc = () => {

  const [initialFormValues] = React.useState({
    height: '',
    height_unit: '',
    neck: '',
    neck_unit: '',
    hip: '',
    hip_unit: '',
    waist: '',
    waist_unit: '',
    abdomen: '',
    gender: '',
  })
  const [Result, setResult] = React.useState({
    bfc: 0
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
                  {CALCULATORS.usCustomarySystemBfc}
                </Typography>
              </div>
            </StyledTabs>

            <NoIndexTabPanel>
              <Formik
                initialValues={initialFormValues}
                onSubmit={async ({
                  height,
                  height_unit,
                  neck,
                  neck_unit,
                  hip,
                  hip_unit,
                  waist,
                  waist_unit,
                  abdomen,
                  gender,
                }, { setSubmitting }) => {
                  const payload: USCustomarySystemBfcI = {
                    height,
                    height_unit,
                    neck,
                    neck_unit,
                    hip,
                    hip_unit,
                    waist,
                    waist_unit,
                    abdomen,
                    gender,
                    method: 'USCustomarySystemBFP'
                  }
                  console.log(JSON.stringify(payload))
                  try {
                    const { payload: usCustomarySystemBFC } = await calculateHealth(payload)
                    console.log('=====>', usCustomarySystemBFC)
                    if (typeof usCustomarySystemBFC === 'object') {
                      const { bfc } = usCustomarySystemBFC
                      setResult({
                        bfc: bfc,
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
                      <Label title={LABELS.neck} />
                      <CustomTextInput
                        type={INPUT_TYPE.number}
                        id="neck"
                        placeholder={PLACEHOLDERS.number}
                        value={values.neck}
                        onChange={handleChange}
                      />

                      <CustomSelect
                        id="neck_unit"
                        value={values.neck_unit}
                        onChange={handleChange('neck_unit')}
                      />
                    </div>

                    <div className="form-row">
                      <Label title={LABELS.hip} />
                      <CustomTextInput
                        type={INPUT_TYPE.number}
                        id="hip"
                        placeholder={PLACEHOLDERS.number}
                        value={values.hip}
                        onChange={handleChange}
                      />

                      <CustomSelect
                        id="hip_unit"
                        value={values.hip_unit}
                        onChange={handleChange('hip_unit')}
                      />
                    </div>

                    <div className="form-row">
                      <Label title={LABELS.waist} />
                      <CustomTextInput
                        type={INPUT_TYPE.number}
                        id="waist"
                        placeholder={PLACEHOLDERS.number}
                        value={values.waist}
                        onChange={handleChange}
                      />

                      <CustomSelect
                        id="waist_unit"
                        value={values.waist_unit}
                        onChange={handleChange('waist_unit')}
                      />
                    </div>

                    <div className="form-row">
                      <Label title={LABELS.abdomen} />
                      <CustomTextInput
                        type={INPUT_TYPE.number}
                        id="abdomen"
                        placeholder={PLACEHOLDERS.number}
                        value={values.abdomen}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-row">
                      <Label title={LABELS.gender} />
                      <CustomSelect
                        id="gender"
                        measurement="gender"
                        value={values.gender}
                        onChange={handleChange('gender')}
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
                  BFC: {Result.bfc}
                </Typography>
              </div>
            </NoIndexTabPanel>
          </div>
        </Paper>
      </Grid>
    </>
  )
}

export default USCustomarySystemBfc
