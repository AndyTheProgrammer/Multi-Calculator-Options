import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { ParrallelResitorI } from '../../../../types'
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
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../custom'

const ParrallelResitor = () => {
  const [initialFormValues] = React.useState({
    resistance_values: "",
  })
  const [Result, setResult] = React.useState({
    totalResistance: 0,
    unit: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle2={CALCULATORS.parrallelResitor} sm={6}>
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
              const { payload: parallelResistorCalculator } = await calculateOthers(payload)
              console.log('=====>', parallelResistorCalculator)
              const { totalResistance, unit,
              } = parallelResistorCalculator
              if (typeof parallelResistorCalculator === 'object') {
                setResult({
                  totalResistance: totalResistance,
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
                <Label title={LABELS.resistanceValues} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="resistance_values"
                  placeholder={PLACEHOLDERS.number}
                  value={values.resistance_values}
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
      </FormTabsContainer>

      {/* Results grid */}
      <ResultTabsContainer tabTitle2={'Result'} sm={6}>
        <div className="text-center mb-3">
          <Typography variant="subtitle1"> Total resistance: {Result.totalResistance}{Result.unit}</Typography>
        </div>
      </ResultTabsContainer>


    </>
  )
}

export default ParrallelResitor
