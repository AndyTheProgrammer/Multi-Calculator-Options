import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import { useSpring } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { LeanBodyMassPeterFormulaI } from '../../../../../types'
import { calculateOthers } from '../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  FITNESS_PLACEHOLDERS,
} from '../../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  Label,
  FormRow,
  FormTabsContainer,
  ResultTabsContainer,
  PlaceHolder,
} from '../../../../custom'
import {
  other_icon,
  fitness_calc_icon,
} from "../../../../../common/assets"

const LeanBodyMassPeterFormula = () => {
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
    height_unit: '',
    weight: '',
    weight_unit: '',
    gender: ''
  })
  const [Result, setResult] = React.useState({
    leanBodyMass: 0
  })

  return (
    <>
      <PlaceHolder placeHolder={FITNESS_PLACEHOLDERS.leanBodyMassPetersFormula} />

      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.leanBodyMassPetersFormula} animation={formAnimation}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            height,
            height_unit,
            weight,
            weight_unit,
            gender
          }, { setSubmitting }) => {
            const payload: LeanBodyMassPeterFormulaI = {
              height,
              height_unit,
              weight,
              weight_unit,
              gender,
              method: 'LeanBodyMassPeterFormular'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: leanBodyMassPeterFormula } = await calculateOthers(payload)
              console.log('=====>', leanBodyMassPeterFormula)
              if (typeof leanBodyMassPeterFormula === 'object') {
                const { eLBM } = leanBodyMassPeterFormula
                setResult({
                  leanBodyMass: eLBM,
                })
              }
            } catch (err) {
              console.log('====>', err)
            }
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, resetForm }) => (
            <form onSubmit={handleSubmit} className="form-container">
              <FormRow>
                <Label title={LABELS.height} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="height"
                  placeholder={PLACEHOLDERS.number}
                  value={values.height}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="height_unit"
                  measurement="length"
                  value={values.height_unit}
                  onChange={handleChange('height_unit')}
                />
              </FormRow>

              <FormRow>
                <Label title={LABELS.weight} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="weight"
                  placeholder={PLACEHOLDERS.number}
                  value={values.weight}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="weight_unit"
                  measurement="weight"
                  value={values.weight_unit}
                  onChange={handleChange('weight_unit')}
                />
              </FormRow>

              <FormRow>
                <Label title={LABELS.gender} />
                <CustomSelect
                  id="gender"
                  measurement="gender"
                  value={values.gender}
                  onChange={handleChange('gender')}
                />
              </FormRow>

              <FormRow buttons reset={() => resetForm()} />
            </form>
          )}
        </Formik>
      </FormTabsContainer>

      {/* Results grid */}
      <ResultTabsContainer tabTitle={'Result'} animation={resultAnimation}>
        <div className="mb-3">
          <Typography variant="subtitle1">
            Lean body mass: {Result.leanBodyMass}
          </Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default LeanBodyMassPeterFormula
