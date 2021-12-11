import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { HorsepowerCalculationI } from '../../../../types'
import { calculateOthers } from '../../../../services/AppCalculatorsApi'
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

const HorsepowerCalculation = () => {
  const [initialFormValues] = React.useState({
    force: "",
    force_unit: "",
    distance: "",
    distance_unit: "",
    time: "",
    time_unit: "",
  })
  const [Result, setResult] = React.useState({
    horsepower: 0,
    unit: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle1={CALCULATORS.horsepowerCalculation} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            force,
            force_unit,
            distance,
            distance_unit,
            time,
            time_unit,
          }, { setSubmitting }) => {
            const payload: HorsepowerCalculationI = {
              force,
              force_unit,
              distance,
              distance_unit,
              time,
              time_unit,
              method: 'HorsepowerCalculationBasedOnDefinition'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: horsepowerCalculation } = await calculateOthers(payload)
              console.log('=====>', horsepowerCalculation)
              const { horsepower, unit,
              } = horsepowerCalculation
              if (typeof horsepowerCalculation === 'object') {
                setResult({
                  horsepower: horsepower,
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
                <Label title={LABELS.force} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="force"
                  placeholder={PLACEHOLDERS.number}
                  value={values.force}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="force_unit"
                  measurement="force"
                  value={values.force_unit}
                  onChange={handleChange('force_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.distance} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="distance"
                  placeholder={PLACEHOLDERS.number}
                  value={values.distance}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="distance_unit"
                  measurement="length"
                  value={values.distance_unit}
                  onChange={handleChange('distance_unit')}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.time} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="time"
                  placeholder={PLACEHOLDERS.number}
                  value={values.time}
                  onChange={handleChange}
                />

                <CustomSelect
                  id="time_unit"
                  measurement="time"
                  value={values.time_unit}
                  onChange={handleChange('time_unit')}
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
      <ResultTabsContainer tabTitle1={'Result'} sm={6}>
        <div className="text-center mb-3">
          <Typography variant="subtitle1"> Horsepower: {Result.horsepower}{Result.unit}</Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default HorsepowerCalculation
