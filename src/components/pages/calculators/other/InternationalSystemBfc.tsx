import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import { useSpring, animated } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { InternationalSystemBfcI } from '../../../../types'
import { calculateOthers } from '../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomBtn,
  CustomSelect,
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../custom'

const InternationalSystemBfc = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [formAnimation, formApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(100px)' : 'translateX(0px)',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [resultAnimation, resultApi] = useSpring(() => ({
    transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const [answer, setAnswer] = React.useState<boolean>(false)
  const [selectedResult, setSelectedResult] = React.useState<boolean>(true)
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

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.internationalSystemBfc} animation={formAnimation}>
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
              const { payload: internationalSystemBFC } = await calculateOthers(payload)
              console.log('=====>', internationalSystemBFC)
              if (typeof internationalSystemBFC === 'object') {
                const { BFP } = internationalSystemBFC
                setResult({
                  bfc: BFP,
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
                  col
                  type={INPUT_TYPE.text}
                  id="height"
                  placeholder={PLACEHOLDERS.number}
                  value={values.height}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.neck} />
                <CustomTextInput
                  col
                  type={INPUT_TYPE.text}
                  id="neck"
                  placeholder={PLACEHOLDERS.number}
                  value={values.neck}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.hip} />
                <CustomTextInput
                  col
                  type={INPUT_TYPE.text}
                  id="hip"
                  placeholder={PLACEHOLDERS.number}
                  value={values.hip}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.waist} />
                <CustomTextInput
                  col
                  type={INPUT_TYPE.text}
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

                <CustomResetBtn
                  onHandleClick={() => resetForm()}
                />
                <CustomBtn />
              </div>
            </form>
          )}
        </Formik>
      </FormTabsContainer>

      {/* Results grid */}
      <ResultTabsContainer tabTitle={'Result'} animation={resultAnimation}>
        <div className="mb-3">
          <Typography variant="subtitle1">BFC: {Result.bfc}</Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default InternationalSystemBfc
