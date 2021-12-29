import React from 'react'
import { Formik } from 'formik'
import { Typography } from '@material-ui/core'

import { SampleSizeI } from '../../../../types'
import { calculateStatistics } from '../../../../services/AppCalculatorsApi'
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

const SampleSizeCalculator = (props: any) => {
  const { openDrop } = props
  const [initialFormValues] = React.useState({
    confidence_level: '',
    population_proportion: '',
    margin_of_error: ''
  })
  const [Result, setResult] = React.useState({
    sampleSize: 0,
    unit: ''
  })

  return (
    <>
      {/* Form grid */}
      <FormTabsContainer
        tabTitle1={CALCULATORS.sampleSize}
        dropDown={true}
        openDrop={openDrop}
      >
        <Formik
          initialValues={initialFormValues}
          onSubmit={async ({
            confidence_level,
            population_proportion,
            margin_of_error
          }, { setSubmitting, resetForm }) => {
            const payload: SampleSizeI = {
              confidence_level,
              population_proportion,
              margin_of_error,
              method: 'FindOutTheSampleSize'
            }
            console.log(JSON.stringify(payload))
            try {
              const { payload: circularSlabOrTubeConcrete } = await calculateStatistics(payload)
              console.log('=====>', circularSlabOrTubeConcrete)
              const { sample_size, unit } = circularSlabOrTubeConcrete
              if (typeof circularSlabOrTubeConcrete === 'object') {
                setResult({
                  sampleSize: sample_size,
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
                <Label title={LABELS.confidenceLevel} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="confidence_level"
                  placeholder={PLACEHOLDERS.number}
                  value={values.confidence_level}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.populationProportion} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="population_proportion"
                  placeholder={PLACEHOLDERS.number}
                  value={values.population_proportion}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <Label title={LABELS.marginOfError} />
                <CustomTextInput
                  type={INPUT_TYPE.number}
                  id="margin_of_error"
                  placeholder={PLACEHOLDERS.number}
                  value={values.margin_of_error}
                  onChange={handleChange}
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
      <ResultTabsContainer tabTitle={'Result'} >
        <div className="mb-3">
          <Typography variant="subtitle1">
            Sample size: {Result.sampleSize}{Result.unit}
          </Typography>
        </div>
      </ResultTabsContainer>


    </>
  )
}

export default SampleSizeCalculator
