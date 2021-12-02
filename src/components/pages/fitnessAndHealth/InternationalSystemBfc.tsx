import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Grid, Paper } from '@material-ui/core'
import { Formik } from 'formik'

import { InternationalSystemBfcI } from '../../../types'
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
  CustomBtn,
  CustomSelect,
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

const InternationalSystemBfc = () => {

  const [initialFormValues] = React.useState({
    height: '',
    neck: '',
    gender: '',
    hip: '',
    waist: '',
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
                  {CALCULATORS.internationalSystemBfc}
                </Typography>
              </div>
            </StyledTabs>

            <NoIndexTabPanel>
              <Formik
                initialValues={initialFormValues}
                onSubmit={async ({
                  height,
                  neck,
                  gender,
                  hip,
                  waist,
                }, { setSubmitting }) => {
                  const payload: InternationalSystemBfcI = {
                    height,
                    neck,
                    gender,
                    hip,
                    waist,
                    method: 'InternationalSystemUnitBFP'
                  }
                  console.log(JSON.stringify(payload))
                  try {
                    const { payload: internationalSystemBFC } = await calculateHealth(payload)
                    console.log('=====>', internationalSystemBFC)
                    if (typeof internationalSystemBFC === 'object') {
                      const { bfc } = internationalSystemBFC
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
                <Typography variant="subtitle1">BFC: {Result.bfc}</Typography>
              </div>
            </NoIndexTabPanel>
          </div>
        </Paper>
      </Grid>
    </>
  )
}

export default InternationalSystemBfc
