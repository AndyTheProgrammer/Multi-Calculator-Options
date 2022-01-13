import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import { useSpring } from 'react-spring'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { ConductorResitorI } from '../../../../../types'
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
  CustomSelect,
  Label,
  FormRow,
  FormTabsContainer,
  ResultTabsContainer,
  PlaceHolder,
  Image,
} from '../../../../custom'

const ConductorResitor = () => {
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
    length: "",
    length_unit: "",
    diameter: "",
    diameter_unit: "",
    conductivity: ""
  })
  const [Result, setResult] = React.useState({
    resistance: 0,
    length: 0,
    diameter: 0,
    unit: ''
  })

  return (
    <>
      <PlaceHolder
        placeHolder={ELECTRONICS_OR_CIRCUITS_PLACEHOLDERS.conductorResitor}
      />

      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.conductorResitor}
        animation={formAnimation}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            length,
            length_unit,
            diameter,
            diameter_unit,
            conductivity,
          }, { setSubmitting, resetForm }) => {
            const payload: ConductorResitorI = {
              length,
              length_unit,
              diameter,
              diameter_unit,
              conductivity,
              method: 'ResistanceOfAConductor'
            }
            console.log(JSON.stringify(payload))
            try {
              const { success, payload: resistanceOfAConductor } = await calculateOthers(payload)
              console.log('=====>', resistanceOfAConductor)
              const {
                resistance,
                length,
                diameter,
                unit,
              } = resistanceOfAConductor
              if (typeof resistanceOfAConductor === 'object') {
                setResult({
                  resistance: resistance,
                  length: length,
                  diameter: diameter,
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
                <Label title={LABELS.length} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="length"
                  placeholder={PLACEHOLDERS.number}
                  value={values.length}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="length_unit"
                  measurement="length"
                  value={values.length_unit}
                  onChange={handleChange('length_unit')}
                />
              </FormRow>

              <FormRow>
                <Label title={LABELS.diameter} />
                <CustomTextInput
                  type={INPUT_TYPE.text}
                  id="diameter"
                  placeholder={PLACEHOLDERS.number}
                  value={values.diameter}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="diameter_unit"
                  measurement="length"
                  value={values.diameter_unit}
                  onChange={handleChange('diameter_unit')}
                />
              </FormRow>

              <FormRow>
                <Label title={LABELS.conductivity} />
                <CustomTextInput
                  col
                  type={INPUT_TYPE.text}
                  id="conductivity"
                  placeholder={PLACEHOLDERS.number}
                  value={values.conductivity}
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
            <Typography variant="subtitle1">
              Resistance: {Result.resistance}{Result.unit}
            </Typography>

            <Typography variant="subtitle1">
              Length: {Result.length}
            </Typography>

            <Typography variant="subtitle1">
              Diameter: {Result.diameter}
            </Typography>
          </div>
        </ResultTabsContainer>
      }
    </>
  )
}

export default ConductorResitor
