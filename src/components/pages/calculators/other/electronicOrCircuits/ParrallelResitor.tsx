import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import { useSpring } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { ParrallelResitorI } from '../../../../../types'
import { calculateOthers } from '../../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
  ELECTRONICS_OR_CIRCUITS_PLACEHOLDERS,
} from '../../../../../common/shared'
import {
  CustomTextInput,
  Label,
  FormRow,
  FormTabsContainer,
  ResultTabsContainer,
  PlaceHolder,
  Image,
} from '../../../../custom'

const ParrallelResitor = () => {
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
  const [initialFormValues] = React.useState({
    resistance_values: "",
  })
  const [Result, setResult] = React.useState({
    totalResistance: 0,
    unit: ''
  })

  return (
    <>
      <PlaceHolder
        placeHolder={ELECTRONICS_OR_CIRCUITS_PLACEHOLDERS.parrallelResitor}
      />

      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.parrallelResitor} animation={formAnimation}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            resistance_values,
          }, { setSubmitting }) => {
            const payload: ParrallelResitorI = {
              resistance_values,
              method: 'ParallelResistorCalculator'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: parallelResistorCalculator } = await calculateOthers(payload)
              console.log('=====>', parallelResistorCalculator)
              const { totalResistance, unit,
              } = parallelResistorCalculator
              if (typeof parallelResistorCalculator === 'object') {
                setResult({
                  totalResistance: totalResistance,
                  unit: unit
                })
              }
              if (success === true) {
                setAnswer(success)
                formApi.start({
                  transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
                });
                resultApi.start({
                  transform: matches === true ? 'translateX(0px)' : 'translateY(0px)',
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
                <Label title={LABELS.resistanceValues} />
                <CustomTextInput
                  col
                  type={INPUT_TYPE.text}
                  id="resistance_values"
                  placeholder={PLACEHOLDERS.number}
                  value={values.resistance_values}
                  onChange={handleChange}
                />
              </FormRow>

              <FormRow buttons reset={() => resetForm()} />
            </form>
          )}
        </Formik>
      </FormTabsContainer>

      {/* Results grid */}
      {answer === true &&
        <ResultTabsContainer tabTitle={'Result'} animation={resultAnimation}>
          <div className="mb-3">
            <Typography variant="subtitle1"> Total resistance: {Result.totalResistance}{Result.unit}</Typography>
          </div>
        </ResultTabsContainer>
      }
    </>
  )
}

export default ParrallelResitor
