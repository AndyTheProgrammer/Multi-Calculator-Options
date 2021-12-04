import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { BMRKatchMcArdleI } from '../../../../types'
import { calculateHealth } from '../../../../services/AppCalculatorsApi'
import {
  CALCULATORS,
  LABELS,
  PLACEHOLDERS,
  INPUT_TYPE,
} from '../../../../common/shared'
import {
  CustomTextInput,
  CustomSelect,
  CustomBtn,
  CustomResetBtn,
  Label,
  FormTabsContainer,
  ResultTabsContainer
} from '../../../custom'

const BMRKatchMcArdle = () => {

  const [initialFormValues] = React.useState({
    fat: '',
    weight: '',
    weight_unit: ''
  })
  const [Result, setResult] = React.useState({
    BMR: 0,
    unit: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle2={CALCULATORS.bMRKatchMcArdle} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            fat,
            weight,
            weight_unit
          }, { setSubmitting, resetForm }) => {
            const payload: BMRKatchMcArdleI = {
              fat,
              weight,
              weight_unit,
              method: 'BMRKatchMcArdle'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: katchMcArdle } = await calculateHealth(payload)
              console.log('=====>', katchMcArdle)
              if (typeof katchMcArdle === 'object') {
                const { BMR, unit } = katchMcArdle
                setResult({
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
                <Label title={LABELS.fat} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="fat"
                  placeholder={PLACEHOLDERS.number}
                  value={values.fat}
                  onChange={handleChange}
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
          <Typography variant="subtitle1">
            BMR: {Result.BMR}{Result.unit}
          </Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default BMRKatchMcArdle
