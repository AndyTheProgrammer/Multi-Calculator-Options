import React from 'react'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'

import { BloodAlcoholContentI } from '../../../../types'
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

const BloodAlcoholContent = () => {

  const [initialFormValues] = React.useState({
    weight: '',
    weight_unit: '',
    gender: '',
    hours_of_drinking: '',
    minutes_of_drinking: '',
    number_of_standard_drinks: '',
  })
  const [Result, setResult] = React.useState({
    BAC: 0,
    numberOfHoursAverage: 0,
    divident: 0,
    divisor: 0,
    M: 0,
    N: 0,
    H: 0
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer tabTitle2={CALCULATORS.bloodAlcoholContent} sm={6}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            weight,
            weight_unit,
            gender,
            hours_of_drinking,
            minutes_of_drinking,
            number_of_standard_drinks,
          }, { setSubmitting, resetForm }) => {
            const payload: BloodAlcoholContentI = {
              weight,
              weight_unit,
              gender,
              hours_of_drinking,
              minutes_of_drinking,
              number_of_standard_drinks,
              method: 'bloodAlcoholContent'
            }
            try {
              const { payload: BloodAlcoholContent } = await calculateOthers(payload)
              console.log('=====>', BloodAlcoholContent)
              if (typeof BloodAlcoholContent === 'object') {
                const { BAC, numberOfHoursAverage, divident, divisor, M, N, H } = BloodAlcoholContent
                setResult({
                  BAC: BAC,
                  numberOfHoursAverage: numberOfHoursAverage,
                  divident: divident,
                  divisor: divisor,
                  M: M,
                  N: N,
                  H: H
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
                  measurement="weight"
                  value={values.weight_unit}
                  onChange={handleChange('weight_unit')}
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

              <div className="form-row">
                <Label title={LABELS.hoursOfDrinking} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="hours_of_drinking"
                  placeholder={PLACEHOLDERS.number}
                  value={values.hours_of_drinking}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.minutesOfDrinking} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="minutes_of_drinking"
                  placeholder={PLACEHOLDERS.number}
                  value={values.minutes_of_drinking}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.numberOfStandardDrinks} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="number_of_standard_drinks"
                  placeholder={PLACEHOLDERS.number}
                  value={values.number_of_standard_drinks}
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
          <Typography variant="subtitle1">
            Blood alcohol content: {Result.BAC}
          </Typography>
        </div>
      </ResultTabsContainer>
    </>
  )
}

export default BloodAlcoholContent
